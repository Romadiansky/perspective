# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Question.destroy_all
Question.create(id: 1, body: "What kind of mood are you in?", watson: false, interface_name: "textarea")
Question.create(id: 2, body: "What did you do today?", watson: true, interface_name: "textarea")
Question.create(id: 3, body: "Who did your day involve?", watson: false, interface_name: "textarea")
Question.create(id: 4, body: "Describe your day", watson: false, interface_name: "textarea")
Question.create(id: 5, body: "What are you grateful for?", watson: false, interface_name: "textarea")
Question.create(id: 6, body: "Anything else?", watson: true, interface_name: "textarea")