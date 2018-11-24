class Dissonance

  def is_dissonant?(mood, tone)
    Dissonance.moods(mood.to_sym).include? tone
  end



  def self.moods(mood)
    {
      curious: ["anger", "fear", "sadness"],
      happy: ["anger", "fear", "sadness"],
      serene: ["tentative", "sadness", "fear", "anger"],
      grateful: ["sadness", "fear", "anger", "tentative"],
      scared: ["confident", "joy"],
      anxious: ["sadness", "analytical", "confident"],
      love: ["fear", "confident", "tentative", "anger"],
      angry: ["analytical", "joy"],
      sad: ["joy", "confident"],
      remorseful: ["joy", "confident", "anger"],
      bored: ["joy", "analytical", "confident"],
      pensive: ["joy", "confident"]
    }[mood]
  end
end