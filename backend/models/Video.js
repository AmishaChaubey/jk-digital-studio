const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Video = sequelize.define('Video', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  videoUrl: { type: DataTypes.STRING, allowNull: false },
  thumbnail: { type: DataTypes.STRING },
  service: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Video;