const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Photo = sequelize.define('Photo', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  imageUrl: { type: DataTypes.STRING, allowNull: false },
  service: {
    type: DataTypes.ENUM(
      'wedding', 'babyshoot', 'birthday', 'portrait',
      'maternity', 'corporate', 'fashion', 'prewedding'
    ),
    allowNull: false,
  },
  pageType: {
    type: DataTypes.ENUM('gallery', 'service', 'both'),
    defaultValue: 'both',
    allowNull: false,
  },
});

module.exports = Photo;