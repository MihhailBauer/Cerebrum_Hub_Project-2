describe('Issue details editing', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });


// Bonus nr2
  it.only('Checking that the reporter name has only characters in it', () => {

    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:reporter"]')
        .invoke('text').should('match', /^[A-Za-z\s]*$/)
    });
  });

  it('should validate priority dropdown values', () => {
    const priorities = ['Highest', 'High', 'Medium', 'Low', 'Lowest']
    const expectedLength = 4;
    let prioritiesArray = [];

    // Get the currently selected priority value
    const selectedPriorityValue = () => cy.get('[data-testid="select:priority"]').text('High');
    prioritiesArray.push(selectedPriorityValue);

    // Open the priority dropdown
    cy.get('[data-testid="select:priority"]').click();

    // Get all priority option elements
    const priorityOptions = cy.get('[data-testid="select:priority"]');

    // Loop through all priority options and add them to the array
    priorityOptions.each(($element) => {
      const priorityValue = $element.text();
      prioritiesArray.push(priorityValue);

      cy.log(`Added priority: ${priorityValue}, array length: ${prioritiesArray.length}`);
    });

    // Assert that the array length matches the expected length
    cy.assertEqual(prioritiesArray.length, expectedLength);

    // Close the priority dropdown
    cy.get('body').click();
  });

  it('Should update type, status, assignees, reporter, priority successfully', () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="select:type"]').click('bottomRight');
      cy.get('[data-testid="select-option:Story"]')
          .trigger('mouseover')
          .trigger('click');
      cy.get('[data-testid="select:type"]').should('contain', 'Story');

      cy.get('[data-testid="select:status"]').click('bottomRight');
      cy.get('[data-testid="select-option:Done"]').click();
      cy.get('[data-testid="select:status"]').should('have.text', 'Done');

      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('[data-testid="select:assignees"]').click('bottomRight');
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:assignees"]').should('contain', 'Baby Yoda');
      cy.get('[data-testid="select:assignees"]').should('contain', 'Lord Gaben');

      cy.get('[data-testid="select:reporter"]').click('bottomRight');
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:reporter"]').should('have.text', 'Pickle Rick');

      cy.get('[data-testid="select:priority"]').click('bottomRight');
      cy.get('[data-testid="select-option:Medium"]').click();
      cy.get('[data-testid="select:priority"]').should('have.text', 'Medium');
    });
  });

  it('Should update title, description successfully', () => {
    const title = 'TEST_TITLE';
    const description = 'TEST_DESCRIPTION';

    getIssueDetailsModal().within(() => {
      cy.get('textarea[placeholder="Short summary"]')
        .clear()
        .type(title)
        .blur();

      cy.get('.ql-snow')
        .click()
        .should('not.exist');

      cy.get('.ql-editor').clear().type(description);

      cy.contains('button', 'Save')
        .click()
        .should('not.exist');

      cy.get('textarea[placeholder="Short summary"]').should('have.text', title);
      cy.get('.ql-snow').should('have.text', description);
    });
  });

  const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
});
