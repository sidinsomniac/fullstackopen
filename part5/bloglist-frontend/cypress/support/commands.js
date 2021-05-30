/* eslint-disable linebreak-style */
Cypress.Commands.add("login", ({ username, password }) => {
    cy.request("POST", "http://localhost:3003/api/login", { username, password }).then(({ body }) => {
        localStorage.setItem("loggedBlogAppUser", JSON.stringify(body));
    });
    cy.visit("http://localhost:3000");
});

Cypress.Commands.add("createBlog", ({ title, author, url }) => {
    cy.request({
        method: "POST",
        url: "http://localhost:3003/api/blogs",
        body: { title, author, url },
        headers: {
            "Authorization": `bearer ${JSON.parse(localStorage.getItem("loggedBlogAppUser")).token}`
        }
    });
});