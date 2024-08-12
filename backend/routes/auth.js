const router = require('express').Router();
const User = require('../modals/user');
const bcrypt = require('bcryptjs');

// Sign up

router.post('/signin', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      console.log('Received login request:', { email, password });
  
      // Check if the email is provided
      if (!email) {
        console.error('Email is required');
        return res.status(400).json({ message: 'Email is required' });
      }
  
      // Check if the password is provided
      if (!password) {
        console.error('Password is required');
        return res.status(400).json({ message: 'Password is required' });
      }
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        console.error('User not found');
        return res.status(401).json({ message: 'Invalid email' });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.error('Password does not match');
        return res.status(402).json({ message: 'Invalid password' });
      }
  
      // If login is successful, return user info or token
      console.log('Login successful:', { email });
      const {...others} = user._doc
      return res.status(200).json({ message: 'Login successful', others });
    } catch (error) {
      console.error('Server error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });


router.post("/register", async (req, res) => {
    try {

        const { email, username, password } = req.body;

        // const existingUser = await User.findOne({$or : [{email},{password}]});
        // if(existingUser){
        //     return res.status(400).json({message : "User already exists !!!"})
        // }
        const hashpassword = bcrypt.hashSync(password);
        const user = new User({ email, username, password:hashpassword });

        await user.save().then(() => res.status(200).json({ message:"Sign Up Successfull !!!" }));
        console.log("resgister work", new Date())
    } catch (e) {
        // console.log(e);
        res.status(200).json({ message: "User Already Exist" });
    }
});


// Sign In
// router.post('/signin', async (req,res)=>{
//     try {
//         const user = await User.findOne({email:req.body.email});
//         if( !user){
//             res.status(402).json({message:"Please Sign Up First"})
//         }
//         const isPassCorrect = bcrypt.compareSync(
//             req.body.password,
//             user.password
//         );
//         if(!isPassCorrect){
//             res.status(401).json({message:"Email or Password Is Not Correct"})
//         }
//         const {password ,...others} = user._doc;
//         // res.status(200).json({others})
//         res.status(200).json({message:"Sign In Successfull",others})
//         // console.log({password ,...others})

//     } catch (error) {
//         console.log(`Sign In error :${error}`)
//         res.status(500).json({message:"Server error"})
//     }
// });


module.exports = router;