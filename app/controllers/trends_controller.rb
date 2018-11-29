class TrendsController < ApplicationController
  before_action :calendar_counter

  def index
      @moods = ["thoughtful", "curious", "serene", "grateful", "love", "happy", "anxious", "scared", "angry", "bored", "sad", "remorseful"]
    if current_user
      @total = Dissonance.total(current_user)
      @entries = current_user.entries.count - @total
      @activities = Frequency.pull(current_user.id, 2)
      @people = Frequency.pull(current_user.id, 3)
      @adjectives = Frequency.pull(current_user.id, 4)
      @gratitude = Frequency.pull(current_user.id, 5)
      @caldata = calendar_counter
    end
  end

  def calendar_counter
    @caldata = []
    Answer.where(user_id: current_user.id, body: @moods).each do |mood|
      @caldata << {"date": mood.created_at.strftime("%Y-%m-%d"), "mood": mood.body}
    end
    return @caldata
  end

end
