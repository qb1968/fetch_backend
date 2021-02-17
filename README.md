# Fetch_Rewards Backend_Assesment

## Instructions

- Clone this repo

- Run npm install or yarn ( Whichever you prefer )

- Open terminal and run:

### `npm or yarn start`

That will run the backend on http://localhost:5000

## Open Postman or equivalent that you like to test with

- Using this information below do a POST request to http://localhost:5000/addPoints :

- { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }
- { "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" }
- { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" }
- { "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" }
- { "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }

### `(Make sure you enter each line with a separate POST request)`

- Next make a POST request to http://localhost:5000/spendPoints :

  Add this to the body { "points": 5000 }

  And result should be :


- { "payer": "DANNON", "points": -100 },
- { "payer": "UNILEVER", "points": -200 },
- { "payer": "MILLER COORS", "points": -4,700 }


- Finally make a GET request to http://localhost:5000/get/Total :

  And result should be :

{
"DANNON": 1000,
"UNILEVER": 0,
"MILLER COORS": 5300
}



Thanks for the opportunity!!!
