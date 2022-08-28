describe('shared-ui: CardChoice component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=cardchoice--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to CardChoice!');
    });
});
