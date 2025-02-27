const request = require("supertest");
const { app, server } = require("../server"); 

describe(" Appointment Booking API Tests", () => {
  
  it("Should fetch available slots for a date", async () => {
    const response = await request(app).get("/api/slots?date=2025-02-27");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("Should book an appointment successfully", async () => {
    const newAppointment = {
      name: "John Doe",
      phone: "1234567890",
      date: "2025-03-27",
      time: "10:30",
    };

    const response = await request(app).post("/api/book").send(newAppointment);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe("Appointment booked successfully!");
  });

  it(" Should return error for duplicate slot booking", async () => {
    const duplicateAppointment = {
      name: "Jane Doe",
      phone: "0987654321",
      date: "2025-03-27",
      time: "15:30", // Already booked
    };

    const response = await request(app).post("/api/book").send(duplicateAppointment);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Slot already booked");
  });


  afterAll(() => {
    server.close();
  });

});
