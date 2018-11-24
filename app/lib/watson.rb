class Watson
  def initialize (user = nil)
    if !user
      # should we be setting @user to the last user if there isn't one logged in?
      @user = User.last
    else
      @user = user
    end
  end

  # def new_entry
  #   # Creates a new Entry database entry linked to @user with six Prompt db Entries,
  #   # each with a question_id value 1 - 6
  #   # payload is a hash with :id = entry.id and :prompts array of prompt ids
  #   # e.g.: Spark.new(@user).process_entries(@jsonstring)
  #   payload = Hash.new
  #   analysis = @user.analyses.create!
  #   payload[:analysis_id] = analysis.id
  #   payload[:user_id] = @user.id
  #   payload[:prompts] = []
  #   1.upto(6) do |n|
  #     prompt = entry.prompts.create(question_id: n)
  #     payload[:prompts] << prompt.id
  #   end
  #   payload
  # end

  def process_entries(ids, jason)
    # parses a JSON object (with a key answers that is an array of answers into the database)
    # the answers array should be populated with objects that each have a "question" value 1-6
    # and a body string that gets entered in the database
    puts "=WATSON=============================================="
    puts ids
    puts jason
    watson_enter_entries(ids, jason)
  end

  def watson_enter_entries(ids, answer_object)
    # takes 6 prompt id strings (a..f) and a JSON object and inserts
    # all answers from the object (described in process_entries) to the database.
    payload = []
    answer_object["answers"].each do |answer|
      if !answer.second["body"]
      else
        payload << answer.second
      end
    end
    analysis = @user.analyses.create(entry_id: ids[:id], user_input: payload)
    analysis.save
  end
end