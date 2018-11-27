class TrendsController < ApplicationController

  def index
    if current_user
      @entries = current_user.entries
      @total = Dissonance.total(current_user)
      @wordlist2 = Frequency.pull(current_user.id, 2)
      @wordlist3 = Frequency.pull(current_user.id, 3)
      @wordlist4 = Frequency.pull(current_user.id, 4)
      @wordlist5 = Frequency.pull(current_user.id, 5)
    end

  end

end
