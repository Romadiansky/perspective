# == Schema Information
#
# Table name: answers
#
#  id         :bigint(8)        not null, primary key
#  body       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  prompt_id  :bigint(8)
#  user_id    :bigint(8)
#
# Indexes
#
#  index_answers_on_prompt_id  (prompt_id)
#

class Answer < ApplicationRecord

  belongs_to :prompt

end
