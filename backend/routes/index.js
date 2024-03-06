const express = require("express")
const userRouter = require("./user.js")
const accountRouter = require("./account.js")


const router = express.Router()

router.get("/",(req, res)=>{
    res.send("Testing Backend")
})
router.use("/user", userRouter)
router.use("/account", accountRouter)

module.exports = router;
