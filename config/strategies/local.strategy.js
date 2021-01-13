import passport from 'passport';
import local from 'passport-local';
import mongodb from 'mongodb';

const { MongoClient } = mongodb;
const { Strategy } = local;
const url = 'mongodb://localhost:27017';
const dbName = 'library';

function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
      const signIn = async () => {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const user = await db.collection('users').findOne({ username });
        if (user.password === password) {
          done(null, user);
        } else {
          done(null, false);
        }
        client.close();
      };
      signIn();
    }
  ));
}

export { localStrategy as default };
