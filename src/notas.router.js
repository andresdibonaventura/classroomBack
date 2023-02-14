const router = require('express').Router()

const taskService = require('./task/task.http')

router.route('/:id')
.get(taskService.getByStudent)


exports.router = router