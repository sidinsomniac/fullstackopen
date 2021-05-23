import React, { useState } from 'react';

const Blog = ({ blog }) => {

  const [detailsVisible, setDetailsVisible] = useState(false);
  const toggleDetailsVisibility = () => {
    setDetailsVisible(!detailsVisible);
  };
  return (
    <div>
      {blog.title} {blog.author} <button onClick={toggleDetailsVisibility}>{detailsVisible ? 'hide' : 'view'}</button>
      {detailsVisible && (
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes} <button>like</button></p>
          <p>{blog.user.name}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;