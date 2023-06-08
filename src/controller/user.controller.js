const User = require("../models/user.model");
const responseGenerate = require("../utils/responseGenerate ");

exports.signUp = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName, phone } = req.body;
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.save({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phone,
        });

        // Return success response
        res.status(201).json(responseGenerate(newUser, "User signup successfully!", false));
        
    } catch (error) {
        next(error)
    }
    
}

exports.loginUser=async(req,res,next)=>{
    try {
        const { email, password } = req.body;
    
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(404).json({ error: 'User not found' });
        }
        
        // Compare the provided password with the stored password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
        }

        
        // Generate a JWT token
        const token = jwt.issueJWT(user);
    
        // Return the token
        return res.json(
            responseGenerate(
              {
                name: user.name,
                email: user.email,
                _id: user._id,
                profileImage: user.profileImage,
                phone: user.phone,
                role: user.role,
                status: user.status,
                token,
              },
              "Login successful!",
              false
            )
          )
        
    } catch (error) {
        next(error)
    }
}

exports.getUsers = async (req, res) => {
    try {
      const user = await getUsersService();
  
      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "can't get the data",
        error: error.message,
      });
    }
  };

  exports.getManagers = async (req, res) => {
    try {
      const managers = await getManagersService();
  
      res.status(200).json({
        status: "success",
        data: managers,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "can't get the data",
        error: error.message,
      });
    }
  };


  exports.createUser = async (req, res) => {
    try {
      // save or create
      const user = await createUserService(req.body);
      console.log(user);
  
      res.status(200).json({
        status: "success",
        messgae: "User created successfully!",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "Couldn't create user ! ",
        error: error.message,
      });
    }
  };


  exports.makeStoreManager = async (req, res) => {
    try {
      const user = req.body;
  
      const userFound = await getUserByIdService(user._id);
  
      if (!userFound) {
        return res.status(404).json({
          status: "fail",
          error: "No user found for this id",
        });
      }
  
      const result = await makeSotreManagerService(user._id);
  
      if (!result.modifiedCount) {
        return res.status(400).json({
          status: "fail",
          error: "Failed to make manager.",
        });
      }
  
      res.status(200).json({
        status: "success",
        messgae: "Successfully made store manager!",
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: " Data is not inserted ",
        error: error.message,
      });
    }
  };
  