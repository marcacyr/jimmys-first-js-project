class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.string :home
      t.string :about

      t.timestamps null: false
    end
  end
end
