# Create API_DOCS.md file content

"""# API Documentation - Appointment Booking System

## Base URL

http://localhost:3000/api

## Endpoints

### 1. Get Available Slots

**Request**

- **Method:** `GET`
- **Endpoint:** `/slots`
- **Query Parameters:**

| Parameter | Type                  | Required | Description                     |
| --------- | --------------------- | -------- | ------------------------------- |
| `date`    | `string` (YYYY-MM-DD) | Yes      | Date for which slots are needed |

**Example Request**

**Response**

- **Success (200 OK)**

```json
{
  "status_code": 200,
  "status": true,
  "message": "Available Slots",
  "data": ["10:00", "10:30", "11:00", "11:30"]
}
```

```json
{
"error": "Date is required"
}

2. Book an Appointment
   Request

Method: POST
Endpoint: /book
Body Parameters (JSON):
Parameter Type Required Description
name string Yes Full name of the user
phone string Yes Contact phone number
date string (YYYY-MM-DD) Yes Appointment date
time string (HH:mm) Yes Selected time slot

Example Request

POST /api/book
Content-Type: application/json

{
"name": "John Doe",
"phone": "1234567890",
"date": "2025-02-27",
"time": "10:30"
}

Response

Success (200 OK)

{
"status_code": 200,
"status": true,
"message": "Appointment booked successfully!"
}

Error (400 Bad Request)

{
"error": "All fields are required"
}

Error (400 Bad Request - Duplicate Booking)
{
"error": "Slot already booked"
}

Edge Cases & Validations
Scenario Expected Response

Booking without required fields 400 Bad Request - All fields are required
Booking a past date 400 Bad Request - Cannot book past dates
Booking an already reserved slot 400 Bad Request - Slot already booked
Fetching slots without providing a date 400 Bad Request - Date is required
```
