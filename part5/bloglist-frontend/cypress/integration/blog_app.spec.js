describe("Note app", function () {

    beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/reset/");
        const user = {
            name: "Siddhartha",
            username: "sid",
            password: "qwerty1234"
        };

        cy.request("POST", "http://localhost:3003/api/users/", user);
        cy.visit("http://localhost:3000");
    });

    it("Login form is shown", function () {
        cy.contains("Blogs");
        cy.get("#username");
        cy.get("#password");
    });

    describe("Login", function () {
        const loginUser = {};

        beforeEach(function () {
            loginUser.username = "sid";
        });

        it("succeeds with correct credentials", function () {
            loginUser.password = "qwerty1234";
            cy.login(loginUser);
            cy.contains("Siddhartha has logged in");
        });

        it("fails with wrong credentials", function () {
            loginUser.password = "wrong";
            cy.get("#username").type(loginUser.username);
            cy.get("#password").type(loginUser.password);
            cy.get("#login-button").click();
            cy.get(".error").contains("Unauthorized: invalid username or password");
            cy.get("html").should("not.contain", "Logged in Siddhartha successfully");
        });
    });

    describe.only("When logged in", function () {
        beforeEach(function () {
            cy.login({ username: "sid", password: "qwerty1234" });
            cy.createBlog({
                title: "The road not taken",
                author: "Robert Frost",
                url: "Beautiful poems"
            });
            cy.visit("http://localhost:3000");
        });

        it("a blog can be created", function () {
            cy.contains("New Blog").click();
            cy.get("#blog-title").type("How to steal a million");
            cy.get("#blog-author").type("Tapan Mitra");
            cy.get("#blog-url").type("www.tm.com");
            cy.get("#blog-form").submit();
            cy.get(".success").contains("How to steal a million by Tapan Mitra added");
            cy.get("html").should("not.contain", "Bad Request");
            cy.get("html").should("not.have.class", "error");
            cy.get(".blog").should("have.length", 2);
        });

        it.only("can like a blog", () => {
            cy.contains("view").click();
            cy.contains("like").as("likeButton");
            cy.get("@likeButton").parent().contains("0");
            cy.get("@likeButton").click();
            cy.get("@likeButton").parent().contains("1");
        });
    });
});