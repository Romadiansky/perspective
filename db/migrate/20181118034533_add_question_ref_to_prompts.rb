class AddQuestionRefToPrompts < ActiveRecord::Migration[5.2]
  def change
    remove_column :prompts, :question, :string
    remove_column :prompts, :watson, :boolean

    add_reference :prompts, :question
    add_column :questions, :watson, :boolean, :default => false
  end
end
