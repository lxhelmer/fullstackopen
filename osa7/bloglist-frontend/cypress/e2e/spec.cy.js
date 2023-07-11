describe('Blog app', function () {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset')
		const user = {
			name: 'Testi Kayttaja',
			username: 'tester',
			password: 'salasana',
		}
		const user2 = {
			name: 'Toinen Kayttaja',
			username: 'toka',
			password: 'salasana',
		}
		cy.request('POST', 'http://localhost:3003/api/users/', user)
		cy.request('POST', 'http://localhost:3003/api/users/', user2)
		cy.visit('http://localhost:3000')
	})
	it('Login form is shown', function () {
		cy.contains('log in to application')
		cy.contains('login')
	})

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.visit('http://localhost:3000')
			cy.get('#username').type('tester')
			cy.get('#password').type('salasana')
			cy.get('#login-button').click()
			cy.contains('Testi Kayttaja logged in')
		})
		it('fails with wrong credentials', function () {
			cy.get('#username').type('tester')
			cy.get('#password').type('väärä')
			cy.get('#login-button').click()
			cy.contains('wrong credentials')
		})
	})
	describe('When logged in', function () {
		beforeEach(function () {
			cy.get('#username').type('tester')
			cy.get('#password').type('salasana')
			cy.get('#login-button').click()
		})
		it('A blog can be created', function () {
			cy.contains('new blog').click()
			cy.get('#title').type('testi title')
			cy.get('#author').type('testi author')
			cy.get('#url').type('testi url')
			cy.get('#create').click()
			cy.contains('new blog testi title by testi author added')
			cy.get('#list').contains('testi title testi author')
		})
		it('A blog can be liked', function () {
			cy.contains('new blog').click()
			cy.get('#title').type('testi title')
			cy.get('#author').type('testi author')
			cy.get('#url').type('testi url')
			cy.get('#create').click()

			cy.get('.view').click()
			cy.get('.like').click()
			cy.contains('1')
		})
		it('A blog can be removed', function () {
			cy.contains('new blog').click()
			cy.get('#title').type('testi title')
			cy.get('#author').type('testi author')
			cy.get('#url').type('testi url')
			cy.get('#create').click()
			cy.get('.blog-entry')

			cy.get('.view').click()
			cy.get('.remove-button').click()
			cy.get('.blog-entry').should('not.exist')
		})
		it('Ordered by like count', function () {
			cy.get('button:contains("new blog")').click()
			cy.get('#title').type('eka')
			cy.get('#author').type('EKA')
			cy.get('#url').type('www.eka.fi')
			cy.get('#create').click()

			cy.get('.view').eq(0).click()

			cy.get('button:contains("new blog")').click()

			cy.get('#title').type('toka')
			cy.get('#author').type('TOKA')
			cy.get('#url').type('www.toka.fi')
			cy.get('#create').click()

			cy.get('.view').click()
			cy.get('.blog-entry').eq(1).should('contain', 'toka')
			cy.get('.like').eq(1).click()
			cy.get('.blog-entry').eq(0).should('contain', 'toka')
		})
	})
	describe('When logged in as other', function () {
		it('No remove when other user', function () {
			cy.get('#username').type('tester')
			cy.get('#password').type('salasana')
			cy.get('#login-button').click()
			cy.contains('new blog').click()
			cy.get('#title').type('testi title')
			cy.get('#author').type('testi author')
			cy.get('#url').type('testi url')
			cy.get('#create').click()
			cy.get('#logout').click()

			cy.get('#username').type('toka')
			cy.get('#password').type('salasana')
			cy.get('#login-button').click()
			cy.get('.view').click()
			cy.get('#remove-button').should('not.exist')
		})
	})
})
