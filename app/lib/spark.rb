class Spark
  def initialize (user = nil)
    if !user
      # should we be setting @user to the last user if there isn't one logged in?
      @user = User.last
    else
      @user = user
    end
  end

  def next_entry
    if @user
      entry = @user.entries.find_by(state: 'incomplete')
      if entry == {}
        next_entry.new_entry
      end
    else
        next_entry.new_entry
    end
  end

  def new_entry
    # Creates a new Entry database entry linked to @user with six Prompt db Entries,
    # each with a question_id value 1 - 6
    # payload is a hash with :id = entry.id and :prompts array of prompt ids
    # e.g.: Spark.new(@user).process_entries(@jsonstring)
    payload = Hash.new
    entry = @user.entries.create!
    payload[:entry] = entry
    payload[:prompt_ids] = []
    1.upto(TOTAL_QUESTIONS) do |n|
      prompt = entry.prompts.create(question_id: n)
      payload[:prompt_ids] << prompt.id
    end
    payload
  end

  def process_entries(jason)
    # parses a JSON object (with a key answers that is an array of answers into the database)
    # the answers array should be populated with objects that each have a "question" value 1-6
    # and a body string that gets entered in the database
    # promptlist, entry = new_entry[:prompts], new_entry[:entry]
    current_entry = new_entry
    enter_entries(current_entry[:prompt_ids], jason)
    current_entry[:entry]
  end

  def enter_entries(prompt_ids, answer_object)
    # takes 6 prompt id strings (a..f) and a JSON object and inserts
    # all answers from the object (described in process_entries) to the database.
    answer_words = {}
    answer_object["answers"].each do |answer|
      if !answer.second["body"]
      else
        question_number = answer.second["question"].to_i
        prompt = Prompt.find(prompt_ids[question_number - 1])
        answerbuilder = prompt.answers.create!
        answerbuilder.body = answer.second["body"]
        answerbuilder.user_id = @user.id
        answerbuilder.save
        if question_number == 4
          answer_words[question_number] ||= []
          # checks for multi-word entry in Question 4 and separates
          if answerbuilder.body.strip.include? " "
            @bodysplit = answerbuilder.body.split(" ")
            @bodysplit.each do |word|
              @cleaned = word.strip.downcase
              answer_words[question_number] << @cleaned
            end
          else
            answer_words[question_number] << answerbuilder.body.strip.downcase
          end
        end
        if question_number == 2 || question_number == 3 || question_number == 5
          answer_words[question_number] ||= []
          answer_words[question_number] << answerbuilder.body.strip.downcase
        end
      end
    end
    # Question 3
    if answer_words[3].any?
      @q3wc = @user.word_counts.find_or_create_by(question_id: 3)
      answer_words[3].each do |word|
        @q3wc.word_counter ||= {}
        @q3wc.word_counter[word] ||= 0
        @q3wc.word_counter[word] += 1
      end
      @q3wc.save
    end
    # Question 4
    if answer_words[4].any?
      @q4wc = @user.word_counts.find_or_create_by(question_id: 4)
      answer_words[4].each do |word|
        @q4wc.word_counter ||= {}
        @q4wc.word_counter[word] ||= 0
        @q4wc.word_counter[word] += 1
      end
      @q4wc.save
    end
  end
end