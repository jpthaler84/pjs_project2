module.exports = function(sequelize, DataTypes) {
  var Thread = sequelize.define("Thread", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    category: {
      type:DataTypes.STRING,
      defaultValue: "Personal"
    }
  });
  return Thread;
};