class TrendsController < ApplicationController

  def index
    if current_user
      @entries = current_user.entries
      @total = Dissonance.total(current_user)
    end
  end

end
