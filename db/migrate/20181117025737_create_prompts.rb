class CreatePrompts < ActiveRecord::Migration[5.2]
  def change
    create_table :prompts do |t|
      t.references :entry
      t.string :question
      t.boolean :watson, :default => true
      t.timestamps
    end
  end
end
