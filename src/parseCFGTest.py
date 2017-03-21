#!/usr/bin/env python2.6
import pynag.Model

all_host = pynag.Model.Host.objects.all
#target = open('parseCFGTestResult.txt', 'w')
#target.truncate()
for i in all_host:
	print "host_name: " + str(i.host_name)
	print "alias: " + str(i.alias)
	print "address: " + str(i.address)
	print "max_check attempts: " + str(i.max_check_attempts)
	print "hostgroups: " + str(i.hostgroups) + "\n"	
	# target.write('\n'."host_name: " + str(i.host_name))
	# target.write("\n")
	# target.write("alias: " + str(i.alias))
	# target.write("\n")
	# target.write("address: " + str(i.address))
	# target.write("\n")
	# target.write("max_check attempts: " + str(i.max_check_attempts))
	# target.write("\n")
	# target.write("hostgroups: " + str(i.hostgroups))
	# target.write("\n")

#target.close()
