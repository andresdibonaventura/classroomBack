const Users = require('./user.model')
const Roles = require('./roles.model')

const Task = require('./taskModels')


const initModels = () => {
    //? Users -> Posts
    // Users.hasOne(Roles)
    // Roles.belongsToMany(Users)
    
    //? Users <-> Accomodations
    Users.hasMany(Task)
    Task.belongsTo(Users)

}

module.exports = initModels
