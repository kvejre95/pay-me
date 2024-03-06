const express = require("express")
const {User, Account} = require("../db/index")
const jwt = require("jsonwebtoken");
const zod = require("zod");
const  authMiddleware = require("../middleware");

const router = express.Router();


const signupSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
});


const signinSchema = zod.object({
    username:zod.string().email(),
    password:zod.string()
})


const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})


router.post("/signup", async (req, res)=>{
    const {success} = signupSchema.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect Details"
        })
    }
    const existinguser = User.findOne({
        username: req.body.username
    })
    if (existinguser){
        return res.status(411).json({
            message: "UserName Already Exists"
        })
    }

    const dbUser = await User.create(req.body)
    
    const existingAccount = Account.findOne({
        userID: dbUser._id
    })

    if (!existingAccount){
        const acountID = await Account.create({userId: dbUser._id, balance: 1 + Math.floor(Math.random()*10000)})    
    }
    
    const token = jwt.sign({
        userId: dbUser._id
    }, process.env.JWT_SECRET)

    res.json({
        message:"User has been successfully created",
        token: token
    })
});

router.post("/signin", async (req, res)=>{
    
    const {success} = signinSchema.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect Details"
        })
    }
    const existinguser = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })
    if (existinguser){
        const token = jwt.sign({
            userId: existinguser._id
        }, process.env.JWT_SECRET)
    
        return res.json({
            message:"User has been Logged in",
            token: token
        })
    }

    res.status(411).json({
        message: "Incorrect Credentials."
    })
       
});

router.put("/", authMiddleware, async (req, res)=>{
    const userId = req.userId
    const {success} = updateBody.safeParse(req.body)
    if (!success){
        res.status(411).json({
            message: "Data is Incorrect"
        })
    }
    await User.updateOne({_id: userId}, req.body)

    res.json({
        message: "Update Successful"
    })

})

router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
    
    res.json({
        user: users.filter(user => user._id.toString() !== req.userId)
        .map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;