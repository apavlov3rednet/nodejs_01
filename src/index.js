const express = require('express');
//const bodyParser = require('body-parser');
const v1UserRouter = require('./v1/routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


//app.use(bodyParser.json());
//меняем get на use
app.use('/api/v1/users', v1UserRouter);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});