import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  display_name: { type: String, required: true },
  email: { type: String, required: true },
  profile_picture: { type: String },
  top_artists: {type: Array },
  id: { type: String },
});

export default mongoose.model('User', userSchema);
