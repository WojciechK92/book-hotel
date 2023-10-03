import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import router from './routes/web.js';

const app = express();
const __dirname = path.resolve();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(ejsLayouts);
app.set('layout', 'layouts/main');

app.use(express.static('public'));

app.use(router);

export default app;

