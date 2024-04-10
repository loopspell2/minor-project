import Post from '../model/post.js';

export const createPost = async (req, res) => {
    try {
        console.log(req.body);
        const newPost =await new Post(req.body);
        await newPost.save();

        return res.status(200).json(newPost); // Return the created post
    } catch (err) {
        return res.status(500).json(err);
    }
};

export const getAllPosts = async (req, res) => {
    let category = req.query.category;
    let posts;
    try{
        if(category){
            posts = await Post.find({categories:category});
        }else{
            posts = await Post.find();
        }
        return res.status(200).json(posts);
    }catch(err){
        return res.status(500).json(err);
    }
}

export const getPost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    }catch(err){
        return res.status(500).json({msg: err.massage});
    }
}


export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const updatedData = req.body;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        await Post.findByIdAndUpdate(postId, { $set: updatedData });

        return res.status(200).json({ msg: "Post updated successfully" });
    } catch (error) {
        console.error("Error updating post:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if (!post) {
            return response.status(404).json('post not found');
        }
        
        await Post.findByIdAndDelete(request.params.id);

        response.status(200).json('post deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}