const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const streamerSchema = new Schema({
    curr: { type: String,},
    created_at: Date,
});

streamerSchema.pre('save', function(next) {
    this.created_at = new Date();
    next();
});
  
const streamer = mongoose.model('streamer', streamerSchema);
  
module.exports = streamer;