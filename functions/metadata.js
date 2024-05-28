const express = require('express');
const axios = require('axios');
const cors = require('cors');

const serverless = require('serverless-http');

const router = express.Router();
const app = express();
const PORT = process.env.PORT || 3001;
const BASE_URL = 'https://hychain.calderaexplorer.xyz/api/v2';

app.use(cors());
app.use(express.json());

// Split metadata into sections
const metadata1_500 = {
    "1": {
        "name": "Bloke #1",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/G7xQkC82mA4XVZRvlHcVf5Ao4WISOgYuSWEi9eu0GuQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Shades Laser"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "2": {
        "name": "Bloke #2",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/572zQZXtAejTubVHXZ-wIqqtY9iJaMJQR0BA1GRZ6_s",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Shades"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "3": {
        "name": "Bloke #3",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/EEEG0BFToqae4SHdvD2nm4Dgkq_GIV9qAHisaWP5B1U",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "4": {
        "name": "Bloke #4",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/FXNxou4BOLY6OSJL8Nk5gsuPq3Wa92qgJNjxyTZ3bG4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "5": {
        "name": "Bloke #5",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/LD_xrBcMIFHXWfpY1JTAnoF8FXgk5k1SrNe93YWm5n4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank White"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Multi"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Smoke"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "6": {
        "name": "Bloke #6",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/tDYmwVKlKSzNvbYOA6kLcas4JrR9o1O_bk9bZSJQ5NQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "7": {
        "name": "Bloke #7",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/puIFLA8Fq8hkXInlcXgNfO3c1ZrE2D3l0Z2qvQ4CWl8",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Purple"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "8": {
        "name": "Bloke #8",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/trkCE2ivv3w7jNmKavDp7c558MuyLKhZk1sYOMjIewM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Red"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "9": {
        "name": "Bloke #9",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/C3bdu1VVIhqBEc2_44sBBzvzz0bdlItZiTuAv2js5xQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Orange"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "10": {
        "name": "Bloke #10",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/hvIXPFfOCIbXkyeLzyKc4ZT4clFlq1d_qRUQa9IbAhY",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Orange"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "11": {
        "name": "Bloke #11",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/CR3LxLZkWyqf1JGDomMFTcEG7HbHOWhXJfqGMoCs7LM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "12": {
        "name": "Bloke #12",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/sAyW1A6CNcrHQh_0L-Ztjmk1DvIr5buGQK8qfI875vI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "13": {
        "name": "Bloke #13",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/JreO7jIyA2kWbRNJIfc09c_0oXsHhzJpo0a1eRbrLa4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "14": {
        "name": "Bloke #14",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/JSa0ygFCAdXJu-KIenScFLhzPHQH_cRvyM2Z2uTWFO4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "15": {
        "name": "Bloke #15",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/QRdWRhF6JKdlaagxdNH9PeTEy1h3wfVnB_9AxiZuaiU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Purple"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "16": {
        "name": "Bloke #16",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/XwPuBBpDaaoJ-vNdofPvXzqNJfHLfFbGjj-vhP826BQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Black"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Purple"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "17": {
        "name": "Bloke #17",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/mdsdrNUYVeJhaA1ri-AHNtSTRtoZUSfbOKEZqnUqVDU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "18": {
        "name": "Bloke #18",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Waj6JUGJf6_Xmrhhu6l1a7EDd3hVo_wClYX3ZEMQz8E",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "19": {
        "name": "Bloke #19",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/oNp9FGVkM5y6VYdd_OTGvtfmbxQRJosAqA9NO8APntU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Red"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Multi"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "20": {
        "name": "Bloke #20",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/52T2VtO1YfhHIIfHwwHnUCn5CP8OBN4UwcpWuxOjuiU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Red"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Multi"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Purple"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "21": {
        "name": "Bloke #21",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/0bDWbZFTny6t5yroD77PQtlArfNKzut01MbkYDX8_5I",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "22": {
        "name": "Bloke #22",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/qmmK-FYZlh3C_xrPBgeoPcvO25MetomsB8wBw3bVqQE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "23": {
        "name": "Bloke #23",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Up7GqNjcasivMqU0-_qtJ5EvIBmOjSYrVyYYStAW7H4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Multi"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "24": {
        "name": "Bloke #24",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/e0yMSoxKEakNAFbsXBO-HghTtPWcy2F-tRFCe33GOLU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank Tie Zombie"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "25": {
        "name": "Bloke #25",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/1npJ-fCzKBBKY9bcHYQc8aJmAES7JKv4294B2yTTP7M",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Red"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "26": {
        "name": "Bloke #26",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/3GXcYTWYs9MHe55b_QGYcOZcexLmC_3JiznIt5lgP-Y",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "27": {
        "name": "Bloke #27",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/jDSqW6jf-toAGQAssj6bXOWx6Av7GbqKpWwSbmax5fw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "28": {
        "name": "Bloke #28",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/5yrjZWhBZrEwYgiNndTgz-smWEin2_CwdztDPSueG-4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "29": {
        "name": "Bloke #29",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/YHvAv0ZzNV6bb-BFQirLHkvectVItlzEaSn6mQpMEso",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank White"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "30": {
        "name": "Bloke #30",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/WIOc9jPM015bQtDKIJTLSxW_u3mnNaOwjvqFESl0jgQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank White"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "31": {
        "name": "Bloke #31",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/81hCppMvLCJcueXJC7PXxnC3K5hXmUdAqGRDVNIeT5A",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "32": {
        "name": "Bloke #32",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/ZkLCTIQpBohsl0w0mcP87QVE0FVEyHNqXBucj4HPgy4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "33": {
        "name": "Bloke #33",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/KHEyAJdMEZx7OypcYZ7btb1fUxwhcNRkJLlp6wVW4Eg",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "34": {
        "name": "Bloke #34",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/j3V4zz_GEThe3IG2MQQ7OmopzycrFKNXKdDT4oQ57-E",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "35": {
        "name": "Bloke #35",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/nX2gflpCBKcoqkocXEvnY31_AMibFw6sIwCyt3vGNI0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "36": {
        "name": "Bloke #36",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/jCmsJKwXeHOegHNRR8p_S9Bkl4zMqn9UTpcvlD2f2KQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "37": {
        "name": "Bloke #37",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/nntW-WvOoz0ofYw5iji0LGe0BEqzaNTDplCnoDCgpvM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank Tie Zombie"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Pink"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "38": {
        "name": "Bloke #38",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/NJEiVu_5u6qKb-jip0xYQKEJ_32f6B7TTA-UlOeVPUs",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "39": {
        "name": "Bloke #39",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/pJ3hqpVEGnPPAj9PhXBnDrjgLpn9J_GuYSfdOG_a3j8",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Shades"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "40": {
        "name": "Bloke #40",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/lvHv4SvgSRtHJw196dLZnenI5GJPuT1X5CJ1T8X2pt8",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Orange"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "41": {
        "name": "Bloke #41",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/46rzZ2Hn8SyZosuqEg4VdGe74PDFmU1zdnGGmuZ3J5o",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Red"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "42": {
        "name": "Bloke #42",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/wZKWrGRpdprUAU78-c9gN0HQLtUQTNLbOLlGxAKqFsc",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Pink"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "43": {
        "name": "Bloke #43",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/_OBEb0-9FZMjvxYwCc1kAfVUgyasnagI0qj6ziPrvjI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "44": {
        "name": "Bloke #44",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Wu7AA9xT8WjsXUahahRUyVr59X3OEARClj1uGK7kq54",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Silver"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "45": {
        "name": "Bloke #45",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/QueUzWBb7j5L70RjT5cQiiSkupx5_gu2vht8DZY2O44",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Shades Laser"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "46": {
        "name": "Bloke #46",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/9Nx7w2RuSa_dzReDG2-YMApW69QHJ745hfRZz-ZSXzg",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Red"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "Red Teardrop"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "47": {
        "name": "Bloke #47",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/105vT7BotFIc7hKTJTmR5GYgb4_UG8WSyQ6p06Wtdc0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "48": {
        "name": "Bloke #48",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/rpamR2DGFzVNfd_h5-PV_PLKd9yn-3LbZpzVgUfH7es",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Orange"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank White"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "49": {
        "name": "Bloke #49",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Q2J2FgdS1Rsr-9MbLLskLipopoGFjZRbuWEvi2fLJj8",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "50": {
        "name": "Bloke #50",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/kbGhddTaUp__pOtdRcoycdNV-FXOZA9DK5Jyyjyvc3A",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "51": {
        "name": "Bloke #51",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/PZfgxIvjC-YBzD2R6ba6l9ad5uqc3RDWzrgLn6QANvs",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "52": {
        "name": "Bloke #52",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/BwKSOxhf2WNkE8GkOtT8FUhDoABX-VTWbLEifhOUbpg",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "53": {
        "name": "Bloke #53",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/8t1KakCgPigBhLkmiOGaNh3NQRMkYvPQFu0c59VYvtA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank White"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Pink"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "54": {
        "name": "Bloke #54",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/mS1MOyZ3dG9CiIpxlFvlYIl4CuqkdvYjC7fi88z5j9M",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "55": {
        "name": "Bloke #55",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/peQg2PRrZjyjjoF_SbMxNKHIf04ycKg6Mbxjz5MZgVI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Pink"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "56": {
        "name": "Bloke #56",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/8OzaPkexwdt4mqQrP3M1-zH0kAQzH4dac4OCCsWvPjc",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "57": {
        "name": "Bloke #57",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/4HU3Prp52BVb6nzEtw-lrVhhk0d143qvCtMGyfSrAbE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "58": {
        "name": "Bloke #58",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/KD3uG0H9WlDG_KHXTsQMOenVICk2Ap9lBwqgQtJY77I",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "59": {
        "name": "Bloke #59",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/peJpK_g8cdNp2fesioIOz7H8gxrpw1lJa1bt7vjKK7o",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "60": {
        "name": "Bloke #60",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/V_jYd2ZxwgLGPOVVvzzxsAqaGWly_Lfj8Mj1PDGlP0U",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Black"
            },
            {
                "trait_type": "Top",
                "value": "Shades Laser"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "61": {
        "name": "Bloke #61",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/2sDStnHP4l_5JR7UnOl7GCBMnwyKinXV8wXb_B--ZSo",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "62": {
        "name": "Bloke #62",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/RGjwuQ5vDYPQYS2Z_MkqMDsLSM4pX04PkQTXv96seMg",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Red"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "63": {
        "name": "Bloke #63",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/3DMOeWChVhF8wbeaK1FDfeq5n4N7_ovLFoREvnCNZkA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "64": {
        "name": "Bloke #64",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/2qow-FUnaoWujfieCliJ_OXXqnIgkP4KHyD6iqjvJJk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Multi"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "65": {
        "name": "Bloke #65",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/FgbdKCc5AjbZ98ftFjOR_FmCrY_iiyV2n45egW9rotk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Silver"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Smoke"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "66": {
        "name": "Bloke #66",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Lh2SRBQwqDI5J-52mHExOdWxJ2OW8F6Qf2ju4E5wpmk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "67": {
        "name": "Bloke #67",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/w2jLBRom-nC8lhvEgwrTRyRyVstfZjpdKiH1ccyrYFk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "68": {
        "name": "Bloke #68",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/4Vpc8_2VIECeHiAfD8MHZjWZ7zzIUX6zS_v1sWB15TE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Multi"
            },
            {
                "trait_type": "Top",
                "value": "Visor Pink"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "69": {
        "name": "Bloke #69",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/ZW5XvaLBHFpzWcgZxhH1cuvYJam91MH81oVQzD-kX6k",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "70": {
        "name": "Bloke #70",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/ngbzeo-_AYWSDlTNEbMBQfVTUsO1a790IR9qIuFYX7U",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "71": {
        "name": "Bloke #71",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/ZWFouLdp3cevvziFLDGof0AN9c7LtmQmenzRnNSznnc",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Multi"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "72": {
        "name": "Bloke #72",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/e8HyhgliEPWUm-QQwAI2dOnn_yZoBtaOVoaSrSUb5m0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "73": {
        "name": "Bloke #73",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/tM7q60TgvX6IbQDo40h7H5uKLOABy1wj3XhL4-JWTEg",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Black"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "74": {
        "name": "Bloke #74",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/QBmpEDgCGQgLXQUmUy-4in2NRTyq7DoHEluw32Y25IQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "75": {
        "name": "Bloke #75",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/AdDakrtpyFfXMBzaUThiW-sew8vDkB6-POuUCghubjI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Multi"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Red Teardrop"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "76": {
        "name": "Bloke #76",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/y7u6kHvV64vAlUtnp-3WYBO6z5ZjxYrWody6AX_ns0o",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "77": {
        "name": "Bloke #77",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/nb1vna1KcOzqIKlbqRRK5tJ5HNon9D9k_Aia-sATmbE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "78": {
        "name": "Bloke #78",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/SPbrfrreY-4TSInB8M9JSbDb9kyBAdZCGCIKWIEuBAQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Orange"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Red Teardrop"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "79": {
        "name": "Bloke #79",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/0hsq_aawet3pZfNlVuzklvmYjatmMm7dssw6SAgU15U",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Pink"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "80": {
        "name": "Bloke #80",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/lUR6SJzzwihhmG6d8K9U7uMfC8AFlDwzJ2UR-dEhCpQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Multi"
            },
            {
                "trait_type": "Top",
                "value": "Shades"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "81": {
        "name": "Bloke #81",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/eHzw57S8KmX8Mv0gWo93kx1wh5NKZ-F9FoQ9bTiB3YA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "82": {
        "name": "Bloke #82",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/XesCRKt-EdrrmNJ_bpLO_pa7_sde5tTERH7qfNGOSJw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "83": {
        "name": "Bloke #83",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/WL__WMGYbUFIoQVoHxJd6ihf59OeGJT-ayQeaMNO8F8",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "84": {
        "name": "Bloke #84",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/9VTlzkxvS26h7JAfMmX9cfGsfYEcD_sEQ3vZt4F3YQs",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Black"
            },
            {
                "trait_type": "Top",
                "value": "Visor Pink"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "85": {
        "name": "Bloke #85",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/GPiEOaUE4vD69sLi7WZm11f15jKneoBvfuGV37jk474",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "86": {
        "name": "Bloke #86",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/SmLmTXDInYeyx5e8Np3X2voq1GJZ-XUlFI8QUZmRMHc",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank Tie Dye"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "87": {
        "name": "Bloke #87",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/23vGyM2pz8YRmX4SHwwaQ6616EXd_TpC3HnT8iqiqys",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "88": {
        "name": "Bloke #88",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/vqmk5cXQHom42p0pAoyt5-dABVZPKy_NiuNBOqUcyD0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank White"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "89": {
        "name": "Bloke #89",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/BQqgJ8ggNMhSR2OM_KNNZum-wvWuWzHqwH9TzomUf6U",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "90": {
        "name": "Bloke #90",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/5XZpSrBnnpfH-NMk0s52MlOQPVuu1pM2bnci0EtOAe0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Orange"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Purple"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "91": {
        "name": "Bloke #91",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/VLiywUQqVzAixlpkOIX-DluUudnku6id06b8RpUDaWE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "92": {
        "name": "Bloke #92",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/KijPL2xdEj9Ir850lXB80FHnD521Q037mMsMus7xkUk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "93": {
        "name": "Bloke #93",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Q5j9c9dDf78oXtM8hoId76wsQwmGk0UVJONu95283q0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank Tie Dye"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Purple"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "94": {
        "name": "Bloke #94",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/0oC56fh_Ho0OfqKV-D36I8j-Dp_izlatihRy6rmiYFE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "95": {
        "name": "Bloke #95",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Za6cC-g_SkFRGvlYmepL5VtNMLJrpYGbSTtMYGHu4XY",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Multi"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "96": {
        "name": "Bloke #96",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/JNvDYXr6bK8svHDKbVnsK2-fElmA9DgY_FjfvFmk9aU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "97": {
        "name": "Bloke #97",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/NdB0yJUfZrcGGhQMA1Lv28VhApPWh8zvR0TMMrQxREM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "98": {
        "name": "Bloke #98",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/E5yODSkRa-LpVnXVivVHseM856fsjrwLfmq4ItIJGoA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Black"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "99": {
        "name": "Bloke #99",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/PcsElemRR3WIIxuiEOx81vNV6bFbr69cD1K6JYyGTkQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "100": {
        "name": "Bloke #100",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/tnixswv0Ca3Uehbr9UsPYLwCGgCCY1PwoItJYMIZeI4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Smoke"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "101": {
        "name": "Bloke #101",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/H-sCX5Sy9-Aa80JQ_z7TaZ-KIB6NLBDrOd31wSzf2YY",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Black"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "102": {
        "name": "Bloke #102",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/kuyZZun0BTjsGDgMMoQfOINHAHOw9SZ-cbOOkyQflko",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Purple"
            },
            {
                "trait_type": "Face",
                "value": "Red Teardrop"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "103": {
        "name": "Bloke #103",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/QzYlBvldIAtoSpLrDVf2OvHY3GAOQwD9eQBYxtHSskI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "104": {
        "name": "Bloke #104",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/WOjis0B5FJVGUhkVCYQXGhNXO_1WslJ5upk4KbrfptQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "105": {
        "name": "Bloke #105",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/NoEGRe2N_rcCRRlgYJuFJCjXdQQ8fh3MAP4YcnTh6ag",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "106": {
        "name": "Bloke #106",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/UqRehVJxciYnOZb9N2U-8rZb2D_4a8-Ko7t-7TXf5Qs",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "107": {
        "name": "Bloke #107",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/PZJOJo0IFQYFlOoAi_tC7TtCLYVAa5EiW0x1aDg9S6I",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "108": {
        "name": "Bloke #108",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/NhubZSqzyMqErpM0SAzPvgohTEDL4RdUmsLz3LTKAyI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Orange"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "109": {
        "name": "Bloke #109",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/-dWFl9mCK-JFiSgdBUqrNXKHMFIFof7eRKHdvJy8FFg",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Multi"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "110": {
        "name": "Bloke #110",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Bdp3esSqE82FHHwkm0SZuELTNgyhyf9kSFOiTTHwG2Y",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "111": {
        "name": "Bloke #111",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/-w6zvBeQoSe6knKh7idGBoAV68IJuCDiB_N-gWDdDik",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "112": {
        "name": "Bloke #112",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/KyLCiOho_NtLmMA084W5AfSvy2H7hfrt9QgIirFwqHk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Red Teardrop"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "113": {
        "name": "Bloke #113",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/c-N6Xi6G28YGbXEagYmOup9a30zJeEYWHvZ5VyCycwo",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "114": {
        "name": "Bloke #114",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/biO_BpkMsmfswlFKVHZhHCoSvcveWRtEvX0ad1B8UAI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "115": {
        "name": "Bloke #115",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Hv4OMlaxMPWHu5pxBLMIZXGOcYV2Xh33UE3YByU7--E",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "116": {
        "name": "Bloke #116",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/sFnbDc3Y4HLl_0495VjrTAoYnA-ab2c8cD9LxXGzNzw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Purple"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "117": {
        "name": "Bloke #117",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/YCqXqzYkqpZ3ljtlyEV800Ti6T7WtbpRhESmXFN8r4k",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "118": {
        "name": "Bloke #118",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/J5xTV_ayprV2NOhkBXJE2m-auq4C625UfTznEpOXy2E",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "119": {
        "name": "Bloke #119",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/4cSu6JDJA9pOldwm4CS9ACzBB3wDiDImTEZwglg6U0o",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "120": {
        "name": "Bloke #120",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/iGwOuWnmVoAHD9mBMUvxjXB3BvJ8jXO0BhhmcEOACFk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank Tie Dye"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "121": {
        "name": "Bloke #121",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/M2d_e-kxOVbABNRNDWdiVhsXuVAmslzMb5jZb2ETGXI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "122": {
        "name": "Bloke #122",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/vFMPLFtHaTHnLUlsNVQikyiujJb8ZSTFu4pZB5olago",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "123": {
        "name": "Bloke #123",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/UYpBaJxJk7FDhFC0opGMxtAJG5eOuF755xLV_iT_Aj0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Shades"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "124": {
        "name": "Bloke #124",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/F4ExgAFnwqlR5nzfwpBo0SIjmgK6MWlSCYP2sHV9mNE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Silver"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "125": {
        "name": "Bloke #125",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/40d3V3JczIeBctndGMaohzqVEJhNg7KgIDSe6zFViug",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "126": {
        "name": "Bloke #126",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/fd6sFmOCZMZzNnvnY1mwCCL5pDKKj6OnicIJ92sH-1M",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "127": {
        "name": "Bloke #127",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/JSMRCynb7DiTtcRMiWA9_rGWM7zz-y8xP5acrcdbdS8",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "128": {
        "name": "Bloke #128",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/DnSM5KUMROw9Nce4XO0GjiPfYWMUQXthR0Yvmt67gcs",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "129": {
        "name": "Bloke #129",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/-knjC5OjTM9uNm6MJoE85abUrokjU3mNA8iL8YwdPKY",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "130": {
        "name": "Bloke #130",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/67Nm4jKNKoSblf0crxSifoKUkR6vL5sI_11Rmf8JoV8",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "Smoke"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "131": {
        "name": "Bloke #131",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/b9UzSlym6d6lzQhNP8KFsNFzCqHPJCmHUvS5-Sf1m14",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "132": {
        "name": "Bloke #132",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/9f11Ra4T2Hvhd959jHHRgpBOLvdZezst71Hge18E6uk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "133": {
        "name": "Bloke #133",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/7Of2szNA7066_B_0g1N_oEnWqUi5LM3wmWg6CJS4Ggw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "134": {
        "name": "Bloke #134",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/FTbfOtyYvjfNUgU5ffqd2IXkg9HlDtbPD8VgAhK_erE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Orange"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Pink"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "135": {
        "name": "Bloke #135",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/0ni5bUghV8q3k6pphzMysxQa0JrBa0ZTYvkRas5cH9I",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "136": {
        "name": "Bloke #136",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/01Kjtw03dOzKbUiMJiN8M6k5NtnGC7zSntS4XKLIk-Y",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Multi"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "137": {
        "name": "Bloke #137",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/K3gKwwbcSwv75f9pyE0wliKcWDfeaw8rQ9uTrW8-aUg",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Black"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "138": {
        "name": "Bloke #138",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/0O8D5AyPB19G7GcJv0Fle3G8kDnh_Yy579GPzir3Mxk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "139": {
        "name": "Bloke #139",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/ZuNyCRmCHumH6vGnR9YeCl1tfMK1XrFE8ge-JzAc_uI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "140": {
        "name": "Bloke #140",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/nUWWg2ZnIqhSgwPVEgkhpDEbRjisePKCXig7owGyj_o",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "141": {
        "name": "Bloke #141",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/6zmIBS5TwkzFtU-mkDrdzwnBOn-qIUwWLQ9fM7RDJW0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "142": {
        "name": "Bloke #142",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/BTqlTlVfcD32qWed8ttOy0FYt6kCPeEhg8Fkm-NBsOY",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Purple"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "143": {
        "name": "Bloke #143",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/8IZ5X7rQAulx9SbW3QkvS6S8TUyQYWujBm3W_I15djQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Red"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "144": {
        "name": "Bloke #144",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/zINqtBMkjruh-l23lH_jtBa5okB2IAiZPfjxWlg5wBw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "145": {
        "name": "Bloke #145",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/OZEVv8dnkgQUR8Xht48kvaPnhz-b081BFiJJ7o5UCbk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "146": {
        "name": "Bloke #146",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/ioQhOB5rhXYxVw_nTbPOAwzTSYUE24Iu1yv3YnyoP3U",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "147": {
        "name": "Bloke #147",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/5p8iG6Q7CwAkznrtt4VKH47bazrES-oL3mm8q6x3X6g",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Smoke"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "148": {
        "name": "Bloke #148",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/yT9lwe6ugVS1lgZ6OzgIg2YnYwTTpF_7wlduV3ZDGjQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Pink"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "149": {
        "name": "Bloke #149",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/cwQ_iDmyCzAC5UCYiRzkUMb7rxAybCh8Ar9HjmhyqWk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "150": {
        "name": "Bloke #150",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/WY5bPocl4CzoDcoVGYrpNJTGwqFlGz8eHYIN_at6IlU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "151": {
        "name": "Bloke #151",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/rxqmVlOLoqldXe-Gv6t2W6LieNPUgvTPWse-pPjxfLQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "152": {
        "name": "Bloke #152",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/X7nVN1huxz_NBiv7ZiToek9YeGrMprAJI_jzZelvtDw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "153": {
        "name": "Bloke #153",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/fUi94baXQ01AhTtQNqQjWXvxCdMERwGXjnxU08Mrqs4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "154": {
        "name": "Bloke #154",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/zn866sB4RSc55eujB8xm0ENjOdhRZ-ABB1NV1VtQ6Aw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "155": {
        "name": "Bloke #155",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/CURqLG4RHalyLMi4tHwX3TsP1B528NMyc4F1vJJidmw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Silver"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "156": {
        "name": "Bloke #156",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/HaMnGQI6kljHrFXhqdM0QFM_0fc9ckpjHOMxvbDgp50",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "157": {
        "name": "Bloke #157",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/drnqN58UFFMZ-NIhymYFr4DniuC1Cknhrm6GpkrdyNk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "158": {
        "name": "Bloke #158",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/YHLG6BBnKHGGfCa-GSVurC68eK3yad5kDPTn5oB730A",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "159": {
        "name": "Bloke #159",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/vGBGGQBdJQaEB2rO4HdN-BU6LqT3Pjk0dJwGaV0EBxM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Purple"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "160": {
        "name": "Bloke #160",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/LPSDM6uUIt_L2QxbXwceJMM-ejDr9DB7NSyDoGOxmW8",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Shades Laser"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "161": {
        "name": "Bloke #161",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/sgLWltzSjZ6yYMYQPUUQMqj1GKXQaf-ZkOneKCkDwTU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "162": {
        "name": "Bloke #162",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/v4xOGCGhL3PJPxok_klTs4PqD9wrcbXnS9d5G_dyafs",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "163": {
        "name": "Bloke #163",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/KpKUzrp-zzXNLgkahAyv_omkZkHrQMhvzEQ0E7pjex4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "164": {
        "name": "Bloke #164",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/ax7hGPWfyAUj4T4Q8URcG1XrgxyXecuqwv3gNs1ajAs",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Orange"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Pink"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "165": {
        "name": "Bloke #165",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/QecKCLLesQYa1xn_4l9_9D28Sm45gILQWAUXqUKNHZo",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "166": {
        "name": "Bloke #166",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/RMyknyO80P_13KDM3IVvUD9lydPQKA2b9_JN6PZJO2c",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "167": {
        "name": "Bloke #167",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/f5pLd1c08vcSywDPgLNntoXlFJA44BisKjeqZF5-t0U",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Pink"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Smoke"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "168": {
        "name": "Bloke #168",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/HbWTdq24NYKUi63N9lALpX5AMsvATxBRYsT4rXF_d1Y",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Orange"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Purple"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "169": {
        "name": "Bloke #169",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/5dYBaKDb_5Ac11Uw-bkF9DX5kQ4XnI2YFYcwdh2HkPw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "170": {
        "name": "Bloke #170",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/TPlAnNb5w7TWW3jYmieV8gOLSqD324Rxog0xXRFT7m0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "171": {
        "name": "Bloke #171",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/HXkpwnFZ0hh0T4FfGWHW00_t4GtQtOLYUVk5rSbwPHY",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "172": {
        "name": "Bloke #172",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/n41zhlq4Is4D3us-a4m9lBaQ-O41RV3sSk1m-GDSxzA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Shades Laser"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "173": {
        "name": "Bloke #173",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Ad0KrzL5aQkVaFe6bNDZanubHvpE27D0kCrigLvCAHQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Pink"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "174": {
        "name": "Bloke #174",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/UZrflXiBKK3RG17MD2rlcNkGoMgQYcsftWagkIyiKM0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Shades"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "175": {
        "name": "Bloke #175",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/VgbLBa7nlTtEWDaPIC8yyxVKtUXS8cw9QbcoS1ZAQPk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "176": {
        "name": "Bloke #176",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/uFs_bfI6oIcCZktIxVoZzJZXKwDWbCPVqUKWTIMh4R0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "177": {
        "name": "Bloke #177",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/2HNkqrppQ8wREYf6_Rz-i-FwyRd--Q-FwN5r6GQjRKo",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Smoke"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "178": {
        "name": "Bloke #178",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/f-2Snf7TrmUjRVwIAxVDhPcEkBY7ai3dvjHe5d51QGU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Red Teardrop"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "179": {
        "name": "Bloke #179",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Pf0axc17wug4OnjwkFOOPH3hwJH6_M_gmyfaIQ4PKWk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Purple"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "180": {
        "name": "Bloke #180",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/UiYXUrgsbHmyHD-zM8947VpunQA3pFFzd2RU8WWg3lw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Red"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Black"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "181": {
        "name": "Bloke #181",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/AxbeJNSrTiRHB9sH1dBUkgf23dZYtXiLFZk-E4A2sPA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Pink"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "182": {
        "name": "Bloke #182",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/4QfmOu9W8tGJsaKs_XwoCAilrLpFshuW2TukYj99M4U",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Red"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "183": {
        "name": "Bloke #183",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/cVrnIc6IdRfUxVTMY1xxGh3kEPsAVZvDidmRaCYeIqA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Smoke"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "184": {
        "name": "Bloke #184",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/57O3WgWiIHOMO2bSf7xrAuoZE4EmQRxmTc_5wTta2ss",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Shades"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "185": {
        "name": "Bloke #185",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/gATmmVK0juqxE4yLirniFJJUdWbLOiO3o1iottkHV7U",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "186": {
        "name": "Bloke #186",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/EwxReERHrVyspzq46P-pDyzeIAYhjVpxTY3U-Z814Ek",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "187": {
        "name": "Bloke #187",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/rJllcHsa_ep2zFjyQDE9EPcjQl8t6V5Ml4El_YXcoAQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "188": {
        "name": "Bloke #188",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/tw03dIe8m-atkdk-x7sRxXmukMUdQi7-PGItvUbMC_4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "189": {
        "name": "Bloke #189",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/CcpVgMC1hDl0DCXsQet_cS5bd_DLWyWRUgxHMyCoIQA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "190": {
        "name": "Bloke #190",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/MLoln1z20OYGgOIT5tCQd3QIg0XzEAiVe9w1FAoF2so",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Red Teardrop"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "191": {
        "name": "Bloke #191",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/u9KAKvu3jm9i5jwCtGGKRw99cE0vjGtrv6VBef171YQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank Tie Zombie"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "192": {
        "name": "Bloke #192",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/XkJxlcSOe98Ib1tdxGkBJrDZfV5Sr-vCNIj83_9OaDY",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "193": {
        "name": "Bloke #193",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/3zzfPNDEdbRCubEAVuLZerP-cz3BJHczyE8ks_YDPPE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Smoke"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "194": {
        "name": "Bloke #194",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/dPZV3MoGJGSTiyJhSij0NKBZLbBuJHihhSISAsoeoFU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank White"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "195": {
        "name": "Bloke #195",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/IJXuyn7OsHjWRNfkXSAltkkpJXBKNh10SfloIwUJ3Ek",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Shades"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "196": {
        "name": "Bloke #196",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/0cKlBXWdw40J19c0z5HEZgJvpX5oL3_K8umEhwul29A",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "197": {
        "name": "Bloke #197",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/sAMXkoPuUgDw4eGu3PNn-v9_UXjjrchh8UHyEnJoPg4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "198": {
        "name": "Bloke #198",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/U-czxmOQDLf6uOvgPtvRXHgSc4w9v4hgNY0o6e-Gy1Y",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "199": {
        "name": "Bloke #199",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/36NRsDfKt_vMHhPqgBIblS8np-L14qfiyQW5qVH9qpY",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "200": {
        "name": "Bloke #200",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/1FXhl_3XXP0bzgUdeaWgyuqhoxIU-c7WT-C_7fYRDC0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Silver"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "201": {
        "name": "Bloke #201",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/KqQ1ViPfddj-1Rxmx5ZG1w_SQ0UJjF5DniOZRVJ6C7E",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Black"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "202": {
        "name": "Bloke #202",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/rAxuTvXFYkc7wjAHDfKNqoKx74xUI55ub-ELm9EFjbU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "203": {
        "name": "Bloke #203",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/omPEcQD0u_L7pQMTglYxtHW5k84jKjuF4iUhKohK5k0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "204": {
        "name": "Bloke #204",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/fb8cmXk-lSLsvtuoFtulgP2rh0AsPXxIfUORXMnJXwA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Black"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "205": {
        "name": "Bloke #205",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/-9afEikyqDO8PjiZGmIgOdRfw4YuGfi6sITFc5M_Y7w",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Red"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "206": {
        "name": "Bloke #206",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/9z_QIeu8s_afvjf02rSJ61MqEPUr1NA2p90UUi-cbeo",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "207": {
        "name": "Bloke #207",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/fQfMzYlr4tUammyD2d80aHWaYUWg_FwvoNKblA9QAP8",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Red Teardrop"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "208": {
        "name": "Bloke #208",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/pSHh26yHDfgiaYEyCL7hgaKmxqn2IdkL5KpPwKZM0Q8",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "209": {
        "name": "Bloke #209",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/7HARMKPVP2Ev4kBuo6e73UCt7MQlvvSqV1dgn-eIdEE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "210": {
        "name": "Bloke #210",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/3PQ8aGfeRHT0OCOtZWrl67IySOZP3V_qRP3rDVghNas",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "211": {
        "name": "Bloke #211",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/2OxRqQrvegVr7FeaGJDGHXnKDz8ytgpvcwOBnrM0rc8",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "212": {
        "name": "Bloke #212",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/1EQSjFTCgKCr-S4HK2nyDrko_UmW8bCvUawfS5C-ID0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "213": {
        "name": "Bloke #213",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/yjcUdNVnfaLHuS0XF2m89NBJv-H3UNmbC881mHwT75I",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Orange"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank Tie Zombie"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "214": {
        "name": "Bloke #214",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/OpT0V8g4pVgdRq4mdcmwP4hd-X6rViHcscYYgiwf6Ig",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Pink"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "215": {
        "name": "Bloke #215",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Hd_sV_qqM_tV9RSqQxmKXkA2v7eFb-lf-k1oYhow0z8",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "216": {
        "name": "Bloke #216",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/RzCqZ3a6lomsFHCockuhJ1UTLE5S-GV_w5S7X5lqV_U",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "217": {
        "name": "Bloke #217",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Dni7ZjvZV6_vht87UPjxX1lRVaTFVeE3z-gT1rNzOfg",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Pink"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "218": {
        "name": "Bloke #218",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/UNNbUxgLtSKh5cw3VmGbcmaBF3yedliKkeRLyrBEx3s",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "219": {
        "name": "Bloke #219",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/uQuzGfEudD4sqesDPUjmdQoWQn3QYuKg_HH7SeZnFHI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Pink"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "220": {
        "name": "Bloke #220",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/gXyx9rNxreCKCb9ovM1jISzaqlbKIMC1u_sX9qzLhTE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "221": {
        "name": "Bloke #221",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/B9H2pbaMuvhmEUfa96xRGLwz3zFef3x8Q8elHkytj_w",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "222": {
        "name": "Bloke #222",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/pw6LZxud5xsgfPSfGB0bF95kX-WNWr-UjoTxYssTsls",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Orange"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank White"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "223": {
        "name": "Bloke #223",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/aBfCAgvTo9EkkwqPSYTreyNQky4hOpXcdEmtZOvKkSo",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Purple"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "224": {
        "name": "Bloke #224",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/OcvxzNweg5kBR_Rrhdd9GT5E8tEcnPkW8OLSgNjW_0w",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "225": {
        "name": "Bloke #225",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/2txWb67Dpl_46ggKNOP2HOMxONUJFbr4rHiHVDgCIHY",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "226": {
        "name": "Bloke #226",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/mE4BrvEw9-HuR_CVLs9RKRsT4WJLrNPwxsse7Cuosr0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "227": {
        "name": "Bloke #227",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/WyFyDjZ9fEmVLl1VvQEymoLCuMYyxKeUeoFMf-w_mU4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "228": {
        "name": "Bloke #228",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/47REB06Wi6OX155QkJQoVadQ_AkZXE5pEC7j-7U9crM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "229": {
        "name": "Bloke #229",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/YJ3IvwrEaRpwsUSpe6PKRJaFFc2lJCGNvuHiw_3GUd4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "230": {
        "name": "Bloke #230",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/vIAxeDdsRKYF5XlBuFmvvuge3NUq8fGXAnwURt0lZZE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "231": {
        "name": "Bloke #231",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/E7pMxJGYvpfeR4Zw1_JGkyFXw7S3TmzeN0CZHAew_rE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "232": {
        "name": "Bloke #232",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/9buxxJiyLWBlMoZjGlGl0qDikjehJRiWESBio39ffXs",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "233": {
        "name": "Bloke #233",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/yS74Spni7RhLrOvte7-ItVIj0sVpPOTRcQLu-FiFygo",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank Tie Zombie"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Shades Laser"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "234": {
        "name": "Bloke #234",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/GC-WMgP8KKcbVGtZe3YUDYJNenmKO9_Cp-uyl-nMbtk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Silver"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Purple"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "235": {
        "name": "Bloke #235",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/v4IJZpyIJ3saqk1YMsYloHwU0ZSOj_CHd8CqompH5-Q",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "236": {
        "name": "Bloke #236",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/_bQW8dVJsk3qi9oVjw0x6bD4WZ7hTIcao5H1hx2r48A",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "237": {
        "name": "Bloke #237",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/wOgBXYQBhqcmO4wH88Fz4Fw9X2fK5G64bnM-Zd5tKfE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "238": {
        "name": "Bloke #238",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/17wiiKzPB3-JVMn2XRsnb6g0dlSQTz3Yl4usxQOu-tQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Pink"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Smoke"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "239": {
        "name": "Bloke #239",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/S22rjpiW7g1rPc4ArnSyGVjQvLtvQgg0AQJbwkznlwk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank Tie Dye"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Purple"
            },
            {
                "trait_type": "Face",
                "value": "Smoke"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "240": {
        "name": "Bloke #240",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/JnNBUDMtZ0u4RkSLDmoJhiY7GUXQ7LIPsHJvqArO4dE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "241": {
        "name": "Bloke #241",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/T8oXSSf3AAEIsuwuhmOFdXYJdzKzlusNlvcGwKHatug",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "242": {
        "name": "Bloke #242",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/18XaJ91nzFJhCGd4qsWGmhJq411F45EKAdU0_Le1qYY",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "243": {
        "name": "Bloke #243",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/JX_DTgAnSQ63hpOkylAxkWsGVAqE8CbOMBlyE7UoFTI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "244": {
        "name": "Bloke #244",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/3ErYfX6o56uMUiVn_jtd2HJPFtee-5DRGFBeNCrUlGg",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "245": {
        "name": "Bloke #245",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/6sHnYNcKermb_KfmPlyHEO4pPcJVcPNPhjeXlIzSclU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "246": {
        "name": "Bloke #246",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/as8SkrQIaEpqh29UcH_yHfkVehIWXjskBO3lOB0sizI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Silver"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "247": {
        "name": "Bloke #247",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/qBsnYGv9awecbIS8UOrCGejwj7_QQ1xsT7_x_HtCQhc",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "248": {
        "name": "Bloke #248",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/TZAy8IubafcEtiK_dbMrWtKgAO2APMhyH7ZRO5PlIMk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "249": {
        "name": "Bloke #249",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/HIDForjQhVkkA-tjEgXfmpxFAhq6taFl4_TMa50QBYw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Orange"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "250": {
        "name": "Bloke #250",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/sN5tZcgEgShE3vUyPjjSXQRRYfD1rkWwESqCmoRqZ6E",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "251": {
        "name": "Bloke #251",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/rQPc0tPD-4lS-ewuPmfkME3CfPI6_kzFzJSV1LnK8N0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Multi"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "252": {
        "name": "Bloke #252",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/mwyIcSsXvrEJkHbFaf3eybL7UFr13YD6hrfWuDHmNeI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "253": {
        "name": "Bloke #253",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/zxJ11ejuexbYmZq9X7NhW8eS_mF-nx7CoS7sH2pZrpc",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "254": {
        "name": "Bloke #254",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/jhW0rCdvK_wyR_gIt7FkMoqUbPqIFvZmLLGIlOtrxUw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "255": {
        "name": "Bloke #255",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/dQYBqDctu4hhvbPF6bochuqZ5c7VSgtvVZs4UXYSB2k",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "256": {
        "name": "Bloke #256",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Bo325X4rCfoQOhdqzvoX85uwqdmbwlW4WAzrZ2bb9XE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "257": {
        "name": "Bloke #257",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/ms--cfkNM-rRhMqbsvlTzvCwPVQVvcev52Vgs5YyivA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Red"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank Tie Zombie"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "258": {
        "name": "Bloke #258",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/wowFTT7Qybpa_w2T_ViPOBZ9VfbO4QIZ0EWvMnyT0Ko",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "259": {
        "name": "Bloke #259",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/wx-1aLzgPyB7hnikFcE6Emhjy-v34-2wH3no-GBCVcA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "260": {
        "name": "Bloke #260",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/iaR_2qLu6tTnEWnYsNxnlw-u0sCYuVpVnAzZeAGuAxs",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "261": {
        "name": "Bloke #261",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/au9aptxUY0nHwWMVrybSdEd2jQ0J8cppIK40e5CoNW8",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "262": {
        "name": "Bloke #262",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Uj5LFy0hu1V1iTwSlfJmHNlM2dUJ9PGvq6CdUQ641Gk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Purple"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "263": {
        "name": "Bloke #263",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/k-CFKym555IuwaIrV8B1Qi5JqkRjqK5RkkeKrql7yQY",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "264": {
        "name": "Bloke #264",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/TXlfNtzxvpE_guki0qoEyqXD1dhUQFrCynbe3J1qEuo",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Pink"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "265": {
        "name": "Bloke #265",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/fRlx00nXx66rI1rNxDCXIAibCYSW4_3xgcoqlNajUBU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "266": {
        "name": "Bloke #266",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/FIBs_L1BDCPBkvKv_okNjsjzqfgYT8W1Qr3qo5qXCYI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Pink"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "267": {
        "name": "Bloke #267",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/HJE5a-Hqkx4nBN8FMAHxJ3u1zG7FyeOmuV2RCw_bcaU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "268": {
        "name": "Bloke #268",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/4bEZA2k8HOT3EbksOvx-ACR2Eizl7zDVs1e3qwHNfoM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "269": {
        "name": "Bloke #269",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/diCIkR4lFeopBCcamC9Cy98NgUoVnTwmoVWBIVoEn4w",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "270": {
        "name": "Bloke #270",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/T3zSrkY1ilUskQ9gIPdpZFLv5TEsAboFiFzcZlv_zc4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "271": {
        "name": "Bloke #271",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/LmnAzn1OXAAwzd9xtxL6plGSYpRCADpPUVrcVcmGQUk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "272": {
        "name": "Bloke #272",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Y5nzC-Bm7r-0Z_htd8pbtXOKHjxtLZOaTp_uWT4-Pb8",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank White"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Purple"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "273": {
        "name": "Bloke #273",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/nU6GZ0vKnn8u0NUKb6Fxkd_uNt-mj7o1s6wdsDvuGQA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "274": {
        "name": "Bloke #274",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/aL_YLPQ4IcixMtTTNwkEs1beea8rWuuQ9f0ihg7lM-0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Orange"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "275": {
        "name": "Bloke #275",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/cI2xviDQQy4dQ97XRYp6MXBCiZgFTDhct5mFI6LfrUo",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank Tie Dye"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "276": {
        "name": "Bloke #276",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/xWeASd76yG35rLpxrbsLAgAqR7-MAIgBsY6JJknDJJA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "277": {
        "name": "Bloke #277",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/io6nkpA2hED_pVvQb5UOc-HVRxISkLQ7Em1dfGSZYHc",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "278": {
        "name": "Bloke #278",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/vKVZQThwZLEGG96szrR6Gz_l57OWX2o7UwNJqDEbAHw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank Tie Zombie"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Smoke"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "279": {
        "name": "Bloke #279",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/s0NeYHffpkEJfDo5-9sMP7onj7k7dLYUxKzxL71Lx8Q",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "280": {
        "name": "Bloke #280",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/LOl95-g8cH4-ziYihOLPe2WjcAt5T8AqJfz5hffElb4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "281": {
        "name": "Bloke #281",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/djkrUxiFfvUOX9Et03HracShRTJFkVXbRVrcWKxoF3c",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "282": {
        "name": "Bloke #282",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/YSvGF32nAIlKD7RdrwjvXQjQHIUM8e5AjqmsIY4-58U",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "283": {
        "name": "Bloke #283",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/HXzX6f1Sg-QJeSDfm6tlI4SueGbyeUSTwWuwkKu4OHs",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Shades Laser"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "284": {
        "name": "Bloke #284",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/6GQmvbl-nBYigeHzdqg7PpcHVdLHa8Kut9nSgPhLsC8",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "285": {
        "name": "Bloke #285",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/YHPyxiOOrvWDh1XiE4NVaHh-Bc10DssW6n0LiTqkD3M",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "286": {
        "name": "Bloke #286",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/c2Sbn9cmeUQwPUC9XuEd5ztX-26fmRVV2smc4BLh9sc",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "287": {
        "name": "Bloke #287",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/-mAKjQ3lfstk4qWpv1BM2Id2RNM3Dt25XN_vwFh_OJ8",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank Tie Dye"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "288": {
        "name": "Bloke #288",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Oo907D5WrovGVtsV4nIxKNJWfPNVSbG89ekz-IzgAFg",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Purple"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "289": {
        "name": "Bloke #289",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/u8iMK27gW64uHsERr_WCsxO_PIGcI6P3gauGpF5rWcc",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "290": {
        "name": "Bloke #290",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/i_BvCs9VnztvbGWq3m2DqCOYrdMkDPUmdAwgXyrtdqU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Red"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "291": {
        "name": "Bloke #291",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/gr3ZkJTQRXAj5Z6c6M7pErAVajK-3c1V4A7n-GN6PdE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "292": {
        "name": "Bloke #292",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/VgakEb3eH8VpMVFnA7lt_anJq76KyER0jAVc_PzlKXY",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "293": {
        "name": "Bloke #293",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/RclI_BzGA18SkyB3-l9CGM3TjhtD4qfHIphACWmnnC0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "294": {
        "name": "Bloke #294",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/IdIsVzAVaNf3C9imqRy33ijsx7scsiMOLsl5Ed29-44",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "295": {
        "name": "Bloke #295",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/WdlZJjP3yqtdZjTG43fgOovZwrwi4OVR53h1wK6-y8s",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank White"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "296": {
        "name": "Bloke #296",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/sv7AqEnisFYSv47v1DPOQ-5Glxo2B_3p64w7LHHgDnU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "297": {
        "name": "Bloke #297",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/L3Ea4Cv5xHf86c_ndaWFxyf23noUfXoGhBJRiZq6V-E",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "298": {
        "name": "Bloke #298",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/KZ-ama65QALBp8IB2B668SGZcSGEBmXgoKXA2ykVbF0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Purple"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "299": {
        "name": "Bloke #299",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/d8Pn-SuJ4U2KkQO3UE8INbiZUX7VJ_V6wLZkbk26V5U",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "300": {
        "name": "Bloke #300",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/4BU19-JxV1Zg4KhJmUirnsYH53gAOLskq_TxnyyKuaA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Shades"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "301": {
        "name": "Bloke #301",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/_8hEEoXl_LrpxBEqrHt0W9HeT_oHIwa9t8tVX9ELOvo",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "302": {
        "name": "Bloke #302",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/VLl1tgYDXMk3d9nbNWmrerwUbHNiA6_Fz-BDYRTmqL0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Silver"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "303": {
        "name": "Bloke #303",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/DmwCrtLEHpsU5ave_N3ihrn5QZR73NQLGzJt8ey3UE0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "304": {
        "name": "Bloke #304",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/zUrCg8PfKRa0qN1wyJLUn0vYJLCKlWedRgOe9uYc8_k",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "305": {
        "name": "Bloke #305",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/FKgowO9EDRgfiPGwlSupBYV21YeiHjT4GcUe_vfA8OA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "306": {
        "name": "Bloke #306",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/daldopevFNaeTkRYkEmBT_8eRpIfpFphX6y1MF9CxjI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Orange"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "307": {
        "name": "Bloke #307",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/f_Rqt3tEXGDi50nbF2kZZFmWH35nCdhuYhr6PE2AQwc",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Black"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "308": {
        "name": "Bloke #308",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/tLEdpxkw-MhojGAniXj47odHGgL5NRbbJBBrmp-3DlM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Red"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "309": {
        "name": "Bloke #309",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/ExRVocewEZL_TNmGi82io3nEY0QCgqQiDkkyEmEeqq8",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Black"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "310": {
        "name": "Bloke #310",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/fatXfkE7ty5Q7VmF-ptLZVE4ap_1TyYA9717WCKWnyk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "311": {
        "name": "Bloke #311",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/aGdD1M0nWN-Ux-8P4mIbsYNFd6kY5FO1mO1Td80CXlk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "312": {
        "name": "Bloke #312",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/HhkL-16i1K-EP5rAUnNHgeRzmc7xBNSDveuDL11vXOw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Smoke"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "313": {
        "name": "Bloke #313",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/w5MZ3L5w4MgkINBaeFt8TA_m-mho4Tobj7Uj2Km2s5g",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "314": {
        "name": "Bloke #314",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/E3Rj6XQ7aSD5C98HPDtXn7vTTQEbZWgI_YD-NA2nMDs",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "315": {
        "name": "Bloke #315",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/TcBi695Au25MeYZejeKuryGhFOiyA6HWqx6oUbOU3M0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Red"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "316": {
        "name": "Bloke #316",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/HT4LPzHaGisUf9UHj5bvU0G8ulY2I40OMe9yfk_kBmg",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "317": {
        "name": "Bloke #317",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/UoxZmMJ2xTeJDLlIj9i5Z6frH4hGNO9kbwFjAoN5gVA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Silver"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "318": {
        "name": "Bloke #318",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/t1wrwxKnx3VK588d7JSpCbBzOjum6KM2lu2im1SeLTk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "319": {
        "name": "Bloke #319",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Y4YHiFYcB1KHWtZv7Bmc7lHd3hXXTJZ-tR1VHbhCgCI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Shades"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "320": {
        "name": "Bloke #320",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Ef_AizCz_IjJHuMwz411RYGocneI9nQD1BLuDW-M-98",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "321": {
        "name": "Bloke #321",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/jLBgU1UPk6MV0FKsqf1Tncb-fjtu9b0-39DbanX79sk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "322": {
        "name": "Bloke #322",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/bmWR1eI-uOLW4xL3AHJpLWV35XMT74FdimvcX-ulP00",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "323": {
        "name": "Bloke #323",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/zrlDMO5ZxcPKTpnKzpLu3xU3P1shITYU03ygIhiY5hY",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "324": {
        "name": "Bloke #324",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Bx3Yuu8Ox7yFSqntheMiZfh9Daubt9wdWlTb7T-bvHM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "325": {
        "name": "Bloke #325",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/hLAk0vHYqL2EqZhRgUHHMmFXfkMm-1fX9VLALFgaqWE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "326": {
        "name": "Bloke #326",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/gYa8V5J4w0vcMQxRgE7BYMQ2bHNGAhd30uqrs5R690M",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "327": {
        "name": "Bloke #327",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/b1MIBioyMwoMAxGIpyPpN8kPkxpLQKyoe8vvNlRKUFw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Silver"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "328": {
        "name": "Bloke #328",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/3OA6EqRIZz-fU0IvG9gs0ooSKhCRVBJRaqmmssDYerY",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "329": {
        "name": "Bloke #329",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/ur-yL2pCMd9PoQbqg8KWso8IG6v3T089OR7JGlKaPSM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "330": {
        "name": "Bloke #330",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/eOCcnNB3atrGTTUs8pMBS8Ihrypmcy6y4Bp8LkYzYOc",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "331": {
        "name": "Bloke #331",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/XXrntfH5s9tWItjOIv46391Js34ehXF_RVZsYq2Km5A",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "332": {
        "name": "Bloke #332",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Xg_7JHlrLxgue_4dUeMK1_xP8DflpCmdEzx9jVmFFBQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Red"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "333": {
        "name": "Bloke #333",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Jqisj4V6awd_36h7taAox_Rs6rcl5Mnbytrq3Z9xdQA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "334": {
        "name": "Bloke #334",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/rY3DBrYj93TpsCKSsbVga1aekNBI39FYxEorXZRSDtA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "335": {
        "name": "Bloke #335",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/RnHOghO6ximEF-MRlCqwjTszKCzHqqsi13trJhnVL7k",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "336": {
        "name": "Bloke #336",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/dnxghbjHUOfRGxWF7ItH5UoPJ2WxwAzX_wXME6-E_I8",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "337": {
        "name": "Bloke #337",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/NQ3VHxm67mxDa6QvSVYje4hQVy72XjfLBJpfU2hbj1Y",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "338": {
        "name": "Bloke #338",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/CTPa8yeqemca-dvO-P4EseRgwDLdPzJkAiYgGHfsLqA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Silver"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "339": {
        "name": "Bloke #339",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/RfZJmqRiMywWizsbvBr7FpLqILfbLG1oNml6TEvsMtA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "340": {
        "name": "Bloke #340",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/hwxuvcYLsDWICZXXjYoQMBYWemc-A2dvw_tOBtGQK4Y",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "341": {
        "name": "Bloke #341",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/bCcSSKsLtvBKsPgCwEPsSy74vuFPsXUqyqu2rjV59Tk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "342": {
        "name": "Bloke #342",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/_En5nFb76YdKKjUlIYInaEzJrUAVTVNmIBae2W6S6rs",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "343": {
        "name": "Bloke #343",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/qBABh36Ag0FEZeQkGN4AZK7261owwxI-atRhZkdkBhQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "344": {
        "name": "Bloke #344",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/wgKTVuXj6kjvjPLOGRW6qevC7DFW_8gP1lw6IrnMiPI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "345": {
        "name": "Bloke #345",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/ANrgVTdpOHHZ3nQxNTehkvlzaE7ptwSig0FGaf01iwg",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Shades"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "346": {
        "name": "Bloke #346",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/1yGzn5xybMSt_AF-zPKz-td0DKhOFFUw9o9ddt4Unek",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "347": {
        "name": "Bloke #347",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/zY9UuEi4WbkwTmFDTG-zLt4gqsTpUZjy-M5_WtpTYf0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "348": {
        "name": "Bloke #348",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/fLWsfts9a1vMdpwc7jqLRrucWJ__MxqYcAabSCRDC3k",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Multi"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "349": {
        "name": "Bloke #349",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/GhdNV1iTcqXeFU_viaqy-IlwYXEyzNmgPg4HorO0c6Y",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "350": {
        "name": "Bloke #350",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/NJ9LuLeQ8Lpvg33zZp_tW1SzwHNlj-4faHYt9cDKPJs",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "351": {
        "name": "Bloke #351",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/yGLuZxeQoYMgrLequ9YIa8VQuQx7ZIJqfuUvLrqodAg",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "352": {
        "name": "Bloke #352",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/FQWRT6BFibZvlWfjaTp6b_BMpUoB7zMZj2wxJoEnSrE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "353": {
        "name": "Bloke #353",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/sqKkdfVHxITRZcSik7pGyzws2OFo_ZNh8WWZkyhyNt0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "354": {
        "name": "Bloke #354",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/-cdI_YLo6Wx6_eVkC6mnu7T4KOJ9gp1D15HDGVQ6Y_U",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "355": {
        "name": "Bloke #355",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/1htX-cDygl1Y3aAkQmZD1VTUVigAbXkxLQis9LHldzM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "356": {
        "name": "Bloke #356",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/yur7K2X5PQczToNBIWNA7ZYrUzkxn6t906Vf-I-JsOQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Smoke"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "357": {
        "name": "Bloke #357",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/XeWeOFo_zTmy7ryvom8Sf76GgpzIUKiTfRVXASgZ7gw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "358": {
        "name": "Bloke #358",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/EbNRL121__QcA9fvVZM887prBGB76BP8JgbSvJTc87I",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank Tie Dye"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Pink"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "359": {
        "name": "Bloke #359",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/wWdWbhUIkiSXryoRDKkg8l0YXGpmb3BkQlE_fGrNZFY",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "360": {
        "name": "Bloke #360",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/zOqIOdL6AQ52Hc2aFkU9P6LWR31NGk6PGn58agrj9bg",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Red"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "361": {
        "name": "Bloke #361",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/7L9Y0R8EybNI-UrFbMQIyaHOpzVp4oiqGZqIIWWicvM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "362": {
        "name": "Bloke #362",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/yRMj1W1gCtLi34HiGHhbMrGCIpUgzha-YzOjeSA6cyo",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "363": {
        "name": "Bloke #363",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/1v_FIhExApckmowIvdLkuvacCqjadzakZSvtu5v3En4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "364": {
        "name": "Bloke #364",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/dElAYRx38QTxDd1yvShw_LbCWhkrkrd4spgLRAHg_LY",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Silver"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank Tie Dye"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "365": {
        "name": "Bloke #365",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/98CYuSD6f7aJCpUP8q5b23IcjYv9UCd1ZWD_B7qnVjI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "366": {
        "name": "Bloke #366",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/hbzmdWrwOBAvcodZJM1zfWCjkB4_X9eAQ22zn50B3sc",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Shades Laser"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "367": {
        "name": "Bloke #367",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/yLUSwwjaMaM9mN_PWx6szwwnnVZDQuAM_J-LyLKFtKo",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "368": {
        "name": "Bloke #368",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/TTwD9SXY-Q-rEgA705s9uWu6LOMrGDxXZqDxTPGqoX8",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "369": {
        "name": "Bloke #369",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/HxRmiKY1PrQBxRU0a4fRxBCyZf0BqPvSqp9K5shkBL4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Orange"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "370": {
        "name": "Bloke #370",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/ZypMDD_1jZtlie78Kboe2Y6ews6J-TFnIyxiNlopXh4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "371": {
        "name": "Bloke #371",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/2BDuUz1NioizKz0uV5rKz2P8dGI8oPp5Y4TwGoW6AmM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank White"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "372": {
        "name": "Bloke #372",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/zEngQfSOcRnSXwI8XxLCmpsyOxPIOYHxtocgPcIQ_Ww",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "373": {
        "name": "Bloke #373",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/CixOzaAMwvoNL-so-7vtRaPGIp9UHspLzEVf0MxKphw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Red Teardrop"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "374": {
        "name": "Bloke #374",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/wiVb7JRkWWqBHiYBQO08BvPUjROA6w7UkxxuuYi1_lU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Red"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "375": {
        "name": "Bloke #375",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/SCDoj3wq9obL0JCgtvaTYKrWHdJsyk-4bbibQKHLKmk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Black"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "376": {
        "name": "Bloke #376",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/v4EoR08VLYO8Qt4JDorklR_x5D6rCLMrAfXhVDSVUAA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "377": {
        "name": "Bloke #377",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/mMCzr_qHTSLgDrnQDZIZ3rP9zEIpLdFzSXfEnCXNsnI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank White"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "378": {
        "name": "Bloke #378",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/mtnk2GzTJz8E6n7v9lpUzv4hIV80ye8GxLMEMzCJiAM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "379": {
        "name": "Bloke #379",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Dt80YJv-vbeVt_wbYCRnfx4p-SQxtk0VT0sB8bUx6aw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Silver"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "380": {
        "name": "Bloke #380",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/pqnagAoUg-oizlif0j16Ay_FG6klH2Y7x9eubDk9GFE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "381": {
        "name": "Bloke #381",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/VDUmwlHA93Y2nriaf3tpt2qG5M6c4L5PbRtWDPMpPuA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "382": {
        "name": "Bloke #382",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/EVVB1KuubSzp7-KwNNBEiXrKqLIBBDV8s4lhnQ90VWo",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "383": {
        "name": "Bloke #383",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/mrQyB6d5vOI9kuH4J1_DCVfqGsvwncOZzUjjGmnTOgw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "384": {
        "name": "Bloke #384",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/nN7WTQmAd8Cexoi4bhEM4LZxr2mn6qh0uHOOOkgcPsc",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "385": {
        "name": "Bloke #385",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/3die0CVE9rpoL1wn4gvpYghm8jGmRCzyyU7lat8y0YE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Multi"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "386": {
        "name": "Bloke #386",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/OZL0nJmfrmzEY45dmO-ZMEt_E2bDZaY73XMWuXuB81o",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "387": {
        "name": "Bloke #387",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/56d5G6ouU-6xPAioFT5CAJOgElmNDrNk3pZABE88aYc",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "388": {
        "name": "Bloke #388",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/WA7ZagvKwKX4_ebaORKZigpGml0jhmtmgPvk2s2V9b0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "389": {
        "name": "Bloke #389",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/EtkFov7OU8183hVAWNgxJkW_LZHxYRq9TSu2oP6aG84",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Shades Laser"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "390": {
        "name": "Bloke #390",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/ttG-VHfVX3kyfQgRu-o-CggEvPfRq6XNsDvyQuSYbrk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Orange"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "391": {
        "name": "Bloke #391",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/XeKVXP9Qo8zOZC-UGKiwnE92X-8ta6XRN2mXFkeQDeU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "392": {
        "name": "Bloke #392",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/52Pm6yVNwfGaI1Ny-Bux5c2jDHWOeOT2GkE_n2zHBG8",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "393": {
        "name": "Bloke #393",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/KcYKJogpDcEis78jObqBIY-dMw1E-61N_7hnzr1r6M8",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank Tie Zombie"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "394": {
        "name": "Bloke #394",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/jGCLCvJG86CLblm8m5xh2O86U5Syj8VpV0Nd3-T8HqM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Multi"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "395": {
        "name": "Bloke #395",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/og93Y5pjndkRHgvMlZwAIHE9fhYz0NZGJiej85kQMVc",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Shades"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "396": {
        "name": "Bloke #396",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/NMGIbZvnT9WIIC7mSjCzMQ-dO3fMCltaVJak-EPaiBE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "Smoke"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "397": {
        "name": "Bloke #397",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Hn68T9o1uYAO36H2kgRYuveA4lTyfJ1yUKlUR8UIlRM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "398": {
        "name": "Bloke #398",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/gkLRj1XGRA8bCEoI3ZOhkskALwWuoMPBtdw7tYUme1k",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "399": {
        "name": "Bloke #399",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/15W7WFDbNZpD3G0CYjMuDgi0hKiIQGgdF4Mkvx9ou00",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "400": {
        "name": "Bloke #400",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/0JDWP13gvLOGc0X5GPP0K7jRn6eJ0ClEMwg_6uyDRKI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "401": {
        "name": "Bloke #401",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/0EeAgWkCw35E7O7jIdHgl9VRBmGL-Oc-mFryFAE4hDg",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "402": {
        "name": "Bloke #402",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/MgNwenqllUCKKKl_MB5QAhlwggN62TciyUFmfb8ZSSM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "403": {
        "name": "Bloke #403",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/HLdxH0QbUK827Zt38JrznNYwBayoSfZ0xcL1coTj_RQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "404": {
        "name": "Bloke #404",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/5GmqS62hv5VSRD6Wiva4rMsEt_FeqOryxB46RpzSzCw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "405": {
        "name": "Bloke #405",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/gMPVI3gveTpgOS20SvjDgIobTy7M1dXLIQKuI74yEbE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Shades"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "406": {
        "name": "Bloke #406",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/UoBDs88Kxq0PpIoiPYkqmlRb5gBgel7HvpM15V8TdNc",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "407": {
        "name": "Bloke #407",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/LT9NtcMmeDsx6pb-eaCo95mpepCD9U9xcG3ag2EbDMM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "408": {
        "name": "Bloke #408",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/4uHSp9LQLcUENxVQw0kKmnyvr0D0PrCaX5QKXAsocPU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "409": {
        "name": "Bloke #409",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/zcULw6VvVHgfvbK3PVeN0zyWynDSwhn_2BEe_YzB8j0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Orange"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "410": {
        "name": "Bloke #410",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/qRCDL-QFe7l8AUCRYpzhO4_hAtNhRFd0S9m3rgEosAM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Purple"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "411": {
        "name": "Bloke #411",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/U8x5sLnTe9490P5x6dbgqk_MWJhWOzsdcYrMQzg6Rxo",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "412": {
        "name": "Bloke #412",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/TjUpvHD8utFqbFnr3CJUKNF5AgiQHNRqaB0fadrL0rI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Orange"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "413": {
        "name": "Bloke #413",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/4Bhmcssv8MSWbiWy06wHgM2tl57iJbS7VnGHDsQoik4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "414": {
        "name": "Bloke #414",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/NB5bweA_GlyljycLjYXaw_dB9w7fhzEYY_o1ngw5oxY",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Red Teardrop"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "415": {
        "name": "Bloke #415",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/wi94nrdTlB0AYlT230uInGwJzfdRo1eSZPlW6CMmQvU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Purple"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "416": {
        "name": "Bloke #416",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/fvLPaaS4mFS7Lt7h5ONbYcJctQ1qX2oUkir-bP9-uF4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "417": {
        "name": "Bloke #417",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/wm7AqYqz7SeUnMtzhEaRg8Hol1TR-V4dpDupJx0QHLg",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "418": {
        "name": "Bloke #418",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/KknccxzEbQiJAFy_jZC2fFQe2Lb9sVv1sngv6nphq6U",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "419": {
        "name": "Bloke #419",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/PI66tvDyHat3A80p2QB-a8LC1ZBXimH4ldDK54BG7Mo",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "420": {
        "name": "Bloke #420",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/EAbqANjpb1gux_t_VNbjhy2GwDmEeAT2vcCpOIY7OKs",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Silver"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "421": {
        "name": "Bloke #421",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/BPFSV09OlSGpYxf5AkMf_St-tGa3jNB6h2iDS7LaTYA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "422": {
        "name": "Bloke #422",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/BbJPZI5h6SqPY7pIkqSMfjCzEC03zewPIoAynSxQsyc",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank Tie Zombie"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Black"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Smoke"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "423": {
        "name": "Bloke #423",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/70GiuxMZzNpeRD8WYGPB_ZdWxKBFT5lVlH0D0x_sqmM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Orange"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "424": {
        "name": "Bloke #424",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Xt3q2IyHftBPirLWQo8sl53jEwX2tWdIsSo2ubalOIk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "425": {
        "name": "Bloke #425",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/hibGw-gyX9vlBQEXZXdC5p0qNLXv1RahXoH-K3SJ_g0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Orange"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "426": {
        "name": "Bloke #426",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/izQ7LZQGcFyN4mcpcmsAuKFMQE8P8EXjipS-tIZuAv0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Red"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Multi"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "427": {
        "name": "Bloke #427",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/nEAWTyedrpjcGk8IX_S9vgUkRv5mOXbze96-g6SCbwk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "428": {
        "name": "Bloke #428",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/3CbhZYjtMRrPEmvUtli-IAtAuOSxZAMHnk7J4YOrRKQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "429": {
        "name": "Bloke #429",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/-NTUsYPzbIpQEZYaFwawFQ_k8gK79c3ZW1OuVlU4fvM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Shades"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "430": {
        "name": "Bloke #430",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/xXuGieGntB_io0X9c12r-ogztaf9b5c8RLqMrVPQHVk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "431": {
        "name": "Bloke #431",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/ybfIEk4XrNMXWP4Tux6ViB2EHyEoagazVWHucC0fqvc",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "432": {
        "name": "Bloke #432",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/kwv2yc-qXdPDoVVut9JTFNs_3ve8kgbBc690zWisctA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "433": {
        "name": "Bloke #433",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/6aH5pxzJjA1BumXFFdTpOepshf4jvu7-YBqSrdc39cg",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Multi"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "434": {
        "name": "Bloke #434",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/UgN7kaFQjJYofzC2XLto0gg0iO0pHHEWWiXnE0Xa2eM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "435": {
        "name": "Bloke #435",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/G6WchILQJczG2JlvMZTGMXhIaM2wXpFLE43Ow9-_QYE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Silver"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Black"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "436": {
        "name": "Bloke #436",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/XV8Nadcaw4o8KDHtpw9F8br4JgBxzlX5E0h0JwHQNX4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "437": {
        "name": "Bloke #437",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/FUGWKtJFI37VUStGNSMcce9Aezcy7h7Vcnd-Se6_GRs",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "438": {
        "name": "Bloke #438",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/ThcgSvxGZBCMUt2WinKmbXYM3iz-wsQLwLTsXVITIik",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "439": {
        "name": "Bloke #439",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/qHZTy0VxBjdNWRc9CyDFvg0OUVikh7RglZ9c9JvNOAc",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "440": {
        "name": "Bloke #440",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/-zwVRhqFjK4oIAwgpF5E6JABSPxTAwGhB6CvpZdi-Xk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "441": {
        "name": "Bloke #441",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/tBtJSLjsaKcmO0CmKE4PIgq_3I0RDRoEP7JN6DAp5_s",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "442": {
        "name": "Bloke #442",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/8ZWvigGoZVhaka0-ahitczp-oOVzJyWlsnB-KP7ftSo",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "443": {
        "name": "Bloke #443",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/lOtiYMcViarMZ6liAUtqvwZ-DSgWJBLGG1gTF4xlNk0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "444": {
        "name": "Bloke #444",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/NRMllnt3jT1z67QkEsrZVREZwC2R38qN-1uRAM1TI9Q",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "445": {
        "name": "Bloke #445",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/WSCRBTL1ekVVBFBYkKRR0ShAB4dHVCs3wMXRXiDussY",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "446": {
        "name": "Bloke #446",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/LOMI9LiGljuqi4_cfPZ80xMjgZ6fvGtSvD0bcZeJpfo",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "447": {
        "name": "Bloke #447",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/akBELahLIfhSkrCGuXfnrGM5eE7kP1Hbi21D-eLQyCY",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Red"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "448": {
        "name": "Bloke #448",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Vy-x3mWKxvoB28eyDiWX4JECTcD1Rk03BDF6CJh4r1g",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "449": {
        "name": "Bloke #449",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/UEfbpQ0tna7O18pcPP8_BUS8wGjrZFWpxMCukTUU6_U",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "Race Black"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "450": {
        "name": "Bloke #450",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/mClCnLOYXLUpkFh71M7t-mQLKyHWNQGzKAaFrjE3zYU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "451": {
        "name": "Bloke #451",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/bC-7UBpUnSWkfXpM4oFag7E_4_9o42jMQjhkpaUxKB4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "452": {
        "name": "Bloke #452",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/9oodMCSRCKgkTRj3wx68m7JWTLTSiNpp74uYDmBU3JE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Silver"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "453": {
        "name": "Bloke #453",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Vp-YS9yQCRTruqAge8khUAGjb7sh39ZkxiwHBgBTKw0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "454": {
        "name": "Bloke #454",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/U-HDRnTsE8RN2BQ6KLiLmlBALMxxTzyjGYyLww1gRS4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "455": {
        "name": "Bloke #455",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/hRoF8Ry2_j_LAlCCJbxyvbEr8uZzTz46cpNsq0ZhwT0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "456": {
        "name": "Bloke #456",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Gl1a5YZMAVMIkTKxMkjugPY7sNIfgJrHO_ffsYxKigE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "457": {
        "name": "Bloke #457",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/raUGMrEIn2BAjiZzAc0WYLGnBeL1wcyW_Yh_Zt9IbwQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "458": {
        "name": "Bloke #458",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/WSdTRIAwtJLkRaOu5_KZVBhEpBCPr5I0vx6MRtqFNGY",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Silver"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "459": {
        "name": "Bloke #459",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/8gp4tBoJkfvUzS8kkRPKnJ9a3fAh3nHPtJKnUuwqx8I",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "460": {
        "name": "Bloke #460",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/MkLmNjIMAnR1IiH_WSnD1l6pEAwz_eO9wV1J7Y_rPRs",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "461": {
        "name": "Bloke #461",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/p1rTuuGLxSGkDK0fZb-7BDwJCxLVnnazu9OaYX55_dg",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Silver"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "462": {
        "name": "Bloke #462",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/jxfzz6eYgKTBBvkEP25z9PqXaLwgbonkl1ikuvSLxMM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "Sword Gold"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "463": {
        "name": "Bloke #463",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/ga4pwcCVaKLHrRYP_etXL2aFZjMrUohWuLCGLBzSv18",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "464": {
        "name": "Bloke #464",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/cOoO-lXZke6cEvgp2xlycSRHUb1Y4GhoRlJfpvpnKkM",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "465": {
        "name": "Bloke #465",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/aq4dBlM18_mluVyxIOTQBzUCq0ULn4COUn5fTzR47H0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "466": {
        "name": "Bloke #466",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/qI1K0a1QSb8jEUG1z_6qDOn_hqGR8i4tlVLDfRDRKq0",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "467": {
        "name": "Bloke #467",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Z9pXFO25GLrQ8hWTTUXUTgff2Y_TIcZeUtY18K_N5hc",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "468": {
        "name": "Bloke #468",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Q7lFjQ6YZHuUwpcnGC94cl3ow_eThant3QFrrWDBIZc",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Blue"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "469": {
        "name": "Bloke #469",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/-yZdbMRS9aAfCRVx5WZHNs-6CvmMA6ZzJOU5pSvW_hA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "470": {
        "name": "Bloke #470",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/SMRS0z8Uf4tFdqXeNS6Pt-H1njC-jFECkM27jHvwZDk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "471": {
        "name": "Bloke #471",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/8W0koeQI_QmuW1cRHp6XQ2UKpn4OwwcxIVp16H8VIek",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "472": {
        "name": "Bloke #472",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/kL2LJWEXtNKpvB0X4C6996mrrs47q4WGUXNLc9ImjXc",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "473": {
        "name": "Bloke #473",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/O00Ly-bMs5_WJntcpo21dSe7vVP8woGNZwo7UKlb6BU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "474": {
        "name": "Bloke #474",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/EGPipPg-eC5T4I8dWK2FTQN7729bQRUPbxDqfzrxm8I",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "475": {
        "name": "Bloke #475",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/JHJWoPl9aB5-yOR7lhbBswBBaIaalv1bo0U_TvAb7-Y",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "476": {
        "name": "Bloke #476",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/005fydzIco8hscTwafYqOZ8cDghCU3B9_gcylX8nYW4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "477": {
        "name": "Bloke #477",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/0_Or13lrpnNwTdyimH2XwwmhWqSX1DZXat2NyoU4iAI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Orange"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "478": {
        "name": "Bloke #478",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/u6QfohjH6QxgZzj6FJuTBfy6_Vap_84yCwToPq-0s7M",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Red"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "479": {
        "name": "Bloke #479",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/PIO-sR-iF746uanm0JFxJirrdYOjXUki1EskEAK0nWw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Blue"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "480": {
        "name": "Bloke #480",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/T9Mi-x6fJTC4PNHHXr1jqGZgkvIvGhPtcTqPEJ5YVUQ",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank White"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Red"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "481": {
        "name": "Bloke #481",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/LlUoL0ltQEQ1mnB_5PkOvdPGqNVAbjUdyRxvwwDUiFI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Yellow"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "482": {
        "name": "Bloke #482",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/rUdd5bPdWejsmfU9F_bRrIOJ3mm0EnOpZCtL7l30UP4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "483": {
        "name": "Bloke #483",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/pKeFYJnBF6k51_2PdwpOAX5yyV0hNZIUzNaXJq1-kSI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Red"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "Backpack Purple"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "484": {
        "name": "Bloke #484",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Eu6bLGk9vTiDns4-VFh13pVtFHl0ZInI_EGSlkDqRPE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "485": {
        "name": "Bloke #485",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/cNLm-18qtYmkIns2ViR3cWW6ZR-ylPxDn6Orl2y-kFA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "486": {
        "name": "Bloke #486",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/nO1I-xRcjcrkY7huAD834KciiGXjUZ_KbaYmZR4ZgWk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "487": {
        "name": "Bloke #487",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/to8owNsQKi8NJBq-RtFqvZEPFmFpsjW8lJ1pq0caeWI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "488": {
        "name": "Bloke #488",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/Rf4kwh8LvlTcT48lrBetx0IAPMNoVHbi5bEPbSyD3fw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Deep Purple"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Black"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Smoke"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "489": {
        "name": "Bloke #489",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/qDtkm1aWufDblcYcmiSip6ZYR85nfxkPwDhha84CCd4",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "Tank Tie Zombie"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Shades Laser"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Yellow"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Red"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "490": {
        "name": "Bloke #490",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/R-4TAvZtn62xcTKNK6fCEVwApgwEVpWkQIyWmGp8msI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "491": {
        "name": "Bloke #491",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/JlkeUSgoShmbsEKHmHcEU8pw1dP-BFtZMBNnWIRAS-Q",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Pink"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "492": {
        "name": "Bloke #492",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/eEf3li9fMs0iP-Fvr7haDDMRgfmzUkC5ARCPB37fgtg",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Blue"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Gold Pocket Chain"
            },
            {
                "trait_type": "Mouth",
                "value": "Grin"
            }
        ]
    },
    "493": {
        "name": "Bloke #493",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/8tNouowiIwDqBE9Erj12sHvV7MjbkqG8SAkYINaekUU",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "494": {
        "name": "Bloke #494",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/KM4m14xWMBcSvqVaeMttez-Tu6DwaO86eLgzzp6FBWg",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Blonde"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "495": {
        "name": "Bloke #495",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/ZeZ_DMQ4KQIThFeb7v0BoTa8oRU0HM5iSXZWkNIARhk",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Grail Blue"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "496": {
        "name": "Bloke #496",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/7CSaE6dMv8SBGI3vYcJo4eNqxxP_8mkwoAIfMz8TfSA",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Silver"
            },
            {
                "trait_type": "Hair",
                "value": "Green"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Green"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "Sword Ice"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    },
    "497": {
        "name": "Bloke #497",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/mI_gPeUNdY105DFHN9O9PMXPto0jQYnG5k0gJeR8nZY",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Green"
            },
            {
                "trait_type": "Accessory",
                "value": "Pocket Bandana Green"
            },
            {
                "trait_type": "Mouth",
                "value": "Default"
            }
        ]
    },
    "498": {
        "name": "Bloke #498",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/MVTgzyxouX4ylktay2q5Js4vVyvLmqbvwhsMde1iAZw",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Nude"
            },
            {
                "trait_type": "Hair",
                "value": "Brown"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Visor Green"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Gold Chain"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "499": {
        "name": "Bloke #499",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/E32OJz9_eZxPVJ6sA2Oon-c1EKwfc8jtICM3CXxDxjI",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Green"
            },
            {
                "trait_type": "Hair",
                "value": "Vermilion"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Brown"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "None"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "None"
            },
            {
                "trait_type": "Shoes",
                "value": "Slides Orange"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Resting"
            }
        ]
    },
    "500": {
        "name": "Bloke #500",
        "description": "A unique set of diggers.",
        "image": "https://arweave.net/4C5x-A7kbRpkRN28gJ664odyazf-jAWq3B0wwIr0QhE",
        "attributes": [
            {
                "trait_type": "Body",
                "value": "Pink"
            },
            {
                "trait_type": "Hair",
                "value": "Purple"
            },
            {
                "trait_type": "Shirt",
                "value": "None"
            },
            {
                "trait_type": "Overalls",
                "value": "Blue"
            },
            {
                "trait_type": "Jacket",
                "value": "None"
            },
            {
                "trait_type": "Top",
                "value": "Hat Red"
            },
            {
                "trait_type": "Back",
                "value": "None"
            },
            {
                "trait_type": "Face",
                "value": "Bandana Green"
            },
            {
                "trait_type": "Shoes",
                "value": "None"
            },
            {
                "trait_type": "Accessory",
                "value": "None"
            },
            {
                "trait_type": "Mouth",
                "value": "Bloodied"
            }
        ]
    }
  };
  

// Fetch token transfers for a specific address and token contract
const fetchTokenDetails = async (tokenAddress) => {
    try {
        const url = `${BASE_URL}/tokens/${tokenAddress}`;
        const response = await axios.get(url);
        console.log("success", response);
        console.log("success.data", response.data);
        console.log("success.data.total_supply", response.data.total_supply); // Corrected typo from 'toal_supply' to 'total_supply'
        return response.data.total_supply; // Return the total supply value
    } catch (error) {
        console.error('Error fetching token details:', error);
        return []; // Returning an empty array may be inappropriate if the expected return type is numeric
    }
};

router.get('/metadata/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    console.log(`Received request for metadata ID: ${id}`);
    try {
        const totalSupply = await fetchTokenDetails("0xf900e4154cbbc56603c7b2b25681be8803b6722b");
        if (totalSupply === null) {
            res.status(500).send('Error fetching total supply');
            return;
        }
        if (id <= totalSupply) {
            console.log(`Serving metadata for ID: ${id}`);
            let item;
            if (id <= 500) {
                item = metadata1_500[id];
            } else if (id <= 1000) {
                item = metadata501_1000[id];
            } else if (id <= 1500) {
                item = metadata1001_1500[id];
            } else {
                item = metadata1501_2000[id];
            }

            if (item) {
                res.json(item);
            } else {
                res.status(404).send('Metadata not found');
            }
        } else {
            console.log(`Metadata not found for ID: ${id}`);
            res.json({
                "name": "Unrevealed Bloke",
                "description": "This Bloke has not been revealed yet.",
            });
        }
    } catch (error) {
        console.error(`Error handling metadata request for ID ${id}:`, error);
        res.status(500).send('Internal Server Error');
    }
});

app.use('/.netlify/functions', router);

module.exports = app;
module.exports.handler = serverless(app);





