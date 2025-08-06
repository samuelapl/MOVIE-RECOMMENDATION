import User from './models/User.js';
import Movie from './models/Movie.model.js';

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

        Mutation:{
            
            addToFavorites: async(parent,arges, context)=>{

            }
        }
    }
}