// import sequelize model, and datatypes
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create Comment model
class Comment extends Model {}

// define table columns and configuration
Comment.init(
  {
    // define an id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // define a comment_text column
    comment_text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        // this means the comment must be at least one character long
        len: [1]
      }
    },
    // define a post_id column
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        // this is a reference to the post model
        model: "post",
        key: "id"
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
    updatedAt: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: "comment"
  }
);

// export Comment model
module.exports = Comment;
