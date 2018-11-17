class CreateGoals < ActiveRecord::Migration[5.2]
  def change
    create_table :goals do |t|
      t.string :body
      t.boolean :complete

      t.timestamps
    end
  end
end
