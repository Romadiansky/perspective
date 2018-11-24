class AddToneToEntries < ActiveRecord::Migration[5.2]
  def change
    add_column :entries, :tone, :jsonb, :null => false, :default => {}
    add_index :entries, :tone, :using => :gin
  end
end
