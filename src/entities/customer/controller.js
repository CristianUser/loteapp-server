const bcrypt = require('bcrypt');
const { verifyAuth } = require('agradon/auth/utils');

function postMiddleware(req, res, next) {
  return bcrypt.genSalt(10).then(salt => {
    bcrypt.hash(req.body.password, salt).then(hash => {
      req.body.password = hash;
      req.body.saltSecret = salt;
      next();
    });
  });
}
module.exports = router => {
  router.post('/', postMiddleware);

  router.get('/me', verifyAuth(), (req, res) => {
    res.send(req.user);
  });
};
