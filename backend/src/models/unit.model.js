import mongoose from 'mongoose'



const unitSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    class: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Class', required: true 
    },
    sessions: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Session' }],
  });

  export const Unit = mongoose.model("Unit", unitSchema)