import React, { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ fetchBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const postBlog = async event => {
    event.preventDefault();
    try {
      const newBlog = { title, author, url };
      const response = await blogService.createBlog(newBlog);
      setTitle("");
      setAuthor("");
      setUrl("");
      await fetchBlogs();
      console.log(response);
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <form onSubmit={postBlog}>
      <div>
        <div>
          <label>
            Title
              <input type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Author
              <input type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Url
              <input type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default BlogForm;