const express = require('express');
const bodyParser = require('body-parser');
const v1UserRouter = require('./v1/routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

//Явно указываем, что в запросе у нас может существовать тело
//в формате json
app.use(bodyParser.json());

/**
 * use - middleware
 */
app.use('/api/v1/users', v1UserRouter);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});