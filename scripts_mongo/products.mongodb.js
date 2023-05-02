const { stripVTControlCharacters } = require("util");

//insert all products
db.products.insertMany([
    {
        "sku": 1001,
        "productName": "FX-401B",
        "price": 3600,
        "description": "The FX-401 Addressable Fire Alarm Control Panel is a 3 (SLC) loops intelligent addressable multi-zoned panel compatible with the new MIX-4000 Series.",
        "info": [
            {
                "heading": "4 Reasons to choose the FX-401 Addressable Fire Alarm Control Panel:",
                "text": [
                    "The panel is ideal for small to medium jobs. It is easy to install and configure.",
                    "The FX-401 is shipped pre-assembled. It comes with the mainboard, power supply, transformer, main display, black backbox, and a red door enclosure.",
                    "The panel is compatible with the new MIX-4000 Series. It comes with one addressable (SLC) loop and it can have up to 3 loops, with a maximum of 240 MIX-4000 devices per loop. Connect the ALC-480 Dual Loop Adder to the panel to have the extra 2 (SLC) MIX-4000 devices compatible loops. The ALC-480 is sold separately.",
                    "The FX-401 is equipped with a built-in dialer. The dialer provides a means to communicate panel status to the remote central monitoring station using two dedicated phone lines."
                ]
            },
            {
                "heading": "Mircom’s FX-401 Addressable Fire Alarm Control Panel provides the following:",
                "text": [
                    "Main Board, Power Supply and Backbox.",
                    "Multi-zone fire alarm control panel",
                    "3500 Main Display with 4 x 20 LCD display.",
                    "Class A (DCLA), Class X (DCLN), or Class B (DCLB) analog loop(s).",
                    "Four Power Limited Class B, Class A NAC circuits (max 1.5 Amps each – 6.0 Amps total).",
                    "Up to 3 MIX-4000 Compatible (SLC) loops with a maximum of 720 devices, 240 per loop.",
                    "Dedicated common alarm, supervisory, trouble, and auxiliary alarm relays.",
                    "Additional RAX-1048TZDS Display Adder Module can be added to provide 96 annunciation points per Adder.",
                    "Additional outputs include connections for an RTI remote trouble indicator, PR-300 Reverse Polarity Module, an RS-485 bus for connection of up to seven RAX-LCD-LITE, RAM-3500-LCDs, SRM-312s and RA-1000 Series annunciators.",
                    "Auxiliary power is available in the form of 24V FWR unfiltered and unsupervised, 24VDC filtered and regulated, and resettable auxiliary power supply.",
                    "Built-in Dialer.",
                    "Standard BLACK Door"
                ]
            }
        ],
        "inventory": 10,
        "image": ["https://mircom.com/wp-content/uploads/products/FX-401R-front_sm.jpg", "https://mircom.com/wp-content/uploads/products/FX-401R-right_sm.jpg", "https://mircom.com/wp-content/uploads/products/FX-401-right_sm.jpg"],
        "hasChild": "false",
        "notification-list": "null",
        "velocity": "B",
        "specification": "https://mircom.com/wp-content/uploads/product_documents/CAT-5982_FX-401_Addressable_Fire_Alarm_Control_Panel.pdf",
        "manual": "https://mircom.com/wp-content/uploads/product_documents/LT-6670-FX-401-Installation-Manual.pdf"
    },
    {
        "sku": 1002,
        "productName": "FX-401R",
        "price": 3600,
        "description": "The FX-401 Addressable Fire Alarm Control Panel is a 3 (SLC) loops intelligent addressable multi-zoned panel compatible with the new MIX-4000 Series.",
        "info": [
            {
                "heading": "4 Reasons to choose the FX-401 Addressable Fire Alarm Control Panel:",
                "text": [
                    "The panel is ideal for small to medium jobs. It is easy to install and configure.",
                    "The FX-401 is shipped pre-assembled. It comes with the mainboard, power supply, transformer, main display, black backbox, and a red door enclosure.",
                    "The panel is compatible with the new MIX-4000 Series. It comes with one addressable (SLC) loop and it can have up to 3 loops, with a maximum of 240 MIX-4000 devices per loop. Connect the ALC-480 Dual Loop Adder to the panel to have the extra 2 (SLC) MIX-4000 devices compatible loops. The ALC-480 is sold separately.",
                    "The FX-401 is equipped with a built-in dialer. The dialer provides a means to communicate panel status to the remote central monitoring station using two dedicated phone lines."
                ]
            },
            {
                "heading": "Mircom’s FX-401 Addressable Fire Alarm Control Panel provides the following:",
                "text": [
                    "Main Board, Power Supply and Backbox.",
                    "Multi-zone fire alarm control panel",
                    "3500 Main Display with 4 x 20 LCD display.",
                    "Class A (DCLA), Class X (DCLN), or Class B (DCLB) analog loop(s).",
                    "Four Power Limited Class B, Class A NAC circuits (max 1.5 Amps each – 6.0 Amps total).",
                    "Up to 3 MIX-4000 Compatible (SLC) loops with a maximum of 720 devices, 240 per loop.",
                    "Dedicated common alarm, supervisory, trouble, and auxiliary alarm relays.",
                    "Additional RAX-1048TZDS Display Adder Module can be added to provide 96 annunciation points per Adder.",
                    "Additional outputs include connections for an RTI remote trouble indicator, PR-300 Reverse Polarity Module, an RS-485 bus for connection of up to seven RAX-LCD-LITE, RAM-3500-LCDs, SRM-312s and RA-1000 Series annunciators.",
                    "Auxiliary power is available in the form of 24V FWR unfiltered and unsupervised, 24VDC filtered and regulated, and resettable auxiliary power supply.",
                    "Built-in Dialer.",
                    "Standard RED Door"
                ]
            }
        ],
        "inventory": 12,
        "image": ["https://mircom.com/wp-content/uploads/products/FX-401-front_sm-1.jpg", "https://mircom.com/wp-content/uploads/products/FX-401_left_sm.jpg", "https://mircom.com/wp-content/uploads/products/FX-401-right_sm.jpg"],
        "hasChild": "false",
        "notification-list": "null",
        "velocity": "B",
        "specification": "https://mircom.com/wp-content/uploads/product_documents/CAT-5982_FX-401_Addressable_Fire_Alarm_Control_Panel.pdf",
        "manual": "https://mircom.com/wp-content/uploads/product_documents/LT-6670-FX-401-Installation-Manual.pdf"
    },
    {
        "sku": 1003,
        "productName": "RAX-LCD-LITE",
        "price": 1400,
        "description": "The RAX-LCD-LITE Remote LCD Annunciator display mimics the main Fire Alarm Panel display at a remote location.",
        "info": [
            {
                "heading": "null",
                "text": [
                    "The RAX-LCD-LITE Remote LCD Annunciator display mimics the main Fire Alarm Panel display at a remote location. It is equipped with a large 4-line x 20-character back-lit alphanumeric LCD display that uses a simple menu system complete with a directional keypad and switches for Enter, Menu, Cancel and Info. There are five types of enclosure available: the BB-1001, BB-1002, BB-1003, BB-1008, and BB-1012 which can take 1,2,3,8,12 chassis respectively."
                ]
            }
        ],
        "inventory": 36,
        "image": ["https://mircom.com/wp-content/uploads/products/RAX-LCD-LITE-600x600.png"],
        "hasChild": "false",
        "notification-list": "null",
        "velocity": "B",
        "specification": "https://mircom.com/wp-content/uploads/product_documents/CAT-5350_RAX-LCD-LITE_Remote_LCD_Annunciator.pdf",
        "manual": "https://mircom.com/wp-content/uploads/product_documents/LT-1149_RAX-LCD-LITE_Installation_Manual.pdf"
    },
    {
        "sku": 1004,
        "productName": "RAM-1032TZDS",
        "price": 825,
        "description": "The RAM-1032TZDS-CC Main Remote LED Annunciator provides common annunciator functions and 32 points of LED annunciation. The RAM-1032TZDS-CC has indicators for A.C. On, Common Trouble and Signal Silence and controls for System Reset, Lamp Test, Fire Drill, Buzzer Silence and Signal Silence. Each display point can be identified by the slide-in label that slides in beside the LED.",
        "info": [
            {
                "heading": "null",
                "text": [
                    "RAM-1032TZDS-CC Conformal Coated Annunciator provides common annunciator functions and 32 points of LED annunciation. In addition, The RAM-1032TZDS-CC has indicators for A.C. On, Common Trouble and Signal Silence and controls for System Reset, Lamp Test, Fire Drill, Buzzer Silence and Signal Silence. Also, Identify each display point by the slide-in label that slides in beside the LED. The RAM-1032TZDS-CC allows for the control switches to be disabled on a per-function basis for areas that do not require certain common control functions to be remotely located from the fire alarm control unit.",
                    "In order to expand the RAM1032TZDS-CC, use the addition of RAX1048TZDS-CC Programmable LED Annunciator Modules.",
                    "Furthermore, both RAM-1032TZDS-CC Conformal Coated Annunciator and RAX-1048TZDS-CC are conformal coated annunciators and are UL and ULC approved for outdoor use when used with BB-1001WPRA or BB-1002WPRA. It is not necessary to install a heater or a thermostat."
                ]
            }
        ],
        "inventory": 30,
        "image": ["https://mircom.com/wp-content/uploads/products/RAM-1032TZDS-CC-1-600x597.png"],
        "hasChild": "false",
        "notification-list": "null",
        "velocity": "A",
        "specification": "https://mircom.com/wp-content/uploads/product_documents/CAT-5347_RAM-1032TZDS_32-Zone_Remote_LED_Annunciator.pdf"
    },
    {
        "sku": 1005,
        "productName": "RAM-1032TZDS-CC",
        "price": 1120,
        "description": "The RAM-1032TZDS-CC Main Remote LED Annunciator provides common annunciator functions and 32 points of LED annunciation. The RAM-1032TZDS-CC has indicators for A.C. On, Common Trouble and Signal Silence and controls for System Reset, Lamp Test, Fire Drill, Buzzer Silence and Signal Silence. Each display point can be identified by the slide-in label that slides in beside the LED.",
        "info": [
            {
                "heading": "",
                "text": [
                    "RAM-1032TZDS-CC Conformal Coated Annunciator provides common annunciator functions and 32 points of LED annunciation. In addition, The RAM-1032TZDS-CC has indicators for A.C. On, Common Trouble and Signal Silence and controls for System Reset, Lamp Test, Fire Drill, Buzzer Silence and Signal Silence. Also, Identify each display point by the slide-in label that slides in beside the LED. The RAM-1032TZDS-CC allows for the control switches to be disabled on a per-function basis for areas that do not require certain common control functions to be remotely located from the fire alarm control unit.",
                    "In order to expand the RAM1032TZDS-CC, use the addition of RAX1048TZDS-CC Programmable LED Annunciator Modules.",
                    "Furthermore, both RAM-1032TZDS-CC Conformal Coated Annunciator and RAX-1048TZDS-CC are conformal coated annunciators and are UL and ULC approved for outdoor use when used with BB-1001WPRA or BB-1002WPRA. It is not necessary to install a heater or a thermostat."
                ]
            }
        ],
        "inventory": 6,
        "image": ["https://mircom.com/wp-content/uploads/products/RAM-1032TZDS-CC-1-600x597.png"],
        "hasChild": "false",
        "notification-list": "null",
        "velocity": "B",
        "specification": "https://mircom.com/wp-content/uploads/product_documents/CAT-5346_RAM-1032TZDS-CC_32-Zone_Conformal_Coated_Remote_LED_Annunciator.pdf"
    },
    {
        "sku": 1006,
        "productName": "RAX-1048TZDS",
        "price": 555,
        "description": "RAX-1048TZDS Programmable Remote Annunciator Module provides 48 programmable bi-coloured LEDs that can be identified by slide-in labels. The RAX-1048TZDS connects to the main control unit or main annunciator module when mounted remotely.",
        "info": [
            {
                "heading": "null",
                "text": [
                    "The RAX-1048TZDS Programmable Remote Annunciator Module provides 48 programmable bi-coloured LEDs. The RAX-1048TZDS connects to the main control unit or main annunciator. Each display point can be identified by the slide-in label that slides in beside the LED. The RAX-1048TZDS occupies one display position in the BB-1000D or BB-5000D Series enclosures.",
                    "The RAX-1048TZDS interconnects via one ribbon cable to the RAM-1032TZDS. Another option is to connect the RAX-1048TZDS to the previous RAX-1048TZDS, adding up to 48 additional points of control with trouble annunciation.",
                    "The RAX-1048TZDS Programmable Remote Annunciator is really easy to install. Once installed, the Annunciator can be programmed via Fire Alarm Control Panel configurator. The RAX-1048TZDS is available in Canada, the US and International Market. The additional 48 points of control can be useful when space as an issue. This annunciator was developed to make projects more affordable and easier to install."
                ]
            }
        ],
        "inventory": 10,
        "image": ["https://mircom.com/wp-content/uploads/products/RAX-1048TZDS-600x599.png"],
        "hasChild": "false",
        "notification-list": "null",
        "velocity": "A",
        "specification": "https://mircom.com/wp-content/uploads/product_documents/CAT-5349_RAX-1048TZDS_48-Zone_Remote_LED_Adder_Annunciator.pdf",
        "manual": "https://mircom.com/wp-content/uploads/pdf/LT-617_RA-1000_Installation_and_Wiring_Manual.pdf"
    },
    {
        "sku": 1007,
        "productName": "RAX-1048TZDS-CC",
        "price": 830,
        "description": "RAX-1048TZDS-CC Conformal Coated Programmable Remote Annunciator Module provides 48 programmable bi-coloured LEDs that can be identified by slide-in labels. The RAX-1048TZDS connects to the main control unit or main annunciator module when mounted remotely.",
        "info": [
            {
                "heading": "nul",
                "text": [
                    "RAX-1048TZDS-CC Conformal Coated Annunciator. The RAX-1048TZDS-CC Programmable LED Annunciator Module provides 48 programmable bi-coloured LEDs. The RAX-1048TZDS-CC connects to the main control unit or main annunciator module when mounted remotely. Each display point can be identified by the slide-in label that slides in beside the LED. The RAX-1048TZDS-CC occupies one display position in the BB-1000D or BB-5000D Series enclosures.",
                    "The RAX-1048TZDS-CC interconnect via one ribbon cable to the RAM-1032TZDS-CC or the previous RAX-1048TZDS-CC, adding up to 48 additional points of control with trouble annunciation. RAX-1048TZDS-CC is a conformal coated annunciator and are UL and ULC approved for outdoor use when used with BB-1002WP(R)A. No heat or thermostat is needed.",
                ]
            },
            {
                "heading": "Features",
                "text": [
                    "UL/ULC approved for outdoor use with BB-1002WP(R)A.",
                    "Conformal Coated Annunciator",
                    "48 Bi-colored LEDs",
                    "48 Zoned Trouble LEDs",
                    "Interconnects via ribbon cable to RAM-1032TZDS-CC",
                    "Interconnects via ribbon cable to previous RAX-1048TZDS-CC",
                    "Mounts in BB-1000 Series enclosure or BB-5008 or BB-5014",
                    "UL/ULC approved for outdoor use with BB-1002WP(R)A.",
                ]
            }
        ],
        "inventory": 10,
        "image": ["https://mircom.com/wp-content/uploads/products/RAX-1048TZS-CC-1.png"],
        "hasChild": "false",
        "notification-list": "null",
        "velocity": "B",
        "specification": "https://mircom.com/wp-content/uploads/product_documents/CAT-5348_RAX-1048TZDS-CC_48-Zone_Conformal_Coated_Remote_LED_Annunciator.pdf",
        "manual": "https://mircom.com/wp-content/uploads/pdf/LT-617_RA-1000_Installation_and_Wiring_Manual.pdf"
    },
    {
        "sku": 1008,
        "productName": "UIMA4",
        "price": 295,
        "description": "The UIMA4 is an interface for configuring FleX-Net™, FA-300, FX-350, FX-2000, FX-3500, FX-3318, QX-5000, and UDACT-300. The ribbon cable can be replaced.",
        "info": [
            {
                "heading": "The UIMA4 interface has 3 connectors:",
                "text": [
                    "9 pin male serial connector for connecting the UIMA4 to the9 pin male to female serial cable and then to the RS-232 serial port on some products",
                    "USB B female connector for connecting the UIMA4 to the USB A to B male cable and then to the computer",
                    "10 pin female connector for connecting the UIMA4 to the configuration port or debug interface on some products"
                ]
            }
        ],
        "inventory": 10,
        "image": ["https://mircom.com/wp-content/uploads/products/UIMA4-600x599.png"],
        "hasChild": "false",
        "notification-list": "null",
        "velocity": "A",
        "specification": "https://mircom.com/wp-content/uploads/product_documents/CAT-9517_UIMA4_Interface_for_Configurating_MGC_Fire_Panels.pdf",
        "manual": "https://mircom.com/wp-content/uploads/product_documents/CAT-9519_MGC-CONFIG-KIT4_Fire_Panel_Configuration_Kit.pdf"
    },
    {
        "sku": 1009,
        "productName": "MGC-CONFIG-KIT4",
        "price": 425,
        "description": "The UIMA4 is an interface for configuring FleX-Net™, FA-300, FX-350, FX-2000, FX-3500, FX-3318, QX-5000, and UDACT-300. The ribbon cable can be replaced.",
        "info": [
            {
                "heading": "The UIMA4 interface has 3 connectors:",
                "text": [
                    "9 pin male serial connector for connecting the UIMA4 to the9 pin male to female serial cable and then to the RS-232 serial port on some products",
                    "USB B female connector for connecting the UIMA4 to the USB A to B male cable and then to the computer",
                    "10 pin female connector for connecting the UIMA4 to the configuration port or debug interface on some products"
                ]
            }
        ],
        "inventory": 6,
        "image": [`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo8RHhZwqyqf0cd1IwqCak4r54UJX2cIPhHN1eoTuJHz4f-mq3IOXoZOABUjv7y-TMflY&usqp=CAU`],
        "hasChild": "false",
        "notification-list": "null",
        "velocity": "B",
        "specification": "mircom-cat-9519-mgc-config-kit4-fire-panel-configuration-kit-0745698321.pdf",
    },
    {
        "sku": 1009,
        "productName": "MGC-CONFIG-KIT4",
        "price": 425,
        "description": "The UIMA4 is an interface for configuring FleX-Net™, FA-300, FX-350, FX-2000, FX-3500, FX-3318, QX-5000, and UDACT-300. The ribbon cable can be replaced.",
        "info": [
            {
                "heading": "The UIMA4 interface has 3 connectors:",
                "text": [
                    "9 pin male serial connector for connecting the UIMA4 to the9 pin male to female serial cable and then to the RS-232 serial port on some products",
                    "USB B female connector for connecting the UIMA4 to the USB A to B male cable and then to the computer",
                    "10 pin female connector for connecting the UIMA4 to the configuration port or debug interface on some products"
                ]
            }
        ],
        "inventory": 6,
        "image": [`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo8RHhZwqyqf0cd1IwqCak4r54UJX2cIPhHN1eoTuJHz4f-mq3IOXoZOABUjv7y-TMflY&usqp=CAU`],
        "hasChild": "false",
        "notification-list": "null",
        "velocity": "B",
        "specification": "mircom-cat-9519-mgc-config-kit4-fire-panel-configuration-kit-0745698321.pdf",
    }
]);

db.test.find({"collab.approved": "true","collab.asked": "true"});

//delete all the values from the database test
db.test.remove({});

db.test.insertMany([
    {
        "collab": {
            "email": "1111",
            "approved": "false",
            "asked": "false",
        }
    },{
        "collab": {
            "email": "2222",
            "approved": "true",
            "asked": "false",
        }
    },{
        "collab": {
            "email": "3333",
            "approved": "false",
            "asked": "true",
        }
    }
])
