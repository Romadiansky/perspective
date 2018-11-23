class CreateAnalyses < ActiveRecord::Migration[5.2]
  def change
    create_table :analyses do |t|
      t.references :user
      t.bigint :entry_id
      t.bigint :question_id
      t.jsonb :user_input
      t.jsonb :watson_output

      t.timestamps
    end
  end
end
