describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      'username': 'test',
      'password': 'test',
      'name': 'test'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input:first').type('test')
      cy.get('input:last').type('test')
      cy.contains('login').click()

      cy.contains('test logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('input:first').type('test')
      cy.get('input:last').type('wrong')
      cy.contains('login').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'test logged in')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.get('input:first').type('test')
      cy.get('input:last').type('test')
      cy.contains('login').click()
    })

    it('Blog form is shown', function () {
      cy.contains('new blog')
      cy.contains('contents')
    })

    it('Create new blog form is shown', function () {
      cy.contains('new blog').click()
      cy.contains('title')
      cy.contains('author')
      cy.contains('url')
      cy.contains('cancel').click()
    })

    it.only('A blog can be created', function () {
      const blog = {
        'title': 'React patterns',
        'author': 'Michael Chan',
        'url': 'https://reactpatterns.com/'
      }

      cy.contains('new blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#create-button').click()

      cy.get('.blogTitle').should('contain', blog.title)
      cy.get('.success')
        .should('contain', 'a new blog React patterns by Michael Chan')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
})