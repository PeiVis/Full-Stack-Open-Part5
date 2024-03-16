describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
  })
  describe('Logged in', function () {
    beforeEach(function () {
      const user = {
        username: 'Cypress test username',
        name: 'Cypress test name',
        password: 'Cypress test password'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
      cy.login({ username: 'Cypress test username', password: 'Cypress test password' })
      const user2 = {
        username: 'Cypress test username2',
        name: 'Cypress test name2',
        password: 'Cypress test password2'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user2)
      cy.contains('Cypress test name')
    })
    describe('Has created blogs', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'A title created by cypress', author: 'An author created by cypress', url: 'A url created by cypress', likes: 0 })
      })
      it('user can like blogs', function () {
        cy.get('#allBlogs').first().parent().find('button').first().click()
        cy.get('#likes').should('contain', 'Likes: 0')
        cy.get('#likes').parent().find('#likeButton').click()
        cy.get('#likes').should('contain', 'Likes: 1')
      })
      it('user can delete blogs', function () {
        cy.get('#allBlogs').should('contain', 'A title created by cypress')
        cy.get('#allBlogs').first().parent().find('button').first().click()
        cy.get('#allBlogs').first().parent().find('#deleteBlogButton').first().click()
        cy.get('#allBlogs').should('not.contain', 'A title created by cypress')
      })
      it('user see delete button only if they created the blog', function () {
        cy.get('#allBlogs').should('contain', 'A title created by cypress')
        cy.get('#allBlogs').first().parent().find('button').first().click()
        cy.get('#allBlogs').should('contain', 'Delete')
        cy.get('#logoutButton').click()
        cy.login({ username: 'Cypress test username2', password: 'Cypress test password2' })
        cy.get('#allBlogs').should('contain', 'A title created by cypress')
        cy.get('#allBlogs').first().parent().find('button').first().click()
        cy.get('#allBlogs').should('not.contain', 'Delete')
      })
      it('blogs sorted by likes', function () {
        cy.createBlog({ title: 'title 1', author: 'An author created by cypress', url: 'A url created by cypress', likes: 3 })
        cy.createBlog({ title: 'title 2', author: 'An author created by cypress', url: 'A url created by cypress', likes: 1 })
        cy.createBlog({ title: 'title 3', author: 'An author created by cypress', url: 'A url created by cypress', likes: 2 })
        cy.get('ul>li').eq(0).should('contain', 'title 1')
        cy.get('ul>li').eq(1).should('contain', 'title 3')
        cy.get('ul>li').eq(2).should('contain', 'title 2')
        cy.get('ul>li').eq(3).should('contain', 'A title created by cypress')
        cy.get('ul>li').contains('title 2').parent().find('button').first().click()
        cy.get('ul>li').contains('title 2').parent().find('#likeButton').click()
        cy.get('ul>li').contains('title 2').parent().find('#likeButton').click()
        cy.get('ul>li').contains('title 2').parent().find('#likeButton').click()
        cy.get('ul>li').eq(0).should('contain', 'title 2')
        cy.get('ul>li').eq(1).should('contain', 'title 1')
        cy.get('ul>li').eq(2).should('contain', 'title 3')
        cy.get('ul>li').eq(3).should('contain', 'A title created by cypress')
      })
    })
    it('user can create blogs', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('A title created by cypress')
      cy.get('#author').type('An author created by cypress')
      cy.get('#url').type('A url created by cypress')
      cy.contains('Create blog').click()
      cy.contains('Blog \'A title created by cypress\' created')
      cy.get('#allBlogs').should('contain', 'A title created by cypress')
    })
  })

  it('user can login', function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'Cypress test username',
      name: 'Cypress test name',
      password: 'Cypress test password'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
    cy.get('#username').type('Cypress test username')
    cy.get('#password').type('Cypress test password')
    cy.get('#loginButton').click()
    cy.contains('Cypress test name')
  })

  it('login fails with wrong password', function () {
    cy.visit('')
    cy.get('#username').type('Wrong username')
    cy.get('#password').type('Wrong password')
    cy.get('#loginButton').click()
    cy.get('.error').should('contain', 'Wrong credentials')
  })
})
