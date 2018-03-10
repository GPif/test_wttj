class CandidatStatusController < ApplicationController
    def index
      @status = CandidatStatus.all.includes(:candidat)
    end
end
