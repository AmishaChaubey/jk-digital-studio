// models/Admin.js
// module.exports = (sequelize, DataTypes) => {
//   return sequelize.define("Admin", {
//     email: {
//       type: DataTypes.STRING,
//       unique: true,
//       allowNull: false
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   });
// };

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Admin = sequelize.define("Admin", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Admin;