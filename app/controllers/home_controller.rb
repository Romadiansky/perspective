class HomeController < ApplicationController
  before_action :mood_counter, only: [:show, :edit, :update, :destroy]


  def index
    mood_counter
    puts "====================="
    puts @moodcount
  end

  def cards
  end

    def set_moods
    end

    def mood_counter
      @moodcount = {}
      @moods = ["Pensive", "Curious", "Aerene", "Grateful", "Love", "Happy", "Anxious", "Scared", "Angry", "Bored", "Sad", "Remorseful"]
      @moods.each do |mood|
        @moodcount[mood] = Answer.where(body: mood).where("created_at > ?", 2.days.ago).select("user_id").distinct.count
      end
      @moodcount
    end

end
