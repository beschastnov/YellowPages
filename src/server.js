import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import path from 'path';
import store from 'session-file-store';
import authRouter from './routes/authRouter';
import jsxRender from './routes/utils/jsxRender';
import indexRouter from './routes/indexRouter';
import apiRouter from './routes/apiRouter';

const PORT = 3000;
const app = express();

app.engine('jsx', jsxRender);
app.set('view engine', 'jsx');
app.set('views', path.join(__dirname, 'components'));

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const FileStore = store(session);

const sessionConfig = {
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: false,
  saveUninitialized: false,
  store: new FileStore(),
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};
app.use(session(sessionConfig));

app.use((req, res, next) => {
  res.locals.userSession = req.session.userSession;
  res.locals.path = req.originalUrl;
  next();
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api/v1', apiRouter);

app.listen(PORT, () => console.log('App has started on port', PORT));
