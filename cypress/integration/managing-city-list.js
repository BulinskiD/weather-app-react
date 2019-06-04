describe("Managing city list", ()=>{
   it("Should add city to table", ()=> {
       cy.visit("http://localhost:3000");
       cy.wait(500);
       cy.get('input.col-8').type('Gorlice');
       cy.get('button.btn-primary').click();

       cy.get('tr td:nth-child(2)').contains("Gorlice");
   });

    it("Should show modal when incorrect city was typed", ()=> {
        cy.visit("http://localhost:3000");
        cy.wait(500);
        cy.get('input.col-8').type('Incorrect city');
        cy.get('button.btn-primary').click();

        cy.get(".modal-body").contains("Nie znaleziono miasta");
    });

    it("Should show modal when city from list was typed again", ()=> {
        cy.visit("http://localhost:3000");
        cy.wait(500);
        cy.get('input.col-8').type('Gorlice');
        cy.get('button.btn-primary').click();

        cy.get('tr td:nth-child(2)').contains("Gorlice");

        cy.get('input.col-8').type('Gorlice');
        cy.get('button.btn-primary').click();

        cy.get(".modal-body").contains("Miasto znajduje się już na liście!");
    });

    it("Should remove city from list after click on delete button", ()=> {
        cy.visit("http://localhost:3000");
        cy.wait(500);
        cy.get('input.col-8').type('Gorlice');
        cy.get('button.btn-primary').click();

        cy.get('tr td:nth-child(2)').contains("Gorlice");
        cy.get('tr button').click();

        cy.get('tbody tr').should('not.exist');
    });
});
