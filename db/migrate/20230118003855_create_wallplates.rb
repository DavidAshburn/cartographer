class CreateWallplates < ActiveRecord::Migration[7.0]
  def change
    create_table :wallplates do |t|
      t.string :label

      t.timestamps
    end
  end
end
