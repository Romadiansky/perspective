# == Schema Information
#
# Table name: goals
#
#  id         :bigint(8)        not null, primary key
#  body       :string
#  complete   :boolean          default(FALSE)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint(8)
#
# Indexes
#
#  index_goals_on_user_id  (user_id)
#

require 'test_helper'

class GoalTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
