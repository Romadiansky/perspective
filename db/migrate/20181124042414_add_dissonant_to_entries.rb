class AddDissonantToEntries < ActiveRecord::Migration[5.2]
  def change
    add_column :entries, :dissonant, :boolean, :default => false
  end
end
