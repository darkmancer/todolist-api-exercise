const express = require('express');

const todoRoute = require('./routes/todoRoute');

const app = express();

app.use(express.json());

app.use('/todos', todoRoute);
// app.use('/users',userRoute)
// app.use('/products',productRoute)

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({ message: err.message });
});

app.listen(8002, () => console.log('server running on port 8002'));
