module CandidatStatusHelper
    def index
        @status = CandidatStatus.all.includes(:candidat)
    end
end
