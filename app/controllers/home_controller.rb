class HomeController < ApplicationController

  def index
    puts "====================="
    puts mood_counter
  end

  private

  def mood_counter
    moodcount = {}
    moods = ["thoughtful", "curious", "serene", "grateful", "love", "happy", "anxious", "scared", "angry", "bored", "sad", "remorseful"]
    moods.each do |mood|
      moodcount[mood] = Answer.where(body: mood).where("created_at > ?", 2.days.ago).select("user_id").distinct.count
    end
    moodcount
  end

end
