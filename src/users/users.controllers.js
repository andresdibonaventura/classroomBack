const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

const Users = require('../models/user.model');



const getAllUsers = async () => {
// if (role === 'Admin' || 'teacher'){
  const data = await Users.findAll({
    attributes: {
      exclude: ['password']
    }
  })
  return data;
  //? select * from users;
// }
 
};

const getAllStudents = async () => {
  const data = await Users.findAll({
      where: {
        role: 'normal'
      },
      attributes: {
        exclude: ['password']
      }
    }
  )
  return data
}

const getUserById = async(id) => {
  
  const data = await Users.findOne({
    where: {
      id
    },
    attributes: {
      exclude: ['password']
    }
  })
  return data
  //? select * from users where id = ${id};
};

const createUser = async(data) => {
  const newUser =  await Users.create({
    id: uuid.v4(), 
    firstName: data.firstName, 
    lastName: data.lastName, 
    gender: data.gender,
    email: data.email, 
    password: hashPassword(data.password),  
    // birthdayDate: data.birthday_date,
    role: "normal", 
    country: data.country,
    status: 'active',
    verified: false,
  })
  // const newUserWithSpreadOperator =  await Users.create({
  //   ...data,
  //   id: uuid.v4(), 
  //   password: hashPassword(data.password), 
  //   role: "normal", 
  //   is_active: true,
  //   verified: false,
  // })
  return newUser

};
const editUser = async (userId, data) => {
  const { id, password, verified, role, ...restOfProperties } = data;

    const response = await Users.update(
      { ...restOfProperties},
      { where: { id: userId } }
    );
    return response;
  
  };

  const editUserAdmin = async (userId, data, role) => {
    const { id, password,  firstName, lastName, country, email, ...restOfProperties } = data;
      if (role === 'Admin'){
      const response = await Users.update(
        { ...restOfProperties},
        { where: { id: userId } }
      )
      return response;
    }
    


      }
const deleteUser = async (id) => {
  const data = await Users.destroy({
    where: {
      id: id
    }
  })
  return data
}

const getUserByEmail = async (email) => {
  const data = await Users.findOne({
    where: { email },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  return data;
}



module.exports = {
  createUser,
  getAllStudents,
  getAllUsers,
  getUserById,
  editUser,
  deleteUser,
  getUserByEmail,
  editUserAdmin
}