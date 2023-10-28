'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Title is required'
        },
        len: {
          args: [3, 255], 
          msg: 'Title must be between 3 and 255 characters'
        }
      }
    }
  }, {
    
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};