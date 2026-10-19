import mongoose, { Schema } from 'mongoose'

const urlSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, 
        index: true
    },
    originalUrl:{
       type: String,
       required: true,
       trim: true,
       index: true
      
    },
    shortCode: {
       type: String,
       unique: true, // Prevents duplicate codes
       index: true,   // Extremely important for fast redirection
      
    },
    isActive: {
      type: Boolean,
      default: true
    },
    expireAt: Date,
    title: String,
    totalClicksOnUrl: Number
  

},{timestamps: true})



const Url = mongoose.model("Url" ,urlSchema)
export default Url