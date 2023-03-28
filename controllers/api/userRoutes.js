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

router.put('/signup', async (req, res) => {
  const findUser = await User.findOne({ where: {email: req.body.email}});

if (!findUser) {
  res
  .status(402)
  .json({ message: 'Not a valid email.' });
  return;
}
//Update User
try {
  const userData = User.update({
    ...req.body, 
    password: req.session.password,
    first_name: req.session.first_name,
    last_name: req.session.last_name,
    birthdate: req.session.birthdate,
    phone_number: req.session.phone_number,
  });
  res.status(201).json(updateUser);
} catch (err) {
  res.status(403).json(err);
}
});

router.post('/login', async (req, res) => {
  try {
    const findUser = await User.findOne({where:{email: req.body.email}});
    if (!findUser) {
      res
        .status(404)
        .json({message: 'Not a valid email.'});
      return;
    }
    const passwordCheck = await findUser.checkPassword(req.body.password);
    if (!passwordCheck) {
      res
        .status(405)
        .json({message: 'Password incorrect.'});
      return;
    }
    req.session.save(() => {
      req.session.user_id = findUser.id;
      req.session.logged_in = true;      
      res.json({ user: findUser, message: 'Logged in.'});
    });
  } catch (err) {
    res.status(406).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(202).end();
    });
  } else {
    res.status(407).end();
  }
});


module.exports = router;
