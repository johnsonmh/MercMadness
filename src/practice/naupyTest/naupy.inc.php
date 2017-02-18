<?php
/* parse_config.inc.php - Parse configuration file of Nagios
 * Part of NAUPY - Nagios Ain't Using PHP Yet
 * Copyright (C) <2003> Craig Small <csmall@small.dropbear.id.au>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Library General Public
 * License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Library General Public License for more details.
 *
 * You should have received a copy of the GNU Library General Public
 * License along with this library; if not, write to the
 * Free Software Foundation, Inc., 59 Temple Place - Suite 330,
 * Boston, MA 02111-1307, USA.
 */

class Nagios {
    var $version = '0.02';
    var $config;
    var $contactgroups;
    var $contacts;
    var $hostgroups;
    var $hosts;
    var $services;
    var $host_status;
    var $service_status;
    var $errormsg = "";
    
    // Constructor
    function Nagios() 
    {
        $config = array();
        $contactgroups = array();
        $contacts = array();
        $hostgroups = array();
        $hosts = array();
        $services = array();
        $host_status = array();
        $service_status = array();
    }

    // Public Functions
    function ParseConfigFile($filename)
    {
        if ( ($fp = fopen($filename, 'r')) == FALSE) {
            $this->errormsg =  "Cannot open config file $filename";
            return FALSE;
        }
        while ($line = fgets($fp, 987)) {
              if (preg_match('/^\s*(|#.*)$/', $line)) {
                  continue;
              }
              if (preg_match('/^\s*cfg_file\s*=\s*(\S+)/', $line, $regs)) {
                if ($this->_ParseObjectFile($regs[1]) === FALSE) {
                    return FALSE;
                }
                continue;
              }
              if (preg_match('/^\s*(\S+)\s*=\s*(\S+)/', $line, $regs)) {
                  $this->config[$regs[1]] = $regs[2];
                continue;
              }
        } //while
    } // parse_config_file
    
    function ParseStatusFile()
    {
        $hostst_fields = array ('status','last_check','last_state_change','problem_has_been_acknowledged','time_up','time_down','time_unreachable','(unsigned long)last_notification','current_notification_number','notifications_enabled','event_handler_enabled','checks_enabled','flap_detection_enabled','is_flapping','percent_state_change','scheduled_downtime_depth','failure_prediction_enabled','process_performance_data','plugin_output');
        $servicest_fields = array ('status','attempts','state_type','last_check','next_check','check_type','checks_enabled','accept_passive_service_checks','event_handler_enabled','last_state_change','problem_has_been_acknowledged','last_hard_state','time_ok','time_unknown','time_warning','time_critical','last_notification','current_notification_number','notifications_enabled','latency','execution_time','flap_detection_enabled','is_flapping','percent_state_change','scheduled_downtime_depth','failure_prediction_enabled','process_performance_data','obsess_over_service','plugin_output');

        if ( ($fp = fopen($this->config['status_file'], 'r')) == FALSE) {
            $this->errormsg =  "Could not open status file $filename";
            return FALSE;
        }

        while ($line = fgets($fp,987)) {
            if (preg_match('/\[(\d+)\] SERVICE;([^;]+);([^;]+);(.+)$/', $line, $regs)) {
                $tmparr = explode(';', $regs[4]);
                $this->service_status[$regs[2]][$regs[3]] = array ('last_update' => $regs[1], 'host_name' => $regs[2], 'description' => $regs[3]);
                foreach($servicest_fields as $ordinal => $key) {
                      $this->service_status[$regs[2]][$regs[3]][$key] = $tmparr[$ordinal];
                }
                continue;
            }
            if (preg_match('/\[(\d+)\] HOST;([^;]+);(.+)$/', $line, $regs)) {
                $tmparr = explode(';', $regs[3]);
                $this->host_status[$regs[2]] = array('last_update' => $regs[1], 'host_name' => $regs[2]);
                foreach($hostst_fields as $ordinal => $key) {
                      $this->host_status[$regs[2]][$key] = $tmparr[$ordinal];
                }
                continue;
            }
        }
        fclose($fp);
    }

    // Get All HostGroups that are managed by specified ContactGroup
    function GetContactgroupHostgroups($cgroupname)
    {
        $hgroups = array();
        foreach($this->hostgroups as $hgroupname => $hgroupparms) {
            $members = explode(',', $hgroupparms['contact_groups']);
            if (in_array($cgroupname, $members)) {
	            $hgroups[$hgroupname] = $this->hostgroups[$hgroupname];
            }
        }
        return $hgroups;
    }
    function GetContactContactgroups($contactname)
    {
        $groups = array();
        foreach($this->contactgroups as $groupname => $groupparms) {
            $members = explode(',', $groupparms['members']);
            if (in_array($contactname, $members)) {
	            $groups[$groupname] = $this->contactgroups[$groupname];
            }
        }
        return $groups;
    }
    function GetHostgroupMembers($groupname)
    {
        return explode(',', $this->hostgroups[$groupname]['members']);
    }

    function GetHostsGroups($host)
    {
        $hosts_groups = array();
        foreach ($this->hostgroups as $groupname => $group) {
            $members = explode(',', $group['members']);
            if (in_array($host, $members)) {
	        $hosts_groups[] = $groupname;
	    }
        }
        return $hosts_groups;
    }

    function GetServiceStatus($host, $service)
    {
        return $this->service_status[$host][$service];
    }

    function GetHostByAddr($ipaddr)
    {
        foreach($this->hosts as $hostname => $parms)
        {
            if ($parms['register'] === 0) continue;
            if ($parms['address'] == $ipaddr) {
                return $parms['host_name'];
            }
        }
        return FALSE;
    }
    function GetHostServices($host)
    {
        $hostservices = array();
	$hosts_groups = $this->GetHostsGroups($host);
        foreach($this->services as $service => $parms)
        {
            if ($parms['register'] == '0') continue;
            $hosts = explode(',', $parms['host']);
	    $services_groups = explode(',', $parms['hostgroup_name']);
            if (in_array($host, $hosts)) {
                $hostservices[$service] = $parms;
            }
	    foreach ($hosts_groups as $key => $host_group) {
	        if (in_array($host_group, $services_groups)) {
		    $hostservices[$service] = $parms;
		}
	    }
        }
	//foreach($hostservices as $key=>$value) { echo "$value[service_description], "; }
        return $hostservices;
    }
    // Private functions
    function _ParseObjectFile($filename)
    {
        $scanstate = '';

        if ( ($fp = fopen($filename, 'r')) == FALSE) {
            $this->errormsg =  "Cannot open object file $filename";
            return FALSE;
        }
        while ($line = fgets($fp, 987)) {
            //echo "Debug: ($scanstate) $line<br>";
            if (preg_match('/^\s*(|#.*)$/', $line)) {
                continue;
            }
            if (preg_match('/^\s*define\s+(\S+)\s*{\s*$/', $line, $regs)) {
                $scanstate = $regs[1];
                $tmpobject = array();
                continue;
            }
            if (preg_match('/\s*}/', $line)) { //Completed object
                switch($scanstate) {
                case 'contactgroup':
                    if (!empty($tmpobject['contactgroup_name'])) {
                        $this->contactgroups[$tmpobject['contactgroup_name']] = $tmpobject;
                    }
                    break;
                case 'contact':
                    if (!empty($tmpobject['contact_name'])) {
                        $this->contacts[$tmpobject['contact_name']] = $tmpobject;
                    }
                    break;
                case 'host':
                    if (!empty($tmpobject['host_name'])) {
                        $this->hosts[$tmpobject['host_name']] = $tmpobject;
                    }
                    if (!empty($tmpobject['name'])) {
                        $this->hosts[$tmpobject['name']] = $tmpobject;
                    }
                    break;
                case 'hostgroup':
                    if (!empty($tmpobject['hostgroup_name'])) {
                        $this->hostgroups[$tmpobject['hostgroup_name']] = $tmpobject;
                    }
                    break;
                case 'service':
                    if (!empty($tmpobject['name'])) {
                        $this->services[$tmpobject['name']] = $tmpobject;
                    }
                    break;
                } // switch
                $scanstate = '';
                continue;
            }
            if (preg_match('/\s*(\S+)\s+(\S+)/', $line, $regs)) {
                if ($regs[1] == 'use') {
                    $registered = isset($tmpobject['register']);
                    switch ($scanstate) {
                    case 'host':
                        $tmpobject = array_merge($this->hosts[$regs[2]],$tmpobject);
                        break;
                    case 'hostgroup':
                        $tmpobject = array_merge($this->hostgroups[$regs[2]],$tmpobject);
                        break;
                    case 'hostgroup':
                        $tmpobject = array_merge($this->services[$regs[2]],$tmpobject);
                        break;

                    }
                    if (!$registered) {
                        unset($tmpobject['register']);
                    }
                } else {
                    $tmpobject[$regs[1]] = $regs[2];
                }
                continue;
            }
        } //while
    } // _ParseObjectFile


} // end of Class Nagios
 // vim:et:sw=4:ts=4:
?>
