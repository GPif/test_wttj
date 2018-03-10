# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Candidat.delete_all
CandidatStatus.delete_all

c=Candidat.create(name: 'Rose', firstname: 'Axl')
s=CandidatStatus.new(status: CandidatStatus::TO_MEET)
s.candidat = c
s.save

c=Candidat.create(name: 'Slash', firstname: 'Saul')
s=CandidatStatus.new(status: CandidatStatus::TO_MEET)
s.candidat = c
s.save

c=Candidat.create(name: 'McKagan', firstname: 'Duff')
s=CandidatStatus.new(status: CandidatStatus::TO_MEET)
s.candidat = c
s.save

c=Candidat.create(name: 'Reed', firstname: 'Dizzy')
s=CandidatStatus.new(status: CandidatStatus::TO_MEET)
s.candidat = c
s.save
