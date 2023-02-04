const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware, roleTeacherMiddleware } = require('../middleware/adminRole')
const { upload } = require('../utils/multer')
require('../middleware/auth.middleware')(passport)

const userServices = require('./users.http')


router.route('/') //* /api/v1/users/
    .get(passport.authenticate('jwt', {session: false}), roleAdminMiddleware, userServices.getAll)
    .post(userServices.register)

router.route('/teacher')
    .get(passport.authenticate('jwt', {session: false}), roleTeacherMiddleware, userServices.getStudents)  
    
router.route('/me')
    .put(passport.authenticate('jwt', {session: false}) ,userServices.edit)
    .get(passport.authenticate('jwt', {session: false}), userServices.getMyUser)
    .delete(passport.authenticate('jwt', {session: false}), userServices.removeMyUser)

router.route('/me/profile-img')
    .post(passport.authenticate('jwt', {session: false}), upload.single('profile_img'), userServices.postProfileImg)
    //.get()

router.route('/:id')
    .get(userServices.getById)
    .delete(passport.authenticate('jwt', {session: false}), roleAdminMiddleware, userServices.remove)
    .put(passport.authenticate('jwt', {session: false}), roleAdminMiddleware, userServices.editAdmin)
    



exports.router = router