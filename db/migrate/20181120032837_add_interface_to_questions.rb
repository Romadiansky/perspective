class AddInterfaceToQuestions < ActiveRecord::Migration[5.2]
  def change
    add_column :questions, :interface_name, :string, :default => 'textarea'
  end
end
