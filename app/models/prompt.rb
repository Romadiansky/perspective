# == Schema Information
#
# Table name: prompts
#
#  id          :bigint(8)        not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  entry_id    :bigint(8)
#  question_id :bigint(8)
#
# Indexes
#
#  index_prompts_on_entry_id     (entry_id)
#  index_prompts_on_question_id  (question_id)
#

class Prompt < ApplicationRecord

  belongs_to :entry
  has_many :answers

end
