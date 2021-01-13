import express from 'express';
import mongo from 'mongodb';
import passport from 'passport';

const authRouter = express.Router();
const { MongoClient } = mongo;

function router(nav) {
  authRouter.route('/signUp')
    .post((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'library';

      const createUser = async () => {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const user = await db.collection('users').insertOne(req.body);
        req.login(user.ops[0], () => {
          res.redirect('/auth/profile');
        });
      };
      createUser();
    });

  authRouter.route('/signIn')
    .get((req, res) => {
      res.render('signIn', {
        nav, title: 'signIn'
      });
    }).post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));

  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

export { router as default };
