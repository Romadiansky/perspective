class TrendsController < ApplicationController
  before_action :calendar_counter

  def index
    if current_user
      @entries = current_user.entries
      @total = Dissonance.total(current_user)
      @wordlist2 = Frequency.pull(current_user.id, 2)
      @wordlist3 = Frequency.pull(current_user.id, 3)
      @wordlist4 = Frequency.pull(current_user.id, 4)
      @wordlist5 = Frequency.pull(current_user.id, 5)
    end
      @moods = ["thoughtful", "curious", "serene", "grateful", "love", "happy", "anxious", "scared", "angry", "bored", "sad", "remorseful"]
      puts @caldata.count
      puts "ZOMG============================================================"
      calendar_counter
      puts @caldata.count
  end

  def calendar_counter
    @caldata = []
    Answer.where(user_id: current_user.id, body: @moods).each do |mood|
      @caldata << {"date": mood.created_at.strftime("%Y-%m-%d"), "mood": mood.body}
    end
    # @caldata << {date: "2018-11-22", mood: "curious"}
    # @caldata << {date: "2018-11-21", mood: "happy"}
    # @caldata << {date: "2018-11-20", mood: "serene"}
    # @caldata << {date: "2018-11-19", mood: "grateful"}
    # @caldata << {date: "2018-11-18", mood: "scared"}
    # @caldata << {date: "2018-11-17", mood: "anxious"}
    # @caldata << {date: "2018-11-16", mood: "loving"}
    # @caldata << {date: "2018-11-15", mood: "angry"}
    # @caldata << {date: "2018-11-14", mood: "sad"}
    # @caldata << {date: "2018-11-13", mood: "remorseful"}
    # @caldata << {date: "2018-11-12", mood: "bored"}
    # @caldata << {date: "2018-11-11", mood: "pensive"}
    # @caldata << {date: "2018-11-10", mood: "bored"}
    return @caldata
  end

end
