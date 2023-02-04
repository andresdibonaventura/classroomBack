const roleAdminMiddleware = (req, res, next) => {
    const role = req.user.role

    if(role === 'Admin'){
        next()
    }else {
        res.status(401).json({status: 'error', message: 'User not authorized to make this request'})
    }
}

const roleTeacherMiddleware = (req, res, next) => {
    const role = req.user.role

    if(role === 'teacher'){
        next()
    }else {
        res.status(401).json({status: 'error', message: 'User not authorized to make this request'})
    }
}


module.exports = { 
    roleAdminMiddleware,
    roleTeacherMiddleware 
}