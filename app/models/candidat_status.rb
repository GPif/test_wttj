class CandidatStatus < ApplicationRecord
    TO_MEET = 1
    MEETING = 2

    belongs_to :candidat
    validates :status, inclusion: { in: [TO_MEET, MEETING] }
end
