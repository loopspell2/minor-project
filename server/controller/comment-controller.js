import Comment from '../model/comment.js';


export const newComment = async (req, res) => {
    try{
        const comment = await new Comment(req.body);
        comment.save();
        res.status(200).json({message: 'Comment added successfully'});
    }catch(error){
        res.status(500).json({message: 'An error occur while adding comment'});
    }
}


export const getComments = async (req, res) => {
   try{
        const comments = await Comment.find({postId: req.params.id});
        res.status(200).json(comments);
   }catch(error){
        res.status(500).json({msg:error.message})
   }
}


export const deleteComment = async (req, res) => {
    try{
        let response = await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Comment deleted successfully'});
    }catch(error){
        res.status(500).json({message: 'An error occur while deleting comment'});
    }
}