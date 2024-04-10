import mongoose from 'mongoose';

// Define the schema for a post
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: [String], // Changed to array of strings
        required: false
    },
    picture: {
        type: String,
        required: false
    },
    createdDate: {
        type: Date
    }
});

// Create the Post model based on the schema
const Post = mongoose.model('post', postSchema);

// Export the Post model
export default Post;
