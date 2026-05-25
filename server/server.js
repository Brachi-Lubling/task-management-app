import server from "./app.js"
import { connectDB } from "./config/db.js"

const start = async () => {
  try {
    await connectDB()
    console.log('Connected to MongoDB')
    
    server.listen(5000, () => {
      console.log('Server running on http://localhost:5000')
    })
  } catch (err) {
    console.error('Failed to start server:', err.message)
    process.exit(1)
  }
}

start()