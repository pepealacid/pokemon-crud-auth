const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Username is required.'],
      lowercase: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    team: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: "Pokemon",
      }],
      // default: []
    }
  },
  {  
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
