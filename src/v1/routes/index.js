// In src/index.js
const express = require('express');
const v1UserRouter = require('./userRoutes.js');
const v1GroupRouter = require('./groupRoutes.js');
const v1ProjectRouter = require('./projectRoutes.js');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;
 
app.use(morgan(':method :url :status :res[content-lenght] - :response-time ms'));
app.use('/users', v1UserRouter);
app.use('/groups', v1GroupRouter);
app.use('/projects', v1ProjectRouter);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});