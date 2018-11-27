class TrendsController < ApplicationController

  def index
    @entries = current_user.entries
    @total = Dissonance.total(current_user)
  end

end
