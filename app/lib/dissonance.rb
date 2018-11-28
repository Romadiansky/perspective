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

  def self.primary_tones(json)
    if json["document_tone"]["tones"].any?
      tones = json["document_tone"]["tones"].sort do |a,b|
        b["score"] <=> a["score"]
      end.reject do |tone|
        ["tentative", "analytical"].include?(tone["tone_id"])
      end
      return [tones[0]["tone_id"]] if tones.any?
    end
    nil
  end

  def self.prepare_for_watson(entry)
    fragment = []
    entry.prompts.each do |prompt|
      if prompt.question.watson?
        prompt.answers.each do |answer|
          fragment << answer.body
        end
      end
    end
    fragment.join(". ")
  end

  def self.is_dissonant?(mood, tones)
    tones.detect do |tone|
      Dissonance.moods(mood.downcase.to_sym).include? tone
    end ? true : false
  end

  def self.total(user)
    entries = user.entries
    if entries.count >= MINIMUM_ENTRIES
      entries.where(:dissonant => true).count.to_f / entries.count.to_f
    else
      0
    end
  end

  def self.moods(mood)
    # anger fear sadness confident joy
    {
      curious: ["anger", "fear", "sadness", "confident"],
      happy: ["anger", "fear", "sadness"],
      serene: ["sadness", "fear", "anger", "confident"],
      grateful: ["sadness", "fear", "anger"],
      scared: ["confident", "joy"],
      anxious: ["sadness", "confident", "joy"],
      love: ["fear", "confident", "anger"],
      angry: ["joy", "sadness"],
      sad: ["joy", "confident"],
      remorseful: ["joy", "confident", "anger"],
      bored: ["joy", "confident", "fear"],
      pensive: ["joy", "confident", "anger"]
    }[mood]
  end
end