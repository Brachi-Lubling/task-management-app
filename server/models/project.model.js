import { model, Schema } from "mongoose";

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, 'name must contain at least 3 characters']
    },
    description: {
      type: String,
      required: true,
      minlength: [3, 'description must contain at least 3 characters']
    }
  },
  { timestamps: true }
);

const Project = model('project', projectSchema);
export default Project;
