import { useState } from 'react';

function AddPost() {
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [newPostAdded, setNewPostAdded] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, imageUrl, description }),
            });

            if (!response.ok) {
                throw new Error('Failed to add post');
            }

            setNewPostAdded(true);
            setTitle('');
            setImageUrl('');
            setDescription('');
        } catch (error) {
            console.error('Error adding post:', error);
            // Handle error scenarios
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-8">
            <h1 className="text-3xl font-semibold mb-4">Add New Post</h1>
            {newPostAdded && (
                <p className="bg-green-100 text-green-800 rounded-md p-2 mb-4">
                    New post added successfully!
                </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 h-32 resize-none"
                        required
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-700">Image URL:</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Add Post
                </button>
            </form>
        </div>
    );
}

export default AddPost;
