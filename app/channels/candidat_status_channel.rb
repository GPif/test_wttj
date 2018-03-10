class CandidatStatusChannel < ApplicationCable::Channel
  def subscribed
    stream_from "candidat_status_channel_#{params[:board]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
