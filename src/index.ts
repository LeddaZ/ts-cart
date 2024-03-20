import app from './app'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const connString = process.env.CONNECTION_STRING ?? ''
const port = process.env.PORT

mongoose
  .connect(connString)
  .then((_) => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
