//* Dependencias
const express = require("express");
const app = express()
const cors = require('cors');
const passport = require("passport");
require("./middleware/auth.middleware")(passport);
const path = require('path')
//*Archivos de rutas
const userRouter = require("./users/users.router").router;
const authRouter = require("./auth/auth.router").router;
const taskRouter = require("./task/task.router").router;
const initModels = require("./models/initModels")
const defaultData = require("./utils/defaultData")
const swaggerDoc = require("./swagger.json")
const swaggerUI = require("swagger-ui-express")


app.use(cors())
app.use(express.json());



//* Configuraciones iniciales

const {db} = require('./utils/database')

//* Configuraciones iniciales


initModels()
// db.authenticate()
//   .then(() => console.log('Database Authenticated'))
//   .catch(err => console.log(err))
//   if(process.env.NODE_ENV === 'production'){
//     db.sync() 
//       .then(() => {
//         console.log('Database synced')
      //  defaultData()
//       })
//       .catch(err => console.log(err))
//      } 
//       else{
//     db.sync({force:true})
//       .then(() => {
//         console.log('Database synced')
//         defaultData()
//       })
//       .catch(err => console.log(err))
//     }

//? Esta configuracion es para habilitar el req.body





//app.use(cors()); ALSO TRIED THIS





app.get("/", (req, res) => {
  res.status(200).json({ message: "All ok!" });
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/task", taskRouter);
app.use("/v1/doc", swaggerUI.serve, swaggerUI.setup(swaggerDoc))




app.get("/api/v1/uploads/:imgName", (req ,res) => {
  const imgName = req.params.imgName;
  res.status(200).sendFile(path.resolve('uploads/') + '/' +imgName)
})

app.get("/ejemplo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res
      .status(200)
      .json({
        message: "Felicidades, tienes credenciales para entrar aqui",
        email: req.user.email,
      });
  }
);

app.listen(8000, () => {
  console.log("Server started at port 8000");
});

exports.default = app
exports.app = app
module.exports = app