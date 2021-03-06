import React, { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {

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

  const removeBlog = async () => {
    const { id, title, author } = blog;
    if (window.confirm(`Remove blog ${title} by ${author}?`)) {
      await deleteBlog(id);
    }
  };

  return (
    <div className="blog">
      {blog.title} {blog.author} <button className="toggle-button" onClick={toggleDetailsVisibility}>{detailsVisible ? "hide" : "view"}</button>
      {detailsVisible && (
        <div>
          <p>{blog.url}</p>
          <p className="likes"><span>{blog.likes}</span> <button onClick={updateLikes} className="like-button">like</button></p>
          <p>{blog.user.name}</p>
          {user.username === blog.user.username && <button onClick={removeBlog}>remove</button>}
        </div>
      )}
    </div>
  );
};

export default Blog;