import { model, Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [3, 'title must contain at least 3 characters']
    },
    description: {
      type: String,
      required: true,
      minlength: [3, 'description must contain at least 3 characters']
    },
    status: {
      type: String,
      enum: ['to do', 'in progress', 'done'],
      default: 'to do'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    dueDate: {
      type: Date,
      required: true
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'project',
      required: true
    }
  },
  { timestamps: true }
);

const Task = model('task', taskSchema);
export default Task;
