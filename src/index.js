import express from 'express';
import v1Router from './v1/routes';

const app = express();
const PORT = process.env.PORT || 3000;
  
/**
 * use - middleware
 * C - post
 * R - get
 * U - put
 * D - delete
 */


app.get('/', (req, res) => {
    res.send("<h2>Это работает</h2>");
});

app.get('/api/v1', v1Router);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});