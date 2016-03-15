#!/bin/ruby

require 'faker'

# puts Faker::Hipster.sentence(3, false, 0)

obj = {}

for i in 3..6
  obj[i] = []
  100.times do |t|
    obj[i].push(Faker::Book.title) #::Hacker.sentence(i, false, 0))
  end
end

File.write('testFakeBookTitle.json', obj)
