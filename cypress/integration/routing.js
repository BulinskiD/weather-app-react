describe("Managing city list", ()=>{

    it("Should correctly navigate to details page and return", ()=> {
        cy.visit("http://localhost:3000");
        cy.wait(500);
        cy.get('input.col-lg-8').type('Gorlice');
        cy.get('button.btn-primary').click();

        cy.get('tr td:nth-child(2)').contains("Gorlice").click();
        cy.url().should('eq', 'http://localhost:3000/details/771804')
        cy.get('h2').contains("Gorlice");
        cy.get("a[href='/']").click();
        cy.url().should('eq', 'http://localhost:3000/')
    });

    it("Should correctly display units depending on settings", ()=> {
        cy.visit("http://localhost:3000");
        cy.wait(500);
        cy.get('input.col-lg-8').type('Gorlice');
        cy.get('button.btn-primary').click();

        cy.get('nav a').click();
        cy.url().should('eq', 'http://localhost:3000/settings');
        cy.get('.radios:nth-child(2) input').click();
        cy.get("a[href='/']").click();
        cy.get('tr td:nth-child(3)').contains("F");

        cy.get('nav a').click();
        cy.url().should('eq', 'http://localhost:3000/settings');
        cy.get('.radios:nth-child(1) input').click();
        cy.get("a[href='/']").click();
        cy.get('tr td:nth-child(3)').contains("C");
    });
});
