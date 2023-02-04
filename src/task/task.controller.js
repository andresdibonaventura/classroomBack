
const uuid = require("uuid")

const Task = require('../models/taskModels')

const createTask = async (userId, data) => {
    const newTask = await Task.create({
        id: uuid.v4(),
        title: data.title,
        description: data.description,
        response: data.response,
        calification: data.calification,
        userId: userId

    })
    console.log("hola")
    return newTask
}

const getAllTask = async () => {
    const data = await Task.findAll()
    return data
}

const getStudentTasks = async () => {
    const data = await Task.findAll({
        where: {
            userId: id
        }
    })
    return data
}

const getMyTaskById = async (id) => {
    const data = await Task.findOne({
        where:{
            id: id
        }
    })
    return data
}

const getMyTask = async (id, userId) => {

    const data = await Task.findAll({
        where:{
            userId: id
        }
    })
    return data
}

const editTask = async (id, data) => {

    const { response, uname, title, description, calification, ...restOfProperties} = data
    const res = await Task.update(
        {...restOfProperties, calification},
        {where: {id: id }}
   
    )
    return res

}

const editTaskByStudent = async (id,  data) => {
        try{
            const {title, description, calification, uname, response, ...restOfProperties} = data
            console.log("first")
            const res = await Task.update(
                {...restOfProperties, response},
               {where:{id: id }}
            );
            return res
        } catch (error){ 
            console.log(error)
        }
       

   
      
    
    }


module.exports = {
    getAllTask,
    createTask,
    getMyTaskById,
    getMyTask,
    editTask,
    editTaskByStudent,
    getStudentTasks
}