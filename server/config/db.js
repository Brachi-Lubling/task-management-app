import { connect } from 'mongoose'
export const connectDB = async () => {
  try {
    await connect("mongodb+srv://esty90509_db_user:byS1pB4lG7MHjYgj@cluster0.m21ujtl.mongodb.net/projectsManagerSystem", {
      ssl: true,
      retryWrites: true,
      w: "majority"
    })
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message)
  }
}