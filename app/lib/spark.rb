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
    payload = Hash.new
    entry = Entry.create!
    payload[:id] = entry.id
    payload[:prompts] = []
    puts "---------------"
    1.upto(6) do |n|
      prompt = entry.prompts.new
      prompt.question_id = n
      prompt.save
      payload[:prompts] << prompt.id
    end
    payload
  end
end