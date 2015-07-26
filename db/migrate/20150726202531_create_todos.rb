class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :index

      t.timestamps null: false
    end
  end
end
