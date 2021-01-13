import express from 'express';
import chalk from 'chalk';
import morgan from 'morgan';
import path from 'path';
import pg from 'pg';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import adminRouter from './routes/adminRoutes.js';
import authRouter from './routes/authRoutes.js';
import bookRouter from './routes/bookRoutes.js';
import passport from './config/passport.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({ secret: 'library', resave: false, saveUninitialized: true, }));
passport(app);

app.use(express.static(path.join(path.resolve(), 'public')));
app.use('/css', express.static(path.join(path.resolve(), '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(path.resolve(), '/node_modules/bootstrap/dist/js')));
app.set('views', 'views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', title: 'Book' },
  { link: '/authors', title: 'Author' }
];

// postgres config
const dbConfig = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'library',
  database: 'library'
};
const client = new pg.Client(dbConfig);

client.connect((err) => {
  if (err) console.error('Error trying to connect to postgres', err.stack);
  console.log('Connected to database');
});

app.use('/books', bookRouter(nav, client));
app.use('/admin', adminRouter());
app.use('/auth', authRouter(nav));

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      title: 'My library ',
      nav
    }
  );
});

app.listen(port, () => {
  console.log(`Listening on port ${chalk.green(port)}`);
});
