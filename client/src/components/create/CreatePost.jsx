import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        if (file) {
            const getImage = async () => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append("name", file.name);
                try {
                    const response = await axios.post('http://localhost:8000/file/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    alert('Image uploaded successfully');
                    post.picture = response.data;
                    // setPost(prevPost => ({
                    //     ...prevPost,
                    //     categories: location.search?.split('=')[1] || 'All',
                    //     username: account.username
                    // }));
                    setPost(prevPost => ({
                        ...prevPost,
                        picture: response.data
                    }));
                } catch (error) {
                    console.error('Error uploading image: ', error);
                }
            }
            getImage();
            // post.categories = location.search?.split('=')[1] || 'All';
            // post.username = account.username;
            setPost(prevPost => ({
                ...prevPost,
                categories: location.search?.split('=')[1] || 'All',
                username: account.username
            }));
        } // eslint-disable-next-line
    }, [file, location.search, account.username]);


    const savePost = async () => {
        let response = await API.createPost(post);
        if(response.isSuccess){
            navigate('/');
        }
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Container>
            <Image src={url} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(e)}
                />
                <InputTextField onChange={(e) => handleChange(e)} name='title' placeholder="Title" />
                <Button onClick={() => savePost()} variant="contained" color="primary">Publish</Button>
            </StyledFormControl>

            <Textarea
                rowsmin={5}
                placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)}
            />
        </Container>
    )
}

export default CreatePost;