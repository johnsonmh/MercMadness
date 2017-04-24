//all fake hosts for testing purposes...

//FAKE HOST data - needs to be combined with the STATUS.DAT info for live information
var host1 = {
  "host_name": "PRINTER_CANON_STA11",
  "alias": "Canon Pixma STA11",
  "address": "53.230.12.111",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "printers",
  "plugin_output": "OK battery doing well",
  "current_problem_id": "0",
  "check_execution_time": "5.00",
  "current_state": "0"
}
var host2 = {
  "host_name": "PRINTER_DELL_MULTI",
  "alias": "Dell Multifunction Printer STA1",
  "address": "18.180.44.111",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTERS",
  "plugin_output": "OK -> PINGING LIKE CRAZY",
  "current_problem_id": "0",
  "check_execution_time": "2.00",
  "current_state": "0"
}
var host3 = {
  "host_name": "ROBOT ARM STA2",
  "alias": "WidowX Robot Arm STA2",
  "address": "53.234.201.195",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "WIN_CTRL",
  "plugin_output": "OK",
  "current_problem_id": "0",
  "check_execution_time": "14.00",
  "current_state": "0"
}
var host4 = {
  "host_name": "NANOBA DESKTOP STA4",
  "alias": "Nanoba Desktop STA4",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PC_WIN_CTRL",
  "plugin_output": "OK :) ",
  "current_problem_id": "0",
  "check_execution_time": "2.00",
  "current_state": "0"
}
var host5 = {
  "host_name": "HP DESKTOP STA5",
  "alias": "HP Desktop STA5",
  "address": "12.354.13.115",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PC_WIN_CTRL",
  "plugin_output": "OK !! :) ",
  "current_problem_id": "0",
  "check_execution_time": "4.00",
  "current_state": "0"
}
var host6 = {
  "host_name": "DELL DESKTOP STA6",
  "alias": "Dell Desktop STA6",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "QSYS_PC_WIN_CTRL",
  "plugin_output": "OK !! :) ",
  "current_problem_id": "0",
  "check_execution_time": "4.00",
  "current_state": "0"
}
var host7 = {
  "host_name": "CYBERPOWER STA7",
  "alias": "Cyberpower Gaming Desktop STA7",
  "address": "12.134.0.15",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PC_CTRL",
  "plugin_output": "OK !! :) ",
  "current_problem_id": "0",
  "check_execution_time": "4.00",
  "current_state": "0"
}
var host8 = {
  "host_name": "SUPER SWITCH STA8",
  "alias": "Super Switch STA8",
  "address": "13.84.893.315",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "SWITCHES",
  "plugin_output": "WARNING !! Not sure what's going on!",
  "current_problem_id": "1",
  "check_execution_time": "1.00",
  "current_state": "1"
}
var host9 = {
  "host_name": "HP GIANT PRINTER STA9",
  "alias": "HP Giant Studio Printer STA9",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTERS",
  "plugin_output": "OK !!",
  "current_problem_id": "0",
  "check_execution_time": "64.00",
  "current_state": "0"
}
var host10 = {
  "host_name": "CANON IMAGECLASS STA10",
  "alias": "Canon Imageclass STA10",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTERS",
  "plugin_output": "OK !! :) ",
  "current_problem_id": "0",
  "check_execution_time": "4.00",
  "current_state": "0"
}
var host11 = {
  "host_name": "SAMSUNG COLOR STA12",
  "alias": "Samsung Wireless Color STA12",
  "address": "344.14.773.75",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTERS",
  "plugin_output": "OK -- NO PROBLEMS AT ALL EVER",
  "current_problem_id": "0",
  "check_execution_time": "1.00",
  "current_state": "0"
}
var host12 = {
  "host_name": "EPSON LASER STA12",
  "alias": "EPSON Laser STA12",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTERS",
  "plugin_output": "OK NO PROBLEMS",
  "current_problem_id": "0",
  "check_execution_time": "1.00",
  "current_state": "0"
}
var host13 = {
  "host_name": "MAKERGEAR STA13",
  "alias": "MakerGear 3D Printer STA13",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTERS",
  "plugin_output": "OK",
  "current_problem_id": "0",
  "check_execution_time": "1.00",
  "current_state": "0"
}
var host14 = {
  "host_name": "3D Systems Cube Printer STA13",
  "alias": "3D Systems Cube Printer STA13",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTERS",

  "plugin_output": "OK",
  "current_problem_id": "0",
  "check_execution_time": "1.00",
  "current_state": "0"
}
var host15 = {
  "host_name": "Epson Workforce STA10",
  "alias": "Epson Workforce STA10",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTERS",

  "plugin_output": "OK ----",
  "current_problem_id": "0",
  "check_execution_time": "1.00",
  "current_state": "0"
}
var host16 = {
  "host_name": "HP Model STA14",
  "alias": "HP Model STA14",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "QSYS_SVR_WIN",

  "plugin_output": "WARNING",
  "current_problem_id": "1",
  "check_execution_time": "14.00",
  "current_state": "1"
}
var host17 = {
  "host_name": "HP Laptop Red",
  "alias": "HP Laptop Red STA7",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PC",

  "plugin_output": "OK yes its okay",
  "current_problem_id": "0",
  "check_execution_time": "14.00",
  "current_state": "0"
}
var host18 = {
  "host_name": "Epson Expression Home Printer",
  "alias": "Epson Expression Home Printer STA6",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTERS",
  "plugin_output": "OK",
  "current_problem_id": "0",
  "check_execution_time": "14.00",
  "current_state": "0"
}
var host19 = {
  "host_name": "Brother Laser Printer",
  "alias": "Brother Laser Printer STA6",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTERS",
  "plugin_output": "PENDING",
  "current_problem_id": "0",
  "check_execution_time": "14.00",
  "current_state": "0"
}
var host20 = {
  "host_name": "Lexmark STA4",
  "alias": "Lexmark STA4",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTERS",

  "plugin_output": "OK NO WARNING",
  "current_problem_id": "0",
  "check_execution_time": "14.00",
  "current_state": "0"
}
var host21 = {
  "host_name": "Zuta Robot Printer STA5",
  "alias": "Zuta Robot Printer STA5",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTER",

  "plugin_output": "OK ----",
  "current_problem_id": "0",
  "check_execution_time": "14.00",
  "current_state": "0"
}
var host22 = {
  "host_name": "Fancy Server STA3",
  "alias": "Fancy Server STA3",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "SERVERS",
  "plugin_output": "OK yes its okay",
  "current_problem_id": "0",
  "check_execution_time": "14.00",
  "current_state": "0"
}
var host23 = {
  "host_name": "Grey Printer STA17",
  "alias": "Grey Printer STA17",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTERS",

  "plugin_output": "OK yes its okay",
  "current_problem_id": "0",
  "check_execution_time": "14.00",
  "current_state": "0"
}
var host24 = {
  "host_name": "Acer Laptop",
  "alias": "Acer Laptop STA1",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PC",
  "plugin_output": "OK",
  "current_problem_id": "0",
  "check_execution_time": "14.00",
  "current_state": "0"
}
var host25 = {
  "host_name": "Large Green Printer STA17",
  "alias": "Large Green Printer STA17",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTERS",
  "plugin_output": "OK not fine!",
  "current_problem_id": "0",
  "check_execution_time": "14.00",
  "current_state": "0"
}
var host26 = {
  "host_name": "HP White STA14",
  "alias": "HP White STA14",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTERS",

  "plugin_output": "OK",
  "current_problem_id": "0",
  "check_execution_time": "14.00",
  "current_state": "0"
}
var host27 = {
  "host_name": "Novation Zero STA16",
  "alias": "Novation Zero STA16",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTERS",

  "plugin_output": "OK yes its okay",
  "current_problem_id": "0",
  "check_execution_time": "14.00",
  "current_state": "0"
}
var host28 = {
  "host_name": "Livid Instruments STA15",
  "alias": "Livid Instruments STA15",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTERS",
  "plugin_output": "OK yes its okay",
  "current_problem_id": "0",
  "check_execution_time": "14.00",
  "current_state": "0"
}
var host29 = {
  "host_name": "Dell Flip Notebook",
  "alias": "Dell Flip Notebook STA15",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PC",
  "plugin_output": "OK yes its okay",
  "current_problem_id": "0",
  "check_execution_time": "14.00",
  "current_state": "0"
}

