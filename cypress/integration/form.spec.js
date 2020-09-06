describe("signing a petition", () => {
    it("redirect to thank you page after filling the form", () => {
        cy.visit("/petition");
        // cy.get("form");

        cy.get('input[name="firstName"]').type("ssssunknown");
        cy.get('input[name="lastName"]').type("unused");
        cy.get("canvas").trigger("mousedown").click(100, 100, { force: true });

        cy.get("form").submit();

        cy.url().should("eq", "http://localhost:8080/thanks");

        cy.get("h3").contains(
            "Thank you for signing our petition to make Education free for all!"
        );
    });
    it("display error when there are missing field", () => {
        cy.visit("/petition");
        cy.get("form").submit();
        cy.contains("Please provide your first name");
        cy.contains("Please provide your last name");
        cy.contains("Please sign the petition");
    });
});
