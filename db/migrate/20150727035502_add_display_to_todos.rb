class AddDisplayToTodos < ActiveRecord::Migration
  def change
    add_column :todos, :display, :boolean, default: true
  end
end
