class CreateReservedWords < ActiveRecord::Migration
  def change
    create_table :reserved_words do |t|
      t.string :word
      t.string :description
      t.integer :program_id

      t.timestamps
    end
  end
end
