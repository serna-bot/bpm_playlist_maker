import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  display_name: { type: String, required: true },
  email: { type: String, required: true },
  profile_image: { type: String },
  top_artists: {type: Array },
});

export default mongoose.model('User', userSchema);
