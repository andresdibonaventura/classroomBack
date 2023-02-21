const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

const Users = require('../models/user.model');
const Teacher = require("../models/teacherModels");


paypal.configure({
  mode: 'sandbox',
  client_id: 'Ae2KTa0ca7VyuTHl659s7ffe7hVylTZb8RYIPpb31yTbt1b-70S_3RJrd_K_pPmpgGTifZ0UpRXSu94-',
  client_secret: 'ECUWM4ga6l2VISC592uUbQE2iLsaIeQvbuZzHDyzE6fLKlCktm5tOZc6TST3ITRQI23IpeyvbR5k1Bd1'
});

const paypal = (amount, description) => {
  return new Promise((resolve, reject) => {
    const paymentData = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      transactions: [{
        amount: {
          total: amount,
          currency: 'USD'
        },
        description: description
      }],
      redirect_urls: {
        return_url: 'https://classroom-ef3j.onrender.com/api/v1/success',
        cancel_url: 'https://classroom-ef3j.onrender.com/api/v1/cancel'
      }
    };
    
    paypal.payment.create(paymentData, (error, payment) => {
      if (error) {
        reject(error);
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            resolve(payment.links[i].href);
            break;
          }
        }
      }
    });
  });
};
//4699884184

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




const createTeacher = async (data) => {
  
const newUser = await Teacher.create({
  id: uuid.v4(), 
  firstName: data.firstName, 
  lastName: data.lastName, 
  gender: data.gender,
  email: data.email, 
  password: hashPassword(data.password),  
  // birthdayDate: data.birthday_date,
  country: data.country,
  verificationCode: data.verificationCode,
  status: 'active',
  verified: false,
})


  return newUser

}

const getAllStudents = async () => {
  const data = await Users.findAll({
    
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

const getTeacherById = async(id) => {
  
  const data = await Teacher.findOne({
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

const getTeacherByEmail = async (email) => {
  const data = await Teacher.findOne({
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
  editUserAdmin,
  createTeacher,
  getTeacherByEmail,
  getTeacherById,
  processPayment
}