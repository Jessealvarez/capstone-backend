var express = require("express");
var router = express.Router();
const dotenv = require("dotenv").config();
const connectDB = require("./mongo");
const PORT = process.env.PORT || 5000;
const cors = require("cors");

connectDB();
var app = express();

//enable cors
app.use(cors({origin:process.env.CORS_ORIGIN}));
app.options("*", cors());

//This lets me send raw JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* GET home page. */
app.get("/", (req, res) => {
  res.status(200).json({ title: "Hello" });
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = router;
