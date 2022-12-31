const express = require("express");
const { Router } = require("./routers/root.router");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static("public"));
app.use(express.json());

app.use("/api", Router);

app.listen(PORT, () => {
    console.log(`Server starting @ PORT ${PORT}`);
});