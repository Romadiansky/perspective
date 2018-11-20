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
    entry = @user.entries.create!
    payload[:id] = entry.id
    payload[:prompts] = []
    puts "---------------"
    1.upto(6) do |n|
      prompt = entry.prompts.create(question_id: n)
      payload[:prompts] << prompt.id
    end
    payload
  end

  def process_entries(jason)
    parsed = JSON.parse(jason)
    promptlist = new_entry[:prompts]
    enter_entries(*promptlist, parsed)
  end

  def enter_entries(a, b, c, d, e, f, answers)
    puts "ENTRY IDS"
    puts a, b, c, d, e, f
    answers["answers"].each do |answer|
      puts answer
      # prompt = Prompt.find(a.to_i)
      # answerbuilder = prompt.answers.create!(prompt_id: a.to_i)
      # binding.pry
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
          puts "DIDNT WORK"
      end
      answerbuilder.body = answer["body"]
      answerbuilder.save
    end
  end
end