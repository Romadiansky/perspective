# == Schema Information
#
# Table name: prompts
#
#  id         :bigint(8)        not null, primary key
#  question   :string
#  watson     :boolean          default(TRUE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  entry_id   :bigint(8)
#
# Indexes
#
#  index_prompts_on_entry_id  (entry_id)
#

require 'test_helper'

class PromptTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
