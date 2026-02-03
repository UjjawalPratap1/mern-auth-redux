import User from "./userSchema.js";


export const Login = async(req, res)=>{
    console.log("Login route hit:", req.method, req.path);
    try {
         const {email , password} = req.body;

    if(!email || !password){
        return res.status(400).json({msg: "Fill the all details "});
    }
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({
            msg:"Please give register email or password",
            success: false
        });
    }
    if (password != user.password) {
    return res.status(401).json({
        message: "Invalid email or password",
        success: false
    });
}
    console.log("login successful")
    return res.status(200).json({
  message: "Login successful",
  success: true,
  user: {
    _id: user._id,
    username: user.username,
    email: user.email
  }
});


    } catch (error) {
        return res.status(500).json({
            msg:"something went wrong"
        })
    }
}

export const Register = async(req, res)=>{
    console.log("Register route hit:", req.method, req.path);
    try {
        const {username , email , password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({
            msg: "fill all the details "
        })
    }
    const existingUser = await User.findOne({$or: [{email}, {username}]});
    if(existingUser){
        if(existingUser.email === email) {
            return res.status(409).json({
                msg: "this email is already registered"
            })
        }
        if(existingUser.username === username) {
            return res.status(409).json({
                msg: "this username is already taken"
            })
        }
    }
    await User.create({username, email, password});
    console.log("user register successfully")
    return res.status(200).json({
        msg:"User register successfully"
    })
    } catch (error) {
        console.error("Register error:", error);
        if(error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(409).json({
                msg: `this ${field} is already registered`
            })
        }
        return res.status(500).json({
            msg:"something went wrong"
        })
    }

}
