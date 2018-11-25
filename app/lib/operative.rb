class Operative

  def self.fetch_operatives(text)
    natural_language_understanding = IBMWatson::NaturalLanguageUnderstandingV1.new(
      iam_apikey: ENV['WATSON_UNDERSTANDING'],
      version: "2018-03-16"
    )

    understanding = natural_language_understanding.analyze(
      text: text,
      features: {
        "entities" => {},
        "keywords" => {}
      }
    ).result
  end

  def self.operative_words(json)
    keywords = []
    if json["keywords"]["text"].any?
      keywords << {[json["keywords"]["text"]] => json["keywords"]["count"].to_i}
    else
      nil
    end
    if json["entities"]["text"].any?
      keywords << {[json["entites"]["text"]] => json["entities"]["count"].to_i}
    else
      nil
    end
    keywords
  end

  def self.prepare_for_watson_nlu(entry)
    fragment = []
    entry.prompts.each do |prompt|
      if prompt.question.id == 2 || prompt.question.id == 5
        prompt.answers.each do |answer|
          fragment << answer.body
        end
      end
    end
    fragment.join(". ")
  end

  def self.total(user)
    entries = user.entries
    if entries.count >= MINIMUM_ENTRIES
      entries.where(:dissonant => true).count.to_f / entries.count.to_f
    else
      0
    end
  end

end