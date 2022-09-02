import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  display_name: { type: String, required: true },
  spotify_id : { type : String},
  email: { type: String, required: true },
  profile_image: { type: String },
  top_artists: { type: Array },
  artists_by_genre: {type: Object},
  tracks : {type: Array},
});

export default mongoose.model('User', userSchema);
