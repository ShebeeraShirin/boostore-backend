const express = require('express')

const userController = require("../controller/userController")

const bookController = require("../controller/bookController")
const jwtMiddleware = require("../middleware/jwtMiddleware")
const multerConfig = require("../middleware/multerMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")
const userMiddleware = require("../middleware/userMiddleware")

const route = express.Router()

route.post('/api/register',userController.userRegister)
route.post('/api/login',userController.userLogin)
route.post('/api/google-login',userController.googleLogin)
route.post('/api/addBook',jwtMiddleware,multerConfig.array('UploadedImages',3),bookController.addBook)
route.get('/api/getBooks',jwtMiddleware,bookController.getBooks)
route.get('/api/getHomeBooks',bookController.getHomeBooks)
route.get('/api/viewBook/:id',jwtMiddleware,bookController.viewBook)

// admin side get user and get book

route.get('/api/getUsers',adminMiddleware,userController.getUsers)
route.get('/api/getBooks',adminMiddleware,bookController.getBooks)

 route.put('/api/update-admin',adminMiddleware,multerConfig.single('profile'),userController.updateAdmin)
 route.get('/api/getAdmin',adminMiddleware,userController.getAdmin)
route.put('/api/update-user',userMiddleware,multerConfig.single('profile'),userController.updateUser)
route.put('/api/makePayment',jwtMiddleware,bookController.buyBooks)


module.exports = route