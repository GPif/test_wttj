class CreateCandidats < ActiveRecord::Migration[5.1]
  def change
    create_table :candidats do |t|
      t.string :name
      t.string :firstaname

      t.timestamps
    end
  end
end
