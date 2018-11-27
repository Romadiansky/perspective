class Operative

  def self.fetch_operatives(text)
    if text.strip === ""
      return nil
    else
      natural_language_understanding = IBMWatson::NaturalLanguageUnderstandingV1.new(
        iam_apikey: ENV['WATSON_UNDERSTANDING'],
        version: "2018-03-16"
      )

      understanding = natural_language_understanding.analyze(
        language: "en",
        text: text,
        features: {
          "entities" => {},
          "keywords" => {}
        }
      ).result
    end
  end

  # def self.operative_words(json)
  #   keywords = []
  #   if json["keywords"]["text"].any?
  #     keywords << {[json["keywords"]["text"]] => json["keywords"]["count"].to_i}
  #   else
  #     nil
  #   end
  #   if json["entities"]["text"].any?
  #     keywords << {[json["entites"]["text"]] => json["entities"]["count"].to_i}
  #   else
  #     nil
  #   end
  #   keywords
  # end

  def self.prepare_for_watson_nlu(entry, question_id)
    fragment = []
    entry.prompts.each do |prompt|
      if prompt.question.id == question_id
        prompt.answers.each do |answer|
          fragment << answer.body
        end
      end
    end
    fragment.join(". ")
  end

  def self.enter_nlu(nlu_output, q_id, user_id)
    @user = User.find(user_id)
    if nlu_output == nil
      return nil
    else
      # Question 2
      if q_id == 2
        @q2wc = @user.word_counts.find_or_create_by(question_id: 2)
        if nlu_output["keywords"].any?
          nlu_output["keywords"].each do |word|
            @q2wc.word_counter ||= {}
            @q2wc.word_counter[word["text"]] ||= 0
            @q2wc.word_counter[word["text"]] += word["count"]
          end
          if !nlu_output["entites"]
          else
            nlu_output["entites"].each do |word|
              @q2wc.word_counter ||= {}
              @q2wc.word_counter[word["text"]] ||= 0
              @q2wc.word_counter[word["text"]] += word["count"]
            end
          end
          @q2wc.save
        end
      end
      # Question 5
      if q_id == 5
        @q5wc = @user.word_counts.find_or_create_by(question_id: 5)
        if nlu_output["keywords"].any?
          nlu_output["keywords"].each do |word|
            @q5wc.word_counter ||= {}
            @q5wc.word_counter[word["text"]] ||= 0
            @q5wc.word_counter[word["text"]] += word["count"]
          end
          if !nlu_output["entites"]
          else
            nlu_output["entites"].each do |word|
              @q5wc.word_counter ||= {}
              @q5wc.word_counter[word["text"]] ||= 0
              @q5wc.word_counter[word["text"]] += word["count"]
            end
          end
          @q5wc.save
        end
      end
    end
  end

end