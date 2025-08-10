import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import PostTitles from '../components/PostTitles';
import CreatePost from '../components/CreatePost';
import url from '../url';

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchData();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${url}/Postfetch`);
            setPosts(response.data.posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container py-4" style={{ backgroundColor: "#f0f4ff" }}>
            <div className="row mb-4">
                <div className="col-md-12">
                    <CreatePost onRefresh={onRefresh} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <PostTitles type="posts" posts={posts} />
                </div>
            </div>
        </div>
    );
};

export default Post;