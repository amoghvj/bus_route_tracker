# Backend

Backend section of the Bus Route Tracker project

## Requirements:

INSTALL Node.js, Download MongoDB locally as a Network service: Create a .env file following the format specified in the .env.example file.

To rebuild dependancies, run:

```cmd
npm install
```

If running MongoDb locally start the server before running.

If running on a Local Network without online deployement, to enable port forwarding for hosting:

    Open Windows Defender Firewall
    Go to “Advanced Settings” > Inbound Rules
    Add a New Rule:
    Type: Port
    Protocol: TCP
    Port: 5000 (or whichever port your backend uses)
    Allow the connection
    Apply it to Private Networks

To access the backend from other devices, use the ip address of the backend device along with the port it is hosted on

example:

    'http://localhost:5000/api/...'
    'http://X.X.X.X:5000/api/...'

Use localhost instead of the IP address of the backend deviceif on the same device

## HTTP REQUEST FORMAT:

(Initialize) POST Requests (X.X.X.X:5000):

Route:

    POST http://X.X.X.X:5000/api/location/init

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

(Update) POST Requests (X.X.X.X:5000):
Route:

    POST http://X.X.X.X:5000/api/location/

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

(Track) GET Requests (X.X.X.X:5000):
Route:

    GET http://X.X.X.X:5000/api/location

Options:

Request params:

    http://X.X.X.X:5000/api/location/:bus_id

Functionality: Find the current location of a bus with the specified id
