class Frequency

  def self.pull(user, question_id)
    wordlist = []
    @user = User.find(user)
    @user.word_counts.each do |wc|
      if wc.question_id == question_id
        wc.word_counter.each do |word, weight|
          wordlist << { "text" => "#{word}", "weight" => weight }
        end
      end
    end
  return wordlist
  end

  def self.enter_nlu(nlu_output, q_id, user_id)
    @user = User.find(user_id)
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