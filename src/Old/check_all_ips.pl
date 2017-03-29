#!/usr/bin/perl -w 
#===============================================================================
#
#         FILE:  check_all_ips.pl
#
#        USAGE:  ./check_all_ips.pl 
#
#  DESCRIPTION:  Nagios (meta) plugin for checking services on all 
# 								available IPs of a host and returning OK if all
# 								checks return OK.
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  Based on the check_multiaddr plugin by Florent Vuillemin   
# 								 - lafumah@users.sourceforge.net
#
#       AUTHOR:  Ioakim (Makis) Marmaridis (makis), <makis.marmaridis@gmail.com>
#      COMPANY:   
#      VERSION:  0.1
#      CREATED:  20070104
#     REVISION:  ---
#===============================================================================
#                                                                              
# This program is free software; you can redistribute it and/or modify        
# it under the terms of the GNU General Public License as published by         
# the Free Software Foundation; either version 2 of the License, or           
# (at your option) any later version.                                          
#                                                                              
# This program is distributed in the hope that it will be useful,              
# but WITHOUT ANY WARRANTY; without even the implied warranty of               
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the                
# GNU General Public License for more details.                                 
#                                                                              
# You should have received a copy of the GNU General Public License            
# along with this program; if not, write to the Free Software                  
# Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA   
#===============================================================================

use strict;
use warnings;

my $TIMEOUT = 12;	# You might need to edit this parameter

my %STATE = ('OK' => 0, 'WARNING' => 1, 'CRITICAL' => 2, 'UNKNOWN' => 3);
my %PRIO = (0=>3, 1=>2, 2=>0, 3=>1);	# See comments 'PRIORITY' below

#------------------------------------------------------------------------------#
# Main Program                                                                 #
#------------------------------------------------------------------------------#

# Let's start with several checks :
# At least 1 argument provided ?
if (scalar @ARGV == 0) {
	short_usage();
	exit $STATE{'UNKNOWN'};
}

# Do you need help ?
if ($ARGV[0] eq "--help") {
	long_usage();
	exit $STATE{'OK'};
}
if ($ARGV[0] eq "-h") {
	short_usage();
	exit $STATE{'OK'};
}	

# First argument can be executed ?
if (! -x $ARGV[0]) {
	print "$0: ".$ARGV[0]." cannot be executed.\n";
	exit $STATE{'UNKNOWN'};
}

# Now we look for an argument which would be a set of adresses
my @addresses;
my $addr_pos = 0;

foreach (@ARGV) {
	if ($_ =~ /((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}.?)+)/) {
		@addresses = split(/,/, $1);
		last;
	}
	$addr_pos++;	# Position of this argument
}

# No address set could be found
if (scalar @addresses == 0) {
	print "$0: Unable to find an address set, such as: 192.168.0.1,192.168.0.2\n";
	exit $STATE{'UNKNOWN'};
}

# Set up the communication pipe (used by the children processes to send the
# plugin outputs and states
pipe(READ,WRITE);

# Set up an timeout
local $SIG{ALRM} = sub {
	print "Timeout detected (".$TIMEOUT."s - you can edit its duration in $0).\n";
	exit $STATE{'UNKNOWN'}
};
alarm($TIMEOUT);

# Now we fork() as many children as we need
spawnchildren();

#------------------------------------------------------------------------------#
# This part will be executed by the father process only.                       #
# It receives all the results returned by the plugins and processes them to    #
# send back Nagios the service state                                           #
#------------------------------------------------------------------------------#

# Pipe in read-only
close WRITE;

my ($data, $addr, $state, $output);

# $best_* are the default variables to return if no result is better
my ($best_addr, $best_state, $best_output) =
	("No Address", 3, "No result returned by the plugin !");

#
# PRIORITY:
# In this part I consider that each state has a priority defined as follows :
# OK (0) > WARNING (1) > UNKNOWN (3) > CRITICAL (2)
#
# As a consequence, if at least one plugin return 'OK', the state returne to
# Nagios will necessarily be OK. On the contrary, if this metaplugin returns
# 'CRITICAL' to Nagios, then it means every plugin executed (ie on each
# address of the checked host) has returned 'CRITICAL'.
# 

# The loop ends when no child process remains connected to the pipe any longer
while (defined($data = <READ>)) {
	if ($data =~ /^.+<>.+<>.+$/) {
		($addr, $state, $output) = split(/<>/, $data);
		if ($state != 0) {
			# We got a state other than OK back let's report it straight away!
			($best_addr, $best_state, $best_output) = ($addr, $state, $output);
			chomp($best_output);

			# Returned to Nagios :
			print "$best_addr: $best_output\n";
			exit $best_state;
		}
	} else {
		($addr, $state, $output) = ("?", $STATE{'UNKNOWN'}, "$0 did not receive valid data from ".$ARGV[0]);
	}
# 	($best_addr, $best_state, $best_output) = ($addr, $state, $output)
# 		if ($state <= $best_state);
}

# We have all the results, it would be a waste to timeout now...
alarm(0);

chomp($best_output);

# Returned to Nagios :
print "$best_addr: $best_output\n";
exit $best_state;

#------------------------------------------------------------------------------#
# SpawnChildren                                                                #
# Forks as many children as needed and gives them an address to use            #
#------------------------------------------------------------------------------#

sub spawnchildren {
	my ($addr, $pid);

	foreach $addr (@addresses) {
	    $pid = fork();

		if ($pid == -1) {
			print "$0: Unable to fork ! Please check your process count.";
			exit $STATE{'UNKNOWN'};
			
		} elsif ($pid == 0) {
			execcmd($addr);
			exit 0;	# should never be executed
		}
	}
}

#------------------------------------------------------------------------------#
# ExecCmd                                                                      #
# Modifies the command line provided in @ARGV to target only one address       #
# Send the results to the father process using a pipe                          #
#------------------------------------------------------------------------------#

sub execcmd {
	my $addr = shift;
	my @cmd;
	
	close READ;		# Stop reading input pipe
	select WRITE;	# Use WRITE instead of STDOUT
	$| = 1;

	# Replaces the address set by $addr in the command line
	for (my $i = 0; $i < scalar @ARGV; $i++){
		push(@cmd, (($i == $addr_pos) ? $addr : $ARGV[$i]));
	}

	my $result = `@cmd;echo \$?`;
	
	# I expect the plugin's return value (\d+) at the end of the string
	if (!($result =~ /^((.*\n*)+)\n(\d+)\n*$/)) {
		chomp($result);
		$result =~ s/\n+/;/g;	# Removes the line feeds
		print "$addr<>".$STATE{'UNKNOWN'}."<>$result\n";
		exit 1;

	} else {
		$result = $1;
		my $state = $3;
		chomp($result);
		$result =~ s/\n+/;/g;   # Removes the line feeds
		print "$addr<>$state<>$result\n";
		exit 0;
	}		
}



#===============================================================================
#                                                                              
#		Usage                                                                  
#                                                                              
#===============================================================================

sub short_usage {
	print <<END
Check_all_ips - nagios plugin for checking services on hosts with multiple IPs.
Usage: $0 /path/to/my/plugin [my plugin arguments]

Instead of using a single IP address, replace it by a set of addresses
separated by commas. Example: 192.168.0.1,192.168.0.11,192.168.0.21

This plugin uses an inner timeout of $TIMEOUT sec. You can edit it manually
inside this file : my \$TIMEOUT = [value];

>> Try '$0 --help | more' for a much verbose help !
END
}

sub long_usage {
	print <<END
Check_all_ips - nagios plugin for checking services on hosts with multiple IPs.
Usage: $0 /path/to/my/plugin [my plugin arguments]

Instead of using a single IP address, replace it by a set of addresses
separated by commas. Example: 192.168.0.1,192.168.0.11,192.168.0.21

This plugin uses an inner timeout of $TIMEOUT sec. You can edit it manually
inside this file : my \$TIMEOUT = [value];

********************************* EXAMPLE ************************************

Suppose you have a server with 2 network interfaces (using these IP addresses:
192.168.0.1 & 192.168.0.11) and would like to execute ping checks to ensure
that both interfaces are up and running and the server can access the networks
that it is connected to. This plugin will allow you write a single check 
that will internally execute multiple checks for each given IP address. The 
plugin will return immediately when it receives anything other than OK from

If both instances of the check_ping plugin return 'OK', then we assume the
service is up. Else, check_all_ips will return the first non-OK response 
that it received. 

To test pings on multi-homed systems you can do the following:

---- 1. Redefine the check_ping command (or make a new command altogether). 
I am creating a check_multi_ping command below as an example.

define command{
        command_name    check_multi_ping
        command_line    $USER1$/check_all_ips.pl $USER1$/check_ping -H $HOSTADDRESS$ -w 99,99% -c 100,100% -p 5 -t 8
}

---- 2. Define you host with several addresses

... ie instead of typing :
               address 192.168.0.1
... in our host definition (typically in hosts.cfg), we will use :
               address 192.168.0.1,192.168.0.11

---- 3. Then create a service for 'ping_checks' that uses your custom command 

This service will use 'check_multi_ping' as check command :
define service{
    service_description     ping_checks
    host_name               MyServer
		check_command           check_multi_ping!100.0,20%!500.0,60%
	...
}
			
---- 4. Other services

Please note that Nagios will ALWAYS replace \$HOSTADDRESS\$ by THE TWO IP
addresses in check commands (including other services and host check). If
you have a host with only single IP address check_all_ips will still work
for you. It is best however if you know you only deal with a single IP
address to then define and use a command that only accepts that one IP
otherwise you will be calling check_all_ips that in turn calls your plugin
which is somewhat redundant for single IP hosts. 

---- Credits

    Thanks to Florent Vuillemin - lafumah\@users.sourceforge.net for
	his original plugin called check_multiaddr as it served the basis
  for my modification that resulted in the check_all_ips plugin.

	  The motivation behind adopting and changing the check_multi_addr to
	create this plugin is that I needed to check that a service was not
  simply available but that it was available on all available IPs of the 
  host. 

END
}

