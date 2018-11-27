# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Question.destroy_all
Question.create(id: 1, body: "The mood you were in:", watson: false, interface_name: "mood")
Question.create(id: 2, body: "What did that day:", watson: false, interface_name: "text_list")
Question.create(id: 3, body: "Who your day involved:", watson: false, interface_name: "text_list")
Question.create(id: 4, body: "The way you described your day:", watson: false, interface_name: "text_list")
Question.create(id: 5, body: "What you were grateful for:", watson: false, interface_name: "text_list")
Question.create(id: 6, body: "What else you had to say:", watson: true, interface_name: "textarea")