# RFID Member System API

This is a simple API for managing RFID member data and saldo updates.

## Features

- Create new members with RFID card data
- Update member saldo with RFID card verification

## API Endpoints

### 1. Create New Member
- **POST** `/api/newmember`
- Creates a new member and writes data to RFID card
- Request body example:
```json
{
  "name": "borneo bangkit",
  "ship_id": "37499384",
  "agency": "lautan jaya hasana",
  "type": "top up",
  "nominal": "500000"
}
```

### 2. Update Saldo
- **POST** `/api/updatesaldo`
- Updates saldo for a member and writes update data to RFID card
- Request body example:
```json
{
  "name": "borneo bangkit",
  "ship_id": "37499384",
  "agency": "lautan jaya hasana",
  "type": "update saldo",
  "nominal": "500000",
  "code": "384775"
}
```

## Running the Application

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

### Using Docker

1. Build the Docker image:
```bash
docker build -t rfid-api .
```

2. Run the container:
```bash
docker run -p 3000:3000 rfid-api
```

The API will be available at `http://localhost:3000`

## Testing the API

You can test the API using curl or Postman:

### Create New Member
```bash
curl -X POST http://localhost:3000/api/newmember \
  -H "Content-Type: application/json" \
  -d '{
    "name": "borneo bangkit",
    "ship_id": "37499384",
    "agency": "lautan jaya hasana",
    "type": "top up",
    "nominal": "500000"
  }'
```

### Update Saldo
```bash
curl -X POST http://localhost:3000/api/updatesaldo \
  -H "Content-Type: application/json" \
  -d '{
    "name": "borneo bangkit",
    "ship_id": "37499384",
    "agency": "lautan jaya hasana",
    "type": "update saldo",
    "nominal": "500000",
    "code": "384775"
  }'
``` 


