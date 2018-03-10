class CreateCandidats < ActiveRecord::Migration[5.1]
  def change
    create_table :candidats do |t|
      t.string :name
      t.string :firstname

      t.timestamps
    end
  end
end
