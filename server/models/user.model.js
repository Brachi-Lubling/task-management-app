import { model,Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, 'name must contain at least 3 characters']
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'password must contain at least 6 characters']
    }
  },
  { timestamps: true }
);

const User = model('user', userSchema);
export default User;