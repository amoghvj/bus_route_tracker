# backend

Backend section of the Bus Route Tracker project

## Requirements:

INSTALL Node.js, Download MongoDB locally as a Network service: Create a .env file following the format specified in the .env.example file.

To rebuild dependancies, run:

```cmd
npm install
```

If running MongoDb locally start the server before running.

## HTTP REQUEST FORMAT:

(Initialize) POST Requests (localhost:5000):

Route:
POST http://localhost:5000/api/location/init

Options:

Request body:

```json
{
  //bus_id
  //latitude
  //longitude
  //timestamp? optional
}
```

example:

```json
{
  "bus_id": "54",
  "latitude": 0,
  "longitude": 0,
  "timestamp": {
    "$date": "2025-06-15T00:58:12.379Z"
  }
}
```

Functionality: Saves the Initial Location of Bus before Trip starts

---

(Update) POST Requests (localhost:5000):
Route:
POST http://localhost:5000/api/location/
Options:
Request body:

```json
{
  //bus_id
  //latitude
  //longitude
  //timestamp? optional
}
```

example:

```json
{
  "bus_id": "54",
  "latitude": 0,
  "longitude": 0,
  "timestamp": {
    "$date": "2025-06-15T00:58:12.379Z"
  }
}
```

Functionality: Updates the previously stored location

---

(Track) GET Requests (localhost:3000):
Route:
GET http://localhost:5000/api/location

Options:
Request params:
http://localhost:5000/api/location/:bus_id
Functionality: Find the current location of a bus with the specified id
