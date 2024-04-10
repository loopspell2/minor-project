const url = 'http://localhost:8000'
import Grid from 'gridfs-stream';
import mongoose from 'mongoose';
import { createConnection, mongo } from 'mongoose';

const mongoURI = `mongodb+srv://jwt:jwt@cluster0.d5vrhxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


let gfs, gridfsBucket;
const conn = createConnection(mongoURI);
conn.once('open', () => {
  gridfsBucket = new mongo.GridFSBucket(conn.db, {
    bucketName:'fs'
  });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('fs');
})

export const uploadImage = async (request, response) => {
    if (!request.file)
        return response.status(404).json("File not found");

    const imageUrl = `${url}/file/${request.file.filename}`;

    response.status(200).json(imageUrl);
}

export const getImage = async (req, res) => {
    try{
        const file = await gfs.files.findOne({filename: req.params.filename});
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
      }catch(err){
        return res.status(500).json({error: err.message})
      }
}