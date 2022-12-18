const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.log("DB CONNECTED WOO YEA!!!!!!!")
  }catch (error) {
    console.log({error});
    //exit with failure..
    process.exit(1)
  }
}

module.exports = connectDB;