const express = require('express');
const router = express.Router();
let fs = require('fs');
let p = require('path')

const adminController = require('../controller/adminController')
const ceoController = require('../controller/ceoControllers')
const loginController = require('../controller/loginController')
const registerController = require('../controller/registerController')
const userController = require('../controller/userController')

const upload = require('../middleware/multer')
const verifyToken = require('../middleware/token')

//            ============ login and register ============== 

router.get('/', async function (req, res, next) {
  res.write("Hello world")
  res.end()
});

router.post("/register", registerController.register);
router.post("/login", loginController.login);
// router.post("/login", verifyToken, loginController.login);

//            ============ Admin ============== 

router.post('/admin', verifyToken, adminController.getAll);
router.post('/admin/add', upload.single('image'), adminController.add);
router.post('/admin/remove', verifyToken, adminController.remove);
router.post('/admin/detail', verifyToken, adminController.detail);
router.post('/admin/update', verifyToken, adminController.update);

//            ============ User ============== 
router.post('/user', verifyToken, userController.getAll)
router.post('/user/cart', verifyToken, userController.userCart)
router.post('/user/checkout', verifyToken, userController.checkout)

//            ============ Controller by admin ============== 

router.get('/ceo', verifyToken, ceoController.getData)

router.post('/ceo/user/detail', verifyToken, ceoController.userDetail)
router.post('/ceo/user/delete', verifyToken, ceoController.userDelete)

router.post('/ceo/admin/detail', verifyToken, ceoController.adminDetail)
router.post('/ceo/admin/productremove', verifyToken, ceoController.productRemove)




router.get('/image', upload.single('image'), (req, res, next) => {
  let { path } = req.query;

  console.log(p.join(process.cwd(), path));
  if (fs.existsSync(p.join(process.cwd(), path))) {
    return res.status(200).sendFile(p.join(process.cwd(), path));
  }
  return res.status(404).json({ message: 'File not found' });
})


module.exports = router;
