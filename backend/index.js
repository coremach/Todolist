const express = require("express")
const cors = require('cors')
require('./conn/conn.js')
// // mongodb connect
require('dotenv/config')

const auth = require('./routes/auth');
const list = require('./routes/list');
const PORT = process.env.PORT || 4000

const app = express();

// List of allowed origins
const allowedOrigins = [
    '*',
    'http://localhost:3000',
    "https://deploy-mern-lwhq.vercel.app",
    'https://server-phi-ashy-63.vercel.app',
];

// CORS configuration
const corsOptions = {
    origin: (origin, callback) => {
        // Check if the incoming origin is in the allowed origins list
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS')); // Reject the request
        }
    },
    methods: ["POST", "GET", "DELETE", "PUT"], // Allowed methods
    allowedHeaders: ['Content-Type'], // Allowed headers
    credentials: true, // Allow credentials (if needed)
};
app.use(cors(corsOptions));

app.use(express.json());


app.use("/api/v1", auth)
app.use("/api/v2", list)

app.get('/', (req, res) => {
    const city = "Londan";
    const country = "England";
    const temp = 24;
    res.send("<h1>Hello, The temperature in " + city + ", " + country + " is " + temp + "</h1>");
})

app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`)
})