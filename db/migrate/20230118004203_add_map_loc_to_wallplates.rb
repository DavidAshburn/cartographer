class AddMapLocToWallplates < ActiveRecord::Migration[7.0]
  def change
    add_column :wallplates, :xloc, :integer
    add_column :wallplates, :yloc, :integer
  end
end
