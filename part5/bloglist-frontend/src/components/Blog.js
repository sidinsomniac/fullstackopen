import React, { useState } from 'react';

const Blog = ({ blog, updateBlog }) => {

  const [detailsVisible, setDetailsVisible] = useState(false);
  const toggleDetailsVisibility = () => {
    setDetailsVisible(!detailsVisible);
  };

  const updateLikes = async () => {
    const { likes, id: blogId, user: { _id: userId } } = blog;
    const updatedBlog = {
      ...blog,
      likes: likes + 1,
      user: userId
    };
    await updateBlog(updatedBlog, blogId);
  };

  return (
    <div>
      {blog.title} {blog.author} <button onClick={toggleDetailsVisibility}>{detailsVisible ? 'hide' : 'view'}</button>
      {detailsVisible && (
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes} <button onClick={updateLikes}>like</button></p>
          <p>{blog.user.name}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;