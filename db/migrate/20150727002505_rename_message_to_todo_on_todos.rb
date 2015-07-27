class RenameMessageToTodoOnTodos < ActiveRecord::Migration
  def change
    rename_column :todos, :message, :todo
  end
end
