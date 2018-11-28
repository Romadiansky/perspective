class TrendsController < ApplicationController
  before_action :calendar_counter

  def index
    if current_user
      @entries = current_user.entries
      @total = Dissonance.total(current_user)
      @activities = Frequency.pull(current_user.id, 2)
      @people = Frequency.pull(current_user.id, 3)
      @adjectives = Frequency.pull(current_user.id, 4)
      @gratitude = Frequency.pull(current_user.id, 5)
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
    return @caldata
  end

end
