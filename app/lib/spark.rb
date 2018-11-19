class Spark
  def initialize (user = nil)
    @user = user
  end

  def next_entry
    payload = Hash.new
    if @user
      entry = @user.entries.find_or_create_by(state: 'incomplete')
    else
      entry = Entry.create!
    end
    prompt1 = entry.prompts.new
    prompt1.question_id = 1
    prompt1.save
    payload[:id] = Entry.new
    prompt2 = entry.prompts.new
    prompt2.question_id = 2
    prompt2.save
    payload[:id] = entry.id
    payload[:prompts] = []
    payload[:prompts] << prompt1.id
    payload[:prompts] << prompt2.id
    payload
  end

end