import mongoose, { Schema } from 'mongoose'

const clickSchema = new Schema({
    url: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Url",
      required: true
    },
    browser: String,  // chrome , firefox etc.  
    deviceType: String, // mobile, tab , laptop
    operatingSystem: String,  // window, android, mac, iphone

    country: String,  // india 
    region: String,   // UP, MP, 
    city: String,

    referredDomain: String // from instagram, fb , x.com
    
  },
  {
    timestamps: true
  }
);

const Click = mongoose.model("Click", clickSchema)
export default Click