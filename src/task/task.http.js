

const taskController = require('./task.controller')

const create = (req, res) => {
    const data = req.body 
    const userId = req.body.userId
    console.log("hola")
    taskController.createTask(userId, data)
    .then(response => {
        res.status(201).json(response)
    })
    .catch(err => {
        res.status(400).json(err.message)
    })
}

const getByStudent = (req, res) => {
  const id = req.params.id
  console.log('first')
  taskController.getStudentTasks(id)
  .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json({ message: `The student with id ${id} is not found` });
    });
}


const getMy = (req, res) => {
    const id = req.user.id
    taskController.getMyTask(id)
    .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(404).json({ message: `The task with id ${id} is not found` });
      });
}

const getMyId = (req, res) => {
    const id = req.params.id
    taskController.getMyTaskById(id)
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((err) => {
      res.status(404).json({ message: `The task with id ${id} is not found`})
    })
}

const edit = (req, res) => {
    const id = req.params.id
    const data = req.body
    if (!Object.keys(data).length) {
        return res.status(400).json({ message: "Missing Data" });
      } else if (
        
        !data.calification 
      ) {
        return res.status(400).json({message: "All fields must be completed"});
      } else {
        const response = taskController.editTask(id, data)
        return res.status(200).json({
          message: 'Task edited succesfully',
          task: response
        })
      }
}

const editByStudent = async (req, res) => {
    const id = req.params.id
    const data = req.body
   
    if (!Object.keys(data).length) {
        return res.status(400).json({ message: "Missing Data" });
      } else if (
        !data.response 
      ) {
        return res.status(400).json({message: "All fields must be completed"});
      } else {
        const response = await taskController.editTaskByStudent(id,  data)
        return res.status(200).json({
          message: 'response edited succesfully',
          task: response
        })
      }
}

module.exports = {
    create,
    getMyId,
    getMy,
    edit,
    editByStudent,
    getByStudent
}