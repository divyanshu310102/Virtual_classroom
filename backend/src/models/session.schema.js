import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    unit: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Unit', 
        required: true 
    },
    lectures: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Lecture' 
    }],
  });

  export const Session = mongoose.model("Session", sessionSchema)