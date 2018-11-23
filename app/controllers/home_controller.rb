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
      @moods = ["pensive", "curious", "serene", "grateful", "love", "happy", "anxious", "scared", "angry", "bored", "sad", "remorseful"]
      @moods.each do |mood|
        @moodcount[mood] = Answer.where(body: mood).where("created_at > ?", 2.days.ago).select("user_id").distinct.count
      end
      @moodcount
    end

end
