const router = require('express').Router();
const { User } = require('../../models');


router.post('/signup', async (req, res) => {
  try{
    const findUser = await User.findOne({ where: { email: req.body.email } });

    if (findUser) {
      res.status(400).json({ message: `${req.body.email} already exists.`});
        return;
    }
    //Create User
      const userData = await User.create(req.body);
      req.session.save(() => {
        req.session.user_id = userData.id
        req.session.logged_in = true
        res.status(200).json(userData);
      });
      
    } catch (err){
      res.status(401).json(err);
    }
    });

router.put('/profile', async (req, res) => {   
  try {
    const userData = await User.update(
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birthdate: req.body.birthdate,
      phone_number: req.body.phone_number
    }, 
    {
      where: {
        id: req.session.user_id,
      }
    });

      if (!userData) {
        res.status(404).json({ message: 'No user found.' });
        return;
      }
      res.status(200).json('User info has been updated.');
  } catch (err) {
    res.status(400).json(err);
  }
})

router.post('/login', async (req, res) => {
  try {
    const findUser = await User.findOne({ where: { email: req.body.email } });

    if (!findUser) {
      res
        .status(400)
        .json({ message: 'No user found.' });
      return;
    }

    const passwordCheck = await findUser.checkPassword(req.body.password);

    if (!passwordCheck) {
      res
        .status(400)
        .json({ message: 'Incorrect password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = findUser.id;
      req.session.logged_in = true;
      
      res.json({ user: findUser, message: 'Logged in.' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
