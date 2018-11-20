class Spark
  def initialize (user = nil)
    @user = user
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
    payload[:id] = entry.id
    payload[:prompts] = []
    1.upto(6) do |n|
      prompt = entry.prompts.create(question_id: n)
      payload[:prompts] << prompt.id
    end
    payload
  end

  def process_entries(jason)
    # parses a JSON object (with a key answers that is an array of answers into the database)
    # the answers array should be populated with objects that each have a "question" value 1-6
    # and a body string that gets entered in the database
    parsed = JSON.parse(jason)
    promptlist = new_entry[:prompts]
    enter_entries(*promptlist, parsed)
  end

  def enter_entries(a, b, c, d, e, f, answer_object)
    # takes 6 prompt id strings (a..f) and a JSON object and inserts
    # all answers from the object (described in process_entries) to the database.
    answer_object["answers"].each do |answer|
      case answer["question"]
        when 1
          prompt = Prompt.find(a.to_i)
          answerbuilder = prompt.answers.create!(prompt_id: a.to_i)
        when 2
          prompt = Prompt.find(b.to_i)
          answerbuilder = prompt.answers.create!(prompt_id: b.to_i)
        when 3
          prompt = Prompt.find(c.to_i)
          answerbuilder = prompt.answers.create!(prompt_id: c.to_i)
        when 4
          prompt = Prompt.find(d.to_i)
          answerbuilder = prompt.answers.create!(prompt_id: d.to_i)
        when 5
          prompt = Prompt.find(e.to_i)
          answerbuilder = prompt.answers.create!(prompt_id: e.to_i)
        when 6
          prompt = Prompt.find(f.to_i)
          answerbuilder = prompt.answers.create!(prompt_id: f.to_i)
        else
          puts "ERRRRRRRROR"
      end
      answerbuilder.body = answer["body"]
      answerbuilder.save
    end
  end
end