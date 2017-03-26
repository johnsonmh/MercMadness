import json
import pynag.Model
all_host = pynag.Model.Host.objects.all #does this get ALL the hosts? What about subfolders?
dataJSON = []

j = 0
for i in all_host:
	data = {"host_name": i.host_name}
	data["alias"] = i.alias
	data["address"] = i.address
	data["max_check_attempts"] = i.max_check_attempts
	data["hostgroups"] = i.hostgroups
	data["contact_groups"] = i.contact_groups
	data["contacts"] = i.contacts
	dataJSON.append(data)
	j+=1

dataJSON2 = json.dumps(dataJSON)
print dataJSON2
