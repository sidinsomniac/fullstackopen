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

        it.only("fails with wrong credentials", function () {
            loginUser.password = "wrong";
            cy.get("#username").type(loginUser.username);
            cy.get("#password").type(loginUser.password);
            cy.get("#login-button").click();
            cy.get(".error").contains("Unauthorized: invalid username or password");
            cy.get("html").should("not.contain", "Logged in Siddhartha successfully");
        });
    });
});