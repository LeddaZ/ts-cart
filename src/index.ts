import app from './app'
import mongoose from 'mongoose'

mongoose
  .connect('mongodb://127.0.0.1:27017/ts-express')
  .then((_) => {
    const port = 3000
    app.listen(port, () => {
      console.log(`Server started on port ${port}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
