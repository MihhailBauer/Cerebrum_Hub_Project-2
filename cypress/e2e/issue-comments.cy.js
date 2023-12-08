const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
const comment = 'TEST_COMMENT';
const new_comment = 'edited_comment'

describe('Issue comments creating, editing and deleting', () => {
    visitBoardAndOpenSpecificIssue()


    it('Should create a comment successfully', () => {

        getIssueDetailsModal()
            cy.contains('Add a comment...')
                .click();

            cy.get('textarea[placeholder="Add a comment..."]').type(comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.contains('Add a comment...').should('exist');
            cy.get('[data-testid="issue-comment"]').should('contain', comment);


            cy.get('[data-testid="issue-comment"]')
                .first()
                .contains('Edit')
                .click()
                .should('not.exist');

            cy.get('textarea[placeholder="Add a comment..."]')
                .should('contain', comment)
                .clear()
                .type(new_comment);

            cy.contains('button', 'Save')
                .click()
                .should('not.exist');

            cy.get('[data-testid="issue-comment"]')
                .should('contain', 'Edit')
                .and('contain', new_comment);

            cy.get('[data-testid="issue-comment"]')
                .first()
                .contains('Delete')
                .click()

            cy.get('[data-testid="modal:confirm"]').should('be.visible')+
            ('have.text', "Are you sure you want to delete this comment? Once you delete, it's gone for good.");
            cy.get('[data-testid="modal:confirm"]')    
                .contains('button', 'Delete comment')
                .click()
                .should('not.exist');
    
            getIssueDetailsModal()
                .find('[data-testid="issue-comment"]')
                .should('not.contain', new_comment);           
    });   
});

function visitBoardAndOpenSpecificIssue() {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });
}