import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import CommentBox from '../components/CommentBox';
import PostTitles from '../components/PostTitles';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import url from '../url';

const PostDetails = () => {
    const { postId } = useParams();
    const [post, setPost] = useState();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${url}/PostId?postId=${postId}`);
                const data = await response.data;
                if (response.status) {
                    setPost(data);
                } else {
                    console.error("Error fetching post:", data.message);
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };
        fetchPost();
    }, [postId]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${url}/Commentfetch?postId=${postId}`);
                const data = await response.data;
                if (response.status) {
                    setComments(data.comments);
                } else {
                    console.error("Error fetching comments:", data.message);
                }
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchComments();
    }, [postId]);

    const formatDate = (dateString) => {
        let distance = formatDistanceToNow(new Date(dateString), {
            addSuffix: true,
        });
        distance = distance.replace("about ", "");
        return distance;
    };

    if (!post) {
        return <div className="text-center py-5">Loading...</div>;
    }

    const handleCommentSubmission = async (commentData) => {
        try {
            const response = await axios.post(`${url}/Comment`, commentData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = response.data;

            toast.success('Replied!', {
                position: 'top-right',
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: setTimeout(function () { window.location.reload(1); }, 1500)
            });
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    return (
        <div className="container py-4" style={{ backgroundColor: "#f0f4ff" }}>
            <div className="row mb-4">
                <div className="col-md-12">
                    <PostTitles type="post" posts={[post]} />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-12">
                    <CommentBox postId={postId} type="comment" onCommentSubmit={handleCommentSubmission} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <PostTitles type="comment" posts={comments} />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PostDetails;
