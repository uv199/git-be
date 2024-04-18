import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide last name"],
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      trim: true,
      lowercase: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Email is not proper",
      },
    },
    contactNo: {
      type: String,
      required: [true, "Please provide number"],
      trim: true,
      validate: {
        validator: (value) => validator.isMobilePhone(value),
        message: "Phone number is not proper",
      },
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      validate: {
        validator: (value) => validator.isStrongPassword(value),
        message: "Please provide a strong password",
      },
    },
    gitUserName: {
      type: String,
      required: [true, "Please provide git user name"],
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash the password
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

// Method to validate password
userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to remove sensitive fields from the user object
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.__v;

  return userObject;
};

export const User = mongoose.model("User", userSchema);
