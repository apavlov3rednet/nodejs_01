// In src/index.js
const express = require('express');
const v1UserRouter = require('./userRoutes.js');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;
 
app.use(morgan(':method :url :status :res[content-lenght] - :response-time ms'));
app.use('/users', v1UserRouter);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});