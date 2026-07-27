require("dotenv").config();

const app = require("./src/app");
const ConnectDB = require("./src/DB/db");

const PORT = process.env.PORT || 3000;

ConnectDB();

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});





