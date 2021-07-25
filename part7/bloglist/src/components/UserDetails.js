import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ListGroup, Card } from "react-bootstrap";

function UserDetails() {
    const id = useParams().id;
    const user = useSelector(state => state.users.find(user => user.id === id));
    if (!user) return null;
    return (
        <div>
            <h2>{user.name}</h2>
            <h3>Added Blogs</h3>
            <Card>
                {user.blogs.map(blog => (
                    <ListGroup.Item key={blog.id}>
                        {blog.title}
                    </ListGroup.Item>
                ))}
            </Card>
        </div>
    );
}

export default UserDetails;