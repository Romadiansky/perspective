class Dissonance

  def self.fetch_tone(text)
    tone_analyzer = IBMWatson::ToneAnalyzerV3.new(
      iam_apikey: ENV['WATSON_TONE'],
      version: "2017-09-21"
    )

    tone = tone_analyzer.tone(
      tone_input: text,
      content_type: "text/plain"
    ).result
  end

  def self.primary_tone(json)
    if json["document_tone"]["tones"].any?
      json["document_tone"]["tones"].sort do |a,b|
        a["score"] <=> b["score"]
      end.first["tone_id"]
    else
      nil
    end
  end

  def self.prepare_for_watson(entry)
    entry.prompts.map do |prompt|
      if prompt.question.watson?
        prompt.answers.each do |answer|
          answer.body
        end
      end
    end.join(" ")
  end

  def self.is_dissonant?(mood, tone)
    Dissonance.moods(mood.downcase.to_sym).include? tone
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