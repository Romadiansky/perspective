# == Schema Information
#
# Table name: analyses
#
#  id            :bigint(8)        not null, primary key
#  user_input    :jsonb
#  watson_output :jsonb
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  entry_id      :bigint(8)
#  question_id   :bigint(8)
#  user_id       :bigint(8)
#
# Indexes
#
#  index_analyses_on_user_id  (user_id)
#

class Analysis < ApplicationRecord
  belongs_to :user
end
