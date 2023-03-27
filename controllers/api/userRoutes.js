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

    // router.get('/login', async)

// router.put('/signup', async (req, res) => {
//   const userData = await User.findOne({ where: { 
//     email: req.body.email,
//   }
// });

//   if (!userData) {
//     res
//       .status(400)
//       .json({ message: 'Incorrect email or password, please try again.' });
//     return;
//   }
//   //Update User
//   try {
//     const userData = User.update({
//       ...req.body, 
//       password: req.session.password,
//       first_name: req.session.first_name,
//       last_name: req.session.last_name,
//       birthdate: req.session.birthdate,
//       phone_number: req.session.phone_number,
//     });
//     res.status(200).json(updateUser);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });



module.exports = router;
