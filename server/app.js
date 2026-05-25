import express from 'express'
import cors from 'cors'

const app = express()

// Disable caching / ETags
app.set('etag', false)

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.set('Pragma', 'no-cache')
  res.set('Expires', '0')
  res.removeHeader('etag')
  next()
})

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running')
})

export default app