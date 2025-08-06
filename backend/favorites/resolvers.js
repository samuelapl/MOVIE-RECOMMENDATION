import User from '../models/User.js';
import Movie from '../models/Movie.model.js';

const resolvers={
    Query:{
        getFavorites: async(parent,args,context)=>{
            try{
                const user = await User.findById(context.user.id).populate('favorites');

                if(!user){
                    throw new Error('User not found');

                }

                return user;

            }catch(error){
                throw new Error("Error fetching favorites:"+ error.message);

            }

        }
     
    },


     Mutation: {


    addToFavorites: async (parent, { movieId }, context) => {
      try {
        const movie = await Movie.findOne({ id: movieId });
        if (!movie) {
          throw new Error('Movie not found');
        }

        const user = await User.findById(context.user.id);
        if (!user) {
          throw new Error('User not found');
        }

        if (user.favorites.includes(movie._id)) {
          throw new Error('Movie already in favorites');
        }

        user.favorites.push(movie._id);
        await user.save();

        const updatedUser = await user.populate('favorites');
        return updatedUser;
      } catch (error) {
        throw new Error('Error adding to favorites: ' + error.message);
      }
    },

    removeFromFavorites: async (parent, { movieId }, context) => {
      try {
        const movie = await Movie.findOne({ id: movieId });
        if (!movie) {
          throw new Error('Movie not found in database');
        }

        const user = await User.findByIdAndUpdate(
          context.user.id,
          { $pull: { favorites: movie._id } },
          { new: true }
        ).populate('favorites');

        if (!user) {
          throw new Error('User not found');
        }

        return user;
      } catch (error) {
        throw new Error('Error removing from favorites: ' + error.message);
      }
    },
  }

}

export default resolvers