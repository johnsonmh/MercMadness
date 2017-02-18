<link rel="StyleSheet" href="test.css" type="text/css" />
<body>
<?
include 'naupy.inc.php';

function print_icon($status,$text='')
{
	switch($status) {
	case 'OK':
		return "<img src=\"images/green.gif\" alt=\"$status\" title=\"$text\" />";
	case 'PENDING':
	case 'UNKNOWN':
		return "<img src=\"images/purple.gif\" alt=\"$status\" title=\"$text\" />";
	case 'WARNING':
		return "<img src=\"images/yellow.gif\" alt=\"$status\" title=\"$text\" />";
	case 'CRITICAL':
		return "<img src=\"images/red.gif\" alt=\"$status\" title=\"$text\" />";
	default:
		return $status;
	}
}

function print_hostgroup($nagios, $groupname) {

	echo '<br /><br /><table summary="Group Block" border="0"><tr><td valign="middle" rowspan="2" cellpadding="2" class="groupname"><center>'.$nagios->hostgroups[$groupname]['alias']."</center></td>\n";
	$services = array();
	$servers = $nagios->GetHostgroupMembers($groupname);
	foreach ($servers as $hostname)
	{
		foreach($nagios->service_status[$hostname] as $service => $parms) {
			if (!in_array($service, $services))
				$services[] = $service;
		}
	}
	reset($services);
	foreach ($services as $key => $service) {
		echo "<td class=\"servicename\">$service</td>";
	}
	echo '</tr><tr><td colspan="12"><hr width="100%"></td></tr>';
	foreach ($servers as $hostname)
	{
		echo "<tr><td class=\"hostname\">$hostname</td>";
		foreach($services as $service) {
			if (isset($nagios->service_status[$hostname][$service])) {
				echo '<td align="center">'.print_icon($nagios->service_status[$hostname][$service]['status'], "$hostname/$service is ".$nagios->service_status[$hostname][$service]['status'] . ' ('.$nagios->service_status[$hostname][$service]['plugin_output'] .')').'</td>';
			} else {
				echo '<td align="center">-</td>';
			}
		}
		echo "</tr>";
	}
	echo "</table>";

}

$nagios = new Nagios;
$nagios->ParseConfigFile('/etc/nagios/nagios.cfg');
$nagios->ParseStatusFile();

$contactgroups = ($nagios->GetContactContactgroups('nagios'));

$hostgroups = $nagios->GetContactgroupHostgroups($nagios->GetContactContactgroups('nagios'));
foreach ($contactgroups as $cg => $cgparm) {
    $hostgroups = $nagios->GetContactgroupHostgroups($cg);
foreach ($hostgroups as $group => $parm) {
    print_hostgroup($nagios, $group);
}
}
?>
