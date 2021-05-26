import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("blog form calls the event handler prop with right details when a new blog created", () => {
    const postBlog = jest.fn();
    const component = render(
        <BlogForm postBlog={postBlog} />
    );
    const blogTitle = component.container.querySelector("#blog-title");
    const blogAuthor = component.container.querySelector("#blog-author");
    const blogUrl = component.container.querySelector("#blog-url");
    const blogForm = component.container.querySelector("form");

    fireEvent.change(blogTitle, {
        target: {
            value: "All night it rained"
        }
    });
    fireEvent.change(blogAuthor, {
        target: {
            value: "James McAvoy"
        }
    });
    fireEvent.change(blogUrl, {
        target: {
            value: "www.nightrainer.com"
        }
    });
    fireEvent.submit(blogForm);

    expect(postBlog.mock.calls).toHaveLength(1);
    expect(postBlog.mock.calls[0][0].title).toBe("All night it rained");
    expect(postBlog.mock.calls[0][0].author).toBe("James McAvoy");
    expect(postBlog.mock.calls[0][0].url).toBe("www.nightrainer.com");
});