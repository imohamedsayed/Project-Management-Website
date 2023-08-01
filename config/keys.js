// add this file to .gitignore

module.exports = {
  google: {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  },
  session: {
    key: process.env.SESSION_KEY,
  },
};
