import React, { useRef, useState } from "react";
import Togglable from "./Togglable";

const BlogForm = ({ postBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const blogFormRef = useRef();

  const addBlog = async event => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    const newBlog = { title, author, url };
    await postBlog(newBlog);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <Togglable buttonLabel={"New Blog"} ref={blogFormRef}>
      <form onSubmit={addBlog}>
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
    </Togglable>
  );
};

export default BlogForm;