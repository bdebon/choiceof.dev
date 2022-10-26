import '@testing-library/cypress/add-commands'

import { questions } from '@benjamincode/shared/assets'

describe('devchoices-next', () => {
  it('should redirect to an existing question page when visiting home page', () => {
    cy.visit('/')

    cy.url()
      .should('contain', '/question/')
      .then((url) => {
        const pathname = new URL(url).pathname
        const match = pathname.match(new RegExp('^/question/(?<slug>.*)/$'))
        const slug = match.groups.slug
        const question = questions.find((question) => question.slug === slug)

        expect(question).to.exist
      })
  })

  it('should display question when visiting question page', () => {
    const question = questions[0]

    cy.visit(`/question/${question.slug}`)

    cy.findByRole('heading', { name: question.choiceLeft.title }).should('exist')
    cy.findByRole('img', { name: 'illustration for left choice' }).should(
      'have.attr',
      'src',
      question.choiceLeft.img_path
    )

    cy.findByRole('heading', { name: question.choiceRight.title }).should('exist')
    cy.findByRole('img', { name: 'illustration for right choice' }).should(
      'have.attr',
      'src',
      question.choiceRight.img_path
    )
  })

  it('should display percentages and votes when answering a question', () => {
    const question = questions[0]

    cy.visit(`/question/${question.slug}`)

    cy.findByRole('heading', { name: question.choiceRight.title }).click()

    cy.findAllByText(/%/).should('have.length', 2)
    cy.findAllByText(/votes/i).should('have.length', 2)
  })

  it('should display next question when clicking next question button', () => {
    const question = questions[0]

    cy.visit(`/question/${question.slug}`)

    cy.findByRole('heading', { name: question.choiceRight.title }).click()
    cy.findByRole('button', { name: /next question/i }).click()

    cy.url().should('contain', '/question/').should('not.contain', question.slug)
  })
})
