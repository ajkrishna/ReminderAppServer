const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/EventList',{
useNewUrlParser:true, 
useUnifiedTopology: true
})
const Event=mongoose.model('Event',{
    uid:Number,
    username:String,
    password:String,
    events:[]
})

module.exports={
    Event
}