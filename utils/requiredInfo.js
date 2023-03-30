const { User } = require('../models')

const withRequiredInfo = async (req, res, next) => {
    //If User info is NULL
    try {
        const userData = await User.findByPk(req.session.user_id);
        if (!userData.first_name || !userData.last_name || !userData.birthdate || !userData.phone_number) {
          res.redirect('/profile');
        } else {
          next();
        }
      } catch (err) {
        console.log(err.message);
        res.status(500).json(err);
      }
};

module.exports = withRequiredInfo