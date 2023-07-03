const express = require("express");
var cors = require('cors')
const app = express();
const port = 3000;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.use(cors())
app.use(express.json());

//Trips Routes =======================================
app.get("/api/trips", async (req, res) => {
  let resp = {};
  try {
    const trips = await prisma.trip.findMany({});
    resp = { records: trips, success: true };
  } catch (error) {
    resp = { err: error.message, success: false };
  }
  res.json(resp);
});

app.post("/api/trips", async (req, res) => {
  let resp = {};
  try {
    const trips = await prisma.trip.create({ data: req.body });
    resp = { records: trips, success: true };
  } catch (error) {
    resp = { err: error.message, success: false };
  }
  res.json(resp);
});

app.put("/api/trips/:id", async (req, res) => {
  let resp = {};
  try {
    const trips = await prisma.trip.update({
      where: { id: Number(req.params["id"]) },
      data: req.body,
    });
    resp = { records: trips, success: true };
  } catch (error) {
    resp = { err: error.message, success: false };
  }
  res.json(resp);
});

app.delete("/api/trips/:id", async (req, res) => {
  let resp = {};
  try {
    const trips = await prisma.trip.delete({
      where: {
        id: Number(req.params["id"]),
      },
    });
    resp = { records: trips, success: true };
  } catch (error) {
    resp = { err: error.message, success: false };
  }
  res.json(resp);
});

//Bookings Routes ====================================
app.get("/api/bookings", async (req, res) => {
  let resp = {};
  try {
    const bookings = await prisma.booking.findMany({ include: { trip: true } });
    resp = { records: bookings, success: true };
  } catch (error) {
    resp = { err: error.message, success: false };
  }
  res.json(resp);
});

app.post("/api/bookings", async (req, res) => {
  let resp = {};
  try {
    const trips = await prisma.booking.create({ data: req.body });
    resp = { records: trips, success: true };
  } catch (error) {
    resp = { err: error.message, success: false };
  }
  res.json(resp);
});

app.put("/api/bookings/status/:id", async (req, res) => {
  // Status should be: BENING || ACCEPTED || REJECTED
  let resp = {};
  try {
    const trips = await prisma.booking.update({
      where: {
        id: Number(req.params["id"]),
      },
      data: {
        status: req?.body?.status,
      },
    });
    resp = { records: trips, success: true };
  } catch (error) {
    resp = { err: error.message, success: false };
  }
  res.json(resp);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
