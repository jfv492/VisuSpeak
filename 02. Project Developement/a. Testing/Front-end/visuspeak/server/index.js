import express from 'express';
const app = express();
const PORT = process.env.PORT || 3030;

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});