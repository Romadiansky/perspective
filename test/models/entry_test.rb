# == Schema Information
#
# Table name: entries
#
#  id         :bigint(8)        not null, primary key
#  dissonant  :boolean          default(FALSE)
#  state      :string
#  tone       :jsonb            not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint(8)
#
# Indexes
#
#  index_entries_on_tone     (tone) USING gin
#  index_entries_on_user_id  (user_id)
#

require 'test_helper'

class EntryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
