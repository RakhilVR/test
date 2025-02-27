const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const appointmentRoutes = require('./Routes/appointmentRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', appointmentRoutes);
app.use(errorHandler);

// Start the server & store the instance
const server = app.listen(PORT, () => {
    if (process.env.NODE_ENV !== "test") {
        console.log(`Server running at http://localhost:${PORT}`);
    }
});

// Export app and server for testing
module.exports = { app, server };
