const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleware } = require('../middleware/adminRole')
require('../middleware/auth.middleware')(passport)
const { roleTeacherMiddleware } = require('../middleware/adminRole')

const taskServices = require('./task.http')
const userServices = require('../users/users.http')

router.route('/teacher')
.get(passport.authenticate('jwt', {session: false}), roleTeacherMiddleware, userServices.getStudents)
.post(passport.authenticate('jwt', {session: false}), roleTeacherMiddleware, taskServices.create)

router.route('/teacher/:id')
.patch(passport.authenticate('jwt', {session: false}), roleTeacherMiddleware, taskServices.edit)
.get(passport.authenticate('jwt', {session: false}), taskServices.getMyId)

router.route('/me')
.get(passport.authenticate('jwt', {session: false}), taskServices.getMy)

router.route('/me/:id')
.patch( taskServices.editByStudent)

router.route('teacher/student/:id')
.get(taskServices.getByStudent)


router.route('/:id')
.get(taskServices.getMyId)

exports.router = router