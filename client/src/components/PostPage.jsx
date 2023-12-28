import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PostPage() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        // Function to fetch posts from the backend
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/posts'); // Replace '/api/posts' with your endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const parsedData = await response.json();
                setPosts(parsedData); // Assuming the response contains an array of posts
                console.log(parsedData)
            } catch (error) {
                console.error('Error fetching posts:', error);
                // Handle error scenarios (display error message, retry logic, etc.)
            }
        };

        fetchPosts(); // Call the fetchPosts function when the component mounts
    }, []); // Empty dependency array to fetch posts only once when the component mounts



    // Function to fetch comments for the post
    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/posts/${id}/comments`);
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
            // Handle error scenarios
        }
    }
    useEffect(() => {
        fetchComments(); // Fetch comments when the component mounts or when postId changes
    }, []);

    const addComment = async (e) => {
        const [newComment, setNewComment] = useState('');
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/posts/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment: newComment }),
            });

            if (!response.ok) {
                throw new Error('Failed to add comment');
            }

            setNewComment('');
            fetchComments(); // Refetch comments after adding a new comment
        } catch (error) {
            console.error('Error adding comment:', error);
            // Handle error scenarios
        }
    };

    return (
        <div>
            <div className='w-full'>
                <Link to="/addpost">
                    <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Add Post
                    </button>
                </Link>
            </div>

            <h1>Posts</h1>
            {/* Display fetched posts */}
            {posts.map((post, i) => (
                <Link to={`/post/${post.id}`}>
                    <div key={i} className="max-w-lg mx-auto mt-4 bg-white rounded-lg shadow-md">
                        {/* Display post title */}
                        <h2 className="text-2xl font-semibold p-4">{post.title}</h2>

                        {/* Display post image */}
                        <img src={post.imageUrl} alt="Post Image" className="w-full h-auto" />

                        {/* Display comments */}
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">Comments</h3>
                            {comments[post.id] && comments[post.id].map((comment, index) => (
                                <p key={index} className="mb-2">
                                    {comment.text}
                                </p>
                            ))}
                            {/* Add Comment Form */}
                            <form onSubmit={(e) => addComment(e, post.id)} className="flex items-center mt-4">
                                <input
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Add a comment..."
                                    className="flex-1 border rounded-md py-2 px-4 mr-2 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                                >
                                    Add Comment
                                </button>
                            </form>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default PostPage;
