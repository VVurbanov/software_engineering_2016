=begin
Develop a program named FirstName_LastName_ClassNumber_437bcf.rb

1. you are given two command line arguments;
1.1 if there are other arguments they should be discarded;
1.2 The first argument is the full path of a CSV file with 4 columns
1.3 The second argument is the full path of a JSON file

2. Find the product of all the values in the JSON file where :
 the key of this value is not equal to a value in any row on column 2 from the CSV 
 
3. Print only the result value
=end
require 'json'
require 'csv'

json = JSON.parse(File.read(ARGV[1]))

product = 0

json.each {|key, value|
	found = 0
	CSV.foreach(ARGV[0]) do |row| 
		
		if row[1] == key
			found = 1
			break
		end
	end
	
	if found == 0
		product = product == 0 ? value.to_i : product*=value.to_i	
	end
}

puts product
