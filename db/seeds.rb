# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Question.destroy_all
Question.create(id: 1, body: "The mood you were in:", watson: false, interface_name: "mood")
Question.create(id: 2, body: "What you did that day:", watson: false, interface_name: "text_list")
Question.create(id: 3, body: "Who your day involved:", watson: false, interface_name: "text_list")
Question.create(id: 4, body: "The way you described your day:", watson: false, interface_name: "text_list")
Question.create(id: 5, body: "What you were grateful for:", watson: false, interface_name: "text_list")
Question.create(id: 6, body: "What else you had to say:", watson: true, interface_name: "textarea")

User.destroy_all
User.create(id: 1, email: "present@ti.on", first_name: "Everybody", last_name: "Watching", reset_password_token: "7", password: "123456")
User.create(id: 2, email: "2@email.com", first_name: "2", last_name: "2", reset_password_token: "2", password: "123456")
User.create(id: 3, email: "3@email.com", first_name: "3", last_name: "3", reset_password_token: "3", password: "123456")
User.create(id: 4, email: "4@email.com", first_name: "4", last_name: "4", reset_password_token: "4", password: "123456")
User.create(id: 5, email: "5@email.com", first_name: "5", last_name: "5", reset_password_token: "5", password: "123456")
User.create(id: 6, email: "6@email.com", first_name: "6", last_name: "6", reset_password_token: "6", password: "123456")
User.create(id: 7, email: "7@email.com", first_name: "7", last_name: "7", reset_password_token: "7", password: "123456")
User.create(id: 8, email: "8@email.com", first_name: "8", last_name: "8", reset_password_token: "8", password: "123456")

