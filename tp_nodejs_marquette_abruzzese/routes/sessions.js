const router = require('express').Router()
// Dépendances 3rd party
const express = require('express')
const bodyParser = require('body-parser')
// Dépendances native
const db = require('sqlite')
const path = require('path')

const hat = require('hat')
const accessToken = hat()

const bcrypt = require('bcrypt')

router.get('/', (req, res, next) => {
  if (req.session.accessToken) {
  	return res.redirect('/users')
  }

  res.format({
    html: () => {
      res.render('sessions/login', {
        title: 'Login',
        user: {},
        action: '/sessions'
      })
    },
    json: () => {
      next(new Error('Bad request'))
    }
  })
})

router.get('/logout', (req, res, next) => {
  if (!req.session.accessToken) {
  	return res.redirect('/')
  }
  req.session.destroy()
  return res.redirect('/sessions')
})

// POST USER
router.post('/', (req, res, next) => {
  if(!req.body.email || !req.body.password) {
   return next(new Error('All fields must be given.'))
  }

  db.get('SELECT * FROM users WHERE email = ?', req.body.email)
  .then((user) => {
  	if (!user) {
      return next(new Error('Unknown user.'))
  	}
	bcrypt.compare(req.body.password, user.password).then((match) => {
	  if (!match) {
        return next(new Error('Password does not match.'))
	  }
	  res.format({
	  	html: () => {
	  	  req.session.accessToken = accessToken
	  	  res.redirect('/users')
	  	},
	  	json: () => {
	  	  res.setHeader("accessToken", accessToken)
	  	  return {accessToken: accessToken}
	  	}
	  })
	})
  }).catch(next)
})

module.exports = router