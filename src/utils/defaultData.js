const Task = require("../models/taskModels");
const Users = require("../models/user.model");

const generateData = async() => {
await Users.bulkCreate([{
    id: "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
    firstName: "Richard",
    lastName: "Bracho",
    gender: "male",
    email: "bracho@academlo.com",
    password: "$2b$10$Yz37nZKrjAjJz/uendIsl.FqqrnfE3zQiKZWs9kteUkhDR41tuSzO",
    country: "Venezuela",
    role: "Admin",
    status: "active",

  },
  {
    id: "52cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
    firstName: "andres",
    lastName: "di bonaventura",
    gender: "male",
    email: "andres@academlo.com",
    password: "$2b$10$Yz37nZKrjAjJz/uendIsl.FqqrnfE3zQiKZWs9kteUkhDR41tuSzO",
    country: "Venezuela",
    role: "teacher",
    status: "active",
  },
{
    id: "63cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
    firstName: "juan",
    lastName: "juan",
    gender: "male",
    email: "juan@academlo.com",
    password: "$2b$10$Yz37nZKrjAjJz/uendIsl.FqqrnfE3zQiKZWs9kteUkhDR41tuSzO",
    country: "Venezuela",
    role: "normal",
    status: "active",
}])

 await Task.bulkCreate([{
    id: "befd9829-89f4-4709-a59a-57f597080f8d",
    title: "numbers",
    description: "write all the numbers util 100",
    response: "0",
    calification: "1",
    userId: "63cd6011-7e76-4d6d-b25b-1d6e4182ec2f",

 },
 {
  id: "befd9829-89f4-4709-a59a-57f597080f8d",
  title: "numbers2222",
  description: "write all the numbers util 100",
  response: "7",
  calification: "9",
  userId: "63cd6011-7e76-4d6d-b25b-1d6e4182ec2f",

}
])
}

  module.exports = generateData