import mongoose from 'mongoose';


const lectureSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    session: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Session', 
        required: true 
    },
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment' 
    }],
  });

  export const Lecture = mongoose.model("Lecture", lectureSchema)