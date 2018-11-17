# == Schema Information
#
# Table name: entries
#
#  id         :bigint(8)        not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint(8)
#
# Indexes
#
#  index_entries_on_user_id  (user_id)
#

class Entry < ApplicationRecord

  belongs_to :user
  has_many :prompts

end
