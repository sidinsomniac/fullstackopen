import React, { useRef, useState } from "react";
import Togglable from "./Togglable";
import { Button } from "react-bootstrap";

const CommentForm = ({ blogId, postComment }) => {

  const [comment, setComment] = useState("");

  const blogFormRef = useRef();

  const addComment = async event => {
    event.preventDefault();
    console.log({ comment, blogId });
    const newComment = {
      text: comment
    };
    await postComment(blogId, newComment);
    blogFormRef.current.toggleVisibility();
    setComment("");
  };

  return (
    <Togglable buttonLabel={"add comment"} ref={blogFormRef}>
      <form id="blog-form" onSubmit={addComment}>
        <div>
          <div>
            <label>
              Title
              <input type="text" id="blog-title"
                value={comment}
                onChange={({ target }) => setComment(target.value)}
              />
            </label>
          </div>
        </div>
        <Button variant="info" type="submit">Add Comment</Button>
      </form>
    </Togglable>
  );
};

export default CommentForm;