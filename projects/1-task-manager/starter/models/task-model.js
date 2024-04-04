const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    name: {
        type:String, required: [true, 'must provide a name'], trim:true, maxlength:[20, 'name cannot exceed 20 chars']
    },
    completed: {type:Boolean, default:false}
},{ collection: 'taskmanager'} );
module.exports = mongoose.model('taskmanager', TaskSchema);