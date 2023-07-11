const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)
  await User.deleteMany({})
})

test('right amount of blogs', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(helper.blogs.length)
})

test('identifier is id', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body[0].id).toBeDefined()
})
test('posting works', async () => {
  const passwordHash = await bcrypt.hash('iwinyoulose', 10)
  const user = new User({
    username: 'cook',
    name: 'Monica Geller',
    passwordHash,
  })
  await user.save()

  const login = {
    username: 'cook',
    password: 'iwinyoulose',
  }
  const response = await api.post('/api/login').send(login)
  const testToken = response.body.token
  console.log(testToken)

  const newBlog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${testToken}`)
    .send(newBlog)
    .expect(201)
  const blogsAfter = await helper.blogsInDb()
  const names = blogsAfter.map((blog) => blog.title)
  expect(blogsAfter).toHaveLength(helper.blogs.length + 1)
  expect(names).toContain('Type wars')
})

test('no likes', async () => {
  const passwordHash = await bcrypt.hash('iwinyoulose', 10)
  const user = new User({
    username: 'cook',
    name: 'Monica Geller',
    passwordHash,
  })
  await user.save()

  const login = {
    username: 'cook',
    password: 'iwinyoulose',
  }
  const response = await api.post('/api/login').send(login)
  const testToken = response.body.token

  const newBlog = {
    title: 'zero likes',
    author: 'Robert',
    url: 'http://blog.html',
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${testToken}`)
    .send(newBlog)
    .expect(201)
  blogsAfter = await helper.blogsInDb()
  const pairs = blogsAfter.map((blog) => [blog.title, blog.likes])
  expect(pairs).toContainEqual(['zero likes', 0])
})

test('no title or url', async () => {
  const login = {
    username: 'cook',
    password: 'iwinyoulose',
  }
  const passwordHash = await bcrypt.hash('iwinyoulose', 10)
  const user = new User({
    username: 'cook',
    name: 'Monica Geller',
    passwordHash,
  })
  await user.save()
  const response = await api.post('/api/login').send(login)
  const testToken = response.body.token

  const noTitle = {
    author: 'Robert',
    url: 'http://blog.html',
  }
  const noUrl = {
    title: 'zero likes',
    author: 'Robert',
  }
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${testToken}`)
    .send(noTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${testToken}`)
    .send(noUrl)
    .expect(400)
})

test('delete with id', async () => {
  await Blog.deleteMany({})
  const passwordHash = await bcrypt.hash('iwinyoulose', 10)
  const user = new User({
    username: 'cook',
    name: 'Monica Geller',
    passwordHash,
  })
  await user.save()

  const login = {
    username: 'cook',
    password: 'iwinyoulose',
  }
  const toDelete = new Blog({
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: user.id,
  })

  await toDelete.save()

  const response = await api.post('/api/login').send(login)
  const testToken = response.body.token

  const deleteId = await toDelete.id
  console.log(deleteId)

  await api
    .delete(`/api/blogs/${deleteId}`)
    .set('Authorization', `bearer ${testToken}`)
    .expect(204)
  expect(await helper.blogsInDb()).toHaveLength(0)
})

test('update with id', async () => {
  const updateId = '5a422aa71b54a676234d17f8'
  const updateBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10,
  }
  await api.put(`/api/blogs/${updateId}`).send(updateBlog).expect({
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10,
  })
})

describe('User tests', () => {
  describe('no bad users', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      const passwordHash = await bcrypt.hash('marjat', 10)
      const user = new User({ username: 'test', name: 'Test', passwordHash })
      await user.save()
    })

    test('non unigue username fails', async () => {
      result = await api
        .post('/api/users')
        .send({ username: 'test', name: 'Test', password: 'mansikka' })
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('expected `username` to be unique')
      expect(await helper.usersInDb()).toHaveLength(1)
    })
    test('short password fails', async () => {
      result = await api
        .post('/api/users')
        .send({ username: 'uusi', name: 'Test', password: 'aa' })
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('password too short')
      expect(await helper.usersInDb()).toHaveLength(1)
    })
    test('non unigue username fails', async () => {
      result = await api
        .post('/api/users')
        .send({ username: 'aa', name: 'Test', password: 'mansikka' })
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('shorter than the minimum allowed')
      expect(await helper.usersInDb()).toHaveLength(1)
    })
  })
})

test('no token', async () => {
  await api
    .post('/api/blogs')
    .send({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    })
    .expect(401)
})
