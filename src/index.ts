import express from 'express';

const app = express();
const PORT = 8080 || process.env.PORT;

// define a route handler for the default home page
app.get('/', (_req, res) => {
  res.send('Hello world!');
});

app.listen(PORT, () => console.log(`App is live on port ${PORT}`));
