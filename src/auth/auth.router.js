const router = require('express').Router()

const authServices = require('./auth.http')


router.post('/login', authServices.login)

router.post('/login-teacher', authServices.TeacherLogin)

exports.router = router    