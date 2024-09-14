import mongoose from 'mongoose'

const classSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
},
  description: { 
    type: String, 
    required: true 
},
  instructor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', required: true 
},
  units: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Unit' 
}],
  enrolledStudents: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
}],
},{timestamps:true});

export const Class = mongoose.model("Class",classSchema)