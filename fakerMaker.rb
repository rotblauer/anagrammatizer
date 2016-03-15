#!/bin/ruby

require 'faker'

# puts Faker::Hipster.sentence(3, false, 0)

# Faker::StarWars.character
# Faker::Beer.name
# Faker::Superhero.name
# Faker::Company.catch_phrase
# Faker::Commerce.product_name

arr = []



100.times do |t|
  arr.push(Faker::Company.catch_phrase) #::Hacker.sentence(i, false, 0))
end


File.write('fakeBusinessJargon.json', arr)
