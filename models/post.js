// import sequelize model, and datatypes
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create Post model
class Post extends Model {}

// define table columns and configuration
Post.init(
  {
    // define an id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // define a title column
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // define a post_text column
    post_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means the post must be at least one character long
        len: [1]
      }
    },
    // define a user_id column
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        // this is a reference to the user model
        model: "user",
        key: "id"
      }
    }
  },
  {
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // automatically create createdAt/updatedAt timestamp fields
    timestamps: true,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: "post"
  }
);

// export Post model
module.exports = Post;
