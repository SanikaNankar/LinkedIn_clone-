import React, { useState } from 'react';
import { postArticle } from '../firebase/api';

const YourComponent = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const article = { title, content, createdAt: new Date() };
    try {
      await postArticle(article, imageFile);
      alert('Article posted successfully!');
      // Clear the form
      setTitle('');
      setContent('');
      setImageFile(null);
    } catch (error) {
      alert('Failed to post article');
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />
      <button type="submit">Post Article</button>
    </form>
  );
};

export default YourComponent;
