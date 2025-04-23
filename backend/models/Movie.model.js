import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // TMDB ID
  title: { type: String, required: true },
  poster_path: String,
  overview: String,
  release_date: String,
  runtime: Number,
  vote_average: Number,
  genres: [{
    id: Number,
    name: String
  }],
  addedBy: { // Track who added the movie
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

export default mongoose.model('Movie', MovieSchema);