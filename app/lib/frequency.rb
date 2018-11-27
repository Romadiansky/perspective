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

end