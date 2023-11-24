
describe('Issue deletion', () => {
    beforeEveryTest()

    it('Should start delete issue procedure by pressing on "trash" icon', () => {
            cy.get('[data-testid="icon:trash"]').click();
            cy.contains('Delete issue').click();
            cy.get('[data-testid="modal:confirm"]').should('not.exist');
            cy.get('[data-testid="board-list:backlog"]').should('be.visible');
            cy.contains('This is an issue of type: Task.').should('not.exist');
    });

    it('Should be able to cancel delete issue procedure by pressing on "cancel" button', () => {
        cy.get('[data-testid="icon:trash"]').click();
        cy.contains('Cancel').click();
        cy.get('[data-testid="modal:confirm"]').should('not.exist');
        cy.get('[data-testid="icon:close"]').first().click();
        cy.contains('This is an issue of type: Task.').should('exist');
    });

});

function beforeEveryTest() {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //System will already open issue modal in beforeEach block
    cy.visit(url + '/board');
    cy.contains('This is an issue of type: Task.').click();
    cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    });
  });
}
