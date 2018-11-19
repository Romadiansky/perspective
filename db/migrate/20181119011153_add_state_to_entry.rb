class AddStateToEntry < ActiveRecord::Migration[5.2]
  def change
    add_column :entries, :state, :string
  end
end
