# == Schema Information
#
# Table name: word_counts
#
#  id           :bigint(8)        not null, primary key
#  word_counter :jsonb
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  question_id  :bigint(8)
#  user_id      :bigint(8)
#
# Indexes
#
#  index_word_counts_on_question_id  (question_id)
#  index_word_counts_on_user_id      (user_id)
#

class WordCount < ApplicationRecord

  belongs_to :user
end
