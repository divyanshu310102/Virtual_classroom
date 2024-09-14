import mongoose from 'mongoose'


const commentSchema = new mongoose.Schema({
    content: { 
        type: String, 
        required: true 
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    lecture: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Lecture', 
        required: true 
    },
    replies: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment' 
    }],
  });

  export const Comment = mongoose.model("Comment", commentSchema)