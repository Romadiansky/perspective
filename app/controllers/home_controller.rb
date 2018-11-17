class HomeController < ApplicationController

  def index
    @entry = current_user.entries.first
  end

end
