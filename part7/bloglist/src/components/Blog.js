import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";


const Blog = ({ updateBlog, deleteBlog }) => {


  const id = useParams().id;
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id));
  console.log(blog);

  if (!blog) return null;
  const user = useSelector(state => state.user);

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
      <div>
        <h1>{blog.title}</h1>
        <a href={"http://" + blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
        <p className="likes"><span>{blog.likes}</span> <button onClick={updateLikes} className="like-button">like</button></p>
        <p>added by {blog.user.name}</p>
        {user.username === blog.user.username && <button onClick={removeBlog}>remove</button>}
      </div>
    </div>
  );
};

export default Blog;