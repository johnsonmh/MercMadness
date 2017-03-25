import json
import pynag.Model
all_host = pynag.Model.Host.objects.all
dataJSON = []
#data['host_name'] = i.host_name
#print "Python is alive"
#target = open('parseCFGTestResult.txt', 'w')
#target.truncate()
j = 0
for i in all_host:
	data = {}
	data["host_name"] = i.host_name
	data["alias"] = i.alias
	data["address"] = i.address
	data["max_check_attempts"] = i.max_check_attempts
	data["hostgroups"] = i.hostgroups
	data["contact_groups"] = i.contact_groups
	data["contacts"] = i.contacts
	dataJSON.append(data)

	j+=1

	#dataJSON.append(data)
	#print data
	#print "host_name: " + str(i.host_name)
	#print "alias: " + str(i.alias)
	#print "address: " + str(i.address)
	#print "max_check attempts: " + str(i.max_check_attempts)
	#print "hostgroups: " + str(i.hostgroups) + "\n"
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

#dataJSON2 = json.dumps(dataJSON)
#print dataJSON2

print dataJSON

#print json.dumps(dataJSON)
#json_data = json.dumps(data)
#target.close()
