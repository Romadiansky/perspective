class CreateGoals < ActiveRecord::Migration[5.2]
  def change
    create_table :goals do |t|
      t.string :body
      t.boolean :complete,  :default => false
      t.references :user

      t.timestamps
    end
  end
end
