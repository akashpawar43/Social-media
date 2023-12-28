import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Post() {
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

    const addComment = (e, postId) => {
        e.preventDefault();
        if (newComment.trim() !== '') {
            // Create a new comment object with the text and post ID
            const newCommentObj = {
                postId: postId,
                text: newComment,
            };

            // Update comments state using functional update to ensure proper handling
            setComments(prevComments => ({
                ...prevComments,
                [postId]: [...(prevComments[postId] || []), newCommentObj],
            }));
            setNewComment('');
        }
    }

    const [likes, setLikes] = useState({});

    const addLike = postId => {
        setLikes(prevLikes => ({
            ...prevLikes,
            [postId]: (prevLikes[postId] || 0) + 1,
        }));
    };
    return (
        <div className='w-full'>
            <div className=' container m-auto'>
                <div className='flex justify-end w-full'>
                    <Link to="/addpost">
                        <button className="mt-3 w-40 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Add Post
                        </button>
                    </Link>
                </div>

                <h1 className='w-full text-center text-xl font-semibold'>Posts</h1>
                {/* Display fetched posts */}
                {posts.map((post, i) => (
                    <div key={i} className="max-w-lg mx-auto mt-4 bg-white rounded-lg shadow-md">
                        {/* Display post title */}
                        <h2 className="text-2xl font-semibold p-4">{post.title}</h2>

                        {/* Display post image */}
                        <img src={post.imageUrl} alt="Post Image" className="w-full h-auto" />

                        <div key={i} className="p-4 flex flex-row justify-between align-middle items-center">
                            <h3 className="text-lg font-semibold mb-2">Likes: {likes[post.id] || 0}</h3>
                            <button onClick={() => addLike(post.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                                Like
                            </button>
                        </div>
                        {/* Like Button */}

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
                                <Link to="/">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                                    >
                                        Add Comment
                                    </button>
                                </Link>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Post;
