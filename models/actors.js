
module.exports = function(sequelize, DataTypes) {
    var Actors = sequelize.define("Actors", {
      // Giving the Author model a name of type STRING
      Actor_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      Gender: {
        type: DataTypes.STRING,
        allowNull: true,
        len: [4-6]
      }
    });
  
    // Actors.associate = function(models) {
    //   // Associating Author with Posts
    //   // When an Author is deleted, also delete any associated Posts
    //   Actors.hasMany(models.Movies, {
    //     onDelete: "cascade"
    //   });
    // };
  
    return Actors;
  };

  //please update