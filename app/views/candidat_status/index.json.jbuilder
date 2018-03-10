json.candidat_status @status do |status|
  json.id status.id
  json.name status.candidat.name
  json.firstname status.candidat.firstname
  json.status status.status
end
