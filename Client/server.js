const express = require("express");
const app = express();
const path = require("path");

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, "dist")));

// Handle all GET requests
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