var host30 = {
  "host_name": "Airport Extreme Printing STA20",
  "alias": "Airport Extreme Printing STA20",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTERS",

  "plugin_output": "OK ----",
  "current_problem_id": "0",
  "check_execution_time": "14.00",
  "current_state": "0"
}
var host31 = {
  "host_name": "Pedal Controller STA21",
  "alias": "Pedal Controller STA21",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTER",
  "plugin_output": "OK",
  "current_problem_id": "0",
  "check_execution_time": "14.00",
  "current_state": "0"
}
var host32 = {
  "host_name": "PRINTER_STA22_XLIGHT",
  "alias": "WHEEL ALIGNMENT XLIGHT ST22",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTERS",

  "plugin_output": "OK yes its okay",
  "current_problem_id": "0",
  "check_execution_time": "14.00",
  "current_state": "0"
}
var host33 = {
  "host_name": "Kiddy Switch STA23",
  "alias": "Kiddy Switch STA23",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "SWITCHES",
  "plugin_output": "OK",
  "current_problem_id": "0",
  "check_execution_time": "14.00",
  "current_state": "0"
}
var host34 = {
  "host_name": "HP All-In-One STA24",
  "alias": "HP All-In-One STA24",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTERS",
  "plugin_output": "PENDING",
  "current_problem_id": "0",
  "check_execution_time": "14.00",
  "current_state": "0"
}
var host35 = {
  "host_name": "Canon Laser Printer STA25",
  "alias": "Canon Laser Printer STA25",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTERS",
  "plugin_output": "OK",
  "current_problem_id": "0",
  "check_execution_time": "14.00",
  "current_state": "0"
}
var host36 = {
  "host_name": "QSYS_PC_STA26_PEDALP",
  "alias": "Pedal Push Controller STA26",
  "address": "53.234.79.188",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "QSYS_PC_WIN_CTRL",

  "plugin_output": "OK battery not dead",
  "current_problem_id": "0",
  "check_execution_time": "5.00",
  "current_state": "0"
}
var host37 = {
  "host_name": "Giant Epson Printer STA27",
  "alias": "Giant Epson Printer STA27",
  "address": "53.234.83.20",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTER",
  "plugin_output": "OK -> PINGING LIKE CRAZY",
  "current_problem_id": "0",
  "check_execution_time": "5.00",
  "current_state": "0"
}
var host38 = {
  "host_name": "QSYS_PC_STA18_PEDALP",
  "alias": "Pedal Push Controller STA18",
  "address": "53.234.79.188",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "QSYS_PC_WIN_CTRL",

  "plugin_output": "OK functioning as usual",
  "current_problem_id": "0",
  "check_execution_time": "5.00",
  "current_state": "0"
}
var host39 = {
  "host_name": "Monochrome Printer STA19",
  "alias": "Monochrome Printer STA19",
  "address": "53.234.83.20",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "QSYS_PC_WIN_CTRL",

  "plugin_output": "OK -> PINGING LIKE CRAZY",
  "current_problem_id": "0",
  "check_execution_time": "5.00",
  "current_state": "0"
}
var host40 = {
  "host_name": "Heavy Duty Printer STA17",
  "alias": "Heavy Duty Printer STA17",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "QSYS_PC_WIN_CTRL",

  "plugin_output": "OK YAY",
  "current_problem_id": "0",
  "check_execution_time": "1.00",
  "current_state": "0"
}
var host41 = {
  "host_name": "Deskjet Printer STA24",
  "alias": "Deskjet Printer STA24",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PRINTERS",
  "plugin_output": "WARNING WARNING",
  "current_problem_id": "1",
  "check_execution_time": "1.00",
  "current_state": "1"
}
var host42 = {
  "host_name": "Ableton Push Software STA22",
  "alias": "Ableton Push Software STA22",
  "address": "53.234.83.35",
  "contact_groups": "+luhd,shopfloor,admins",
  "max_check_attempts": "10",
  "hostgroups": "PUSH CONTROLLER",

  "plugin_output": "OK !! :) ",
  "current_problem_id": "0",
  "check_execution_time": "4.00",
  "current_state": "0"
}
