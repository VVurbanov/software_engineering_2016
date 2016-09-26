include Math

a = ARGV[0].to_f
b = ARGV[1].to_f
c = ARGV[2].to_f

if a == 0 
	if b == 0 && c ==0
		print "#\n"
	elsif b != 0
		x = -c/b
		if x % 1 == 0
			x = x.to_i
			print "#{x}\n"
		else
			print "#{x.round(2)}\n"
		end
	end
else
	d = b**2 - (4 * a * c)

	if d>0
		x1 = (-b + sqrt(d))/(2*a)
		x2 = (-b - sqrt(d))/(2*a)
		if x1>x2
			temp = x1
			x1 = x2
			x2 = temp
		end
		if x1 % 1 == 0
			x1 = x1.to_i
			print "#{x1},"
		else
			print "#{x1.round(2)},"
		end
		
		if x2 % 1 == 0
			x2 = x2.to_i
			print "#{x2}\n"
		else
			print "#{x2.round(2)}\n"
		end
		
	elsif d==0
		x = (-b + Math.sqrt(d))/(2*a)
		if x % 1 == 0
			x = x.to_i
			print "#{x}\n"
		else
			print "#{x.round(2)}\n"
		end
	end
end
