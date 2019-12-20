'use strict'


const Route = use('Route')

Route.post('/register', 'AuthController.register')
Route.post('/authenticate', 'AuthController.authenticate')

Route.get('/app', 'AppController.index').middleware(['auth:jwt'])

Route.group(() => {
    Route.resource('tweets', 'TweetController').apiOnly()
}).middleware(['auth:jwt'])

