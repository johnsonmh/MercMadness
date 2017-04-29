var config = {
    GOOGLE_MAPS_API_KEY : 'YOUR GOOGLE MAPS API KEY HERE',
    PATH_TO_IMAGES: '/merc/front_end/images', //for example: /nagios/opt/share/images/device_images....
    PATH_TO_KMLS: '/merc/KMZ'
}

var areasMapped = { "Assembly Line": ["1","2"],
                    "Wheel Alignment": ["3","4","5"],
                    "Body Offload": ["6","7"],
                    "Dyno": ["8","9"],
                    "Finish Line": ["10"],
                    "Paint Touch Up": ["11"],
                    "Rework": ["12","13","14"],
                    //we have no way to map hosts to buildings...
                    "U. Area 1": ["15", "16"],
                    "U. Area 2": ["17", "18", "19"],
                    "U. Area 3": ["20"],
                    "B.S. Area 1": ["21"],
                    "B.S. Area 2": ["22"],
                    "B.S. Area 3": ["23"],
                    "P.S. Area 1": ["24"],
                    "P.S. Area 2": ["25"],
                    "M.Y. Area 1": ["26"],
                    "M.Y. Area 2": ["27"]
                  }


//Define each main KML (Building) and the subKMLs (Areas)
var mbvMainKML = {
          'title' : 'MBV',
  'mainKmlSource' : '/merc/KMZ/Assembly Line and Office/mainMBV.kml',
  'subKmlSources' : [ '/merc/KMZ/Assembly Line and Office/Assembly Line1.kml',
                      '/merc/KMZ/Assembly Line and Office/Body Offload1.kml',
                      '/merc/KMZ/Assembly Line and Office/Dyno1.kml',
                      '/merc/KMZ/Assembly Line and Office/Finish Line1.kml',
                      '/merc/KMZ/Assembly Line and Office/Paint Touch Up1.kml',
                      '/merc/KMZ/Assembly Line and Office/Rework1.kml',
                      '/merc/KMZ/Assembly Line and Office/Wheel Alignment1.kml'
                    ]
                  }

var uplifterMainKML = {
          'title' : 'Uplifter',
  'mainKmlSource' : '/merc/KMZ/Uplifter/mainUplifter.kml',
  'subKmlSources' : [ '/merc/KMZ/Uplifter/up_area1.kml',
                      '/merc/KMZ/Uplifter/up_area2.kml',
                      '/merc/KMZ/Uplifter/up_area3.kml'
                    ]
                  }

var paintShopMainKML = {
          'title' : 'Paint Shop',
  'mainKmlSource' : '/merc/KMZ/Paint Shop/mainPaintShop.kml',
  'subKmlSources' : [ '/merc/KMZ/Paint Shop/ps_area1.kml',
                      '/merc/KMZ/Paint Shop/ps_area2.kml'
                    ]
                  }

var bodyShopMainKML = {
          'title' : 'Body Shop',
  'mainKmlSource' : '/merc/KMZ/Body Shop/mainBodyShop.kml',
  'subKmlSources' : [ '/merc/KMZ/Body Shop/bs_area1.kml',
                      '/merc/KMZ/Body Shop/bs_area2.kml',
                      '/merc/KMZ/Body Shop/bs_area3.kml'
                    ]
                  }

var marshallingYardMainKML = {
          'title' : 'Marshalling Yard',
  'mainKmlSource' : '/merc/KMZ/Marshalling Yard/myMainKML.kml',
  'subKmlSources' : [ '/merc/KMZ/Marshalling Yard/my_area1.kml',
                      '/merc/KMZ/Marshalling Yard/my_area2.kml'
                    ]
                  }

//make an array of all the main KMLs
var mainKmlArray = [mbvMainKML, uplifterMainKML, paintShopMainKML, bodyShopMainKML, marshallingYardMainKML];
