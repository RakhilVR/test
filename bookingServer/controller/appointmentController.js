
const { getQueryPromise } = require("../config/database");

const generateSlots = () => {
    const slots = [];
    const startHour = 10, endHour = 17;
    for (let hour = startHour; hour <= endHour; hour++) {
        if (hour === 13) continue; // Skip break time (1 PM - 2 PM)
        for (let minutes of ["00", "30"]) {
            if (hour === 17 && minutes === "30") break;
            slots.push(`${hour}:${minutes}`);
        }
    }
    return slots;
};

// Fetch available slots
exports.getAvailableSlots = async (req, res, next) => {
    try {
        const queryPromise = await getQueryPromise();
        const { date } = req.query;
        if (!date) return res.status(400).json({ error: "Date is required" });

        const rows = await queryPromise(`SELECT time FROM appointments WHERE date = ?`, [date]);

        const bookedSlots = rows.map(row => row.time);
        const availableSlots = generateSlots().filter(slot => !bookedSlots.includes(slot));


        return res.status(200).json({
            status_code: 200,
            status: true,
            message: 'Available Slots',
            data: availableSlots,

        });
    } catch (err) {
        next(err);
    }
};

// Book an appointment
exports.bookAppointment = async (req, res, next) => {
    try {
        const queryPromise = await getQueryPromise();
        const { name, phone, date, time } = req.body;
        if (!name || !phone || !date || !time) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const booked = await queryPromise(`INSERT INTO appointments (name, phone, date, time) VALUES (?, ?, ?, ?)`,
            [name, phone, date, time]);

        if (booked.affectedRows != 0) {
            return res.status(200).json({
                status_code: 200,
                status: true,
                message: "Appointment booked successfully!",


            });
        } else {
            return res.status(400).json({
                status_code: 400,
                status: false,
                message: "Not booked",
            });
        }


    } catch (err) {
        console.log(err);
        
        if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: "Slot already booked" });
        next(err);
    }
};
