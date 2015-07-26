class AddMessageToTodo < ActiveRecord::Migration
  def change
    add_column :todos, :message, :string
  end
end
