const { Model, DataTypes } = require('sequelize');

class Student extends Model {
  static init(connection) {
    super.init(
      {
        avatar: DataTypes.STRING,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        graduation: DataTypes.STRING,
      },
      {
        sequelize: connection,
      },
    );
  }
}
module.exports = Student;