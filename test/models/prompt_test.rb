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

require 'test_helper'

class PromptTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
