class CreateWordCounts < ActiveRecord::Migration[5.2]
  def change
    create_table :word_counts do |t|
      t.references :user
      t.references :question
      t.jsonb :word_counter
      t.timestamps
    end
  end
end
