class TrendsController < ApplicationController

  def index
    if current_user
      @entries = current_user.entries
      @total = Dissonance.total(current_user)
      @activities = Frequency.pull(current_user.id, 2)
      @people = Frequency.pull(current_user.id, 3)
      @adjectives = Frequency.pull(current_user.id, 4)
      @gratitude = Frequency.pull(current_user.id, 5)
    end
  end

end
