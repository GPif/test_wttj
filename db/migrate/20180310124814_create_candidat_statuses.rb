class CreateCandidatStatuses < ActiveRecord::Migration[5.1]
  def change
    create_table :candidat_statuses do |t|
      t.integer :candidat_id
      t.integer :status

      t.timestamps
    end
  end
end
