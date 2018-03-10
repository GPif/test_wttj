class CandidatStatusController < ApplicationController
    def index
      @status = CandidatStatus.all.includes(:candidat)
    end

    def update
        @status = CandidatStatus.find params[:id]
        if @status.update(candidat_status_params)
            render json: @status
        else
            render json: @status, status: :unprocessable_entity
        end
    end

    private
        def candidat_status_params
            params.require(:candidat_status).permit(:status)
        end

end
