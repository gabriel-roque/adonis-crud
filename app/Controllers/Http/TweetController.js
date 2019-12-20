'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Tweet = use('App/Models/Tweet')

class TweetController {

  async index({ response }) {
    const tweets = await Tweet.all();

    return response.status(200).send(tweets);
  }

  async store({ request, auth, response }) {
    const data = request.only(['content'])
    const tweet = await Tweet.create({ user_id: auth.user.id, ...data });

    return response.status(201).send(tweet);
  }

  async show({ params, response }) {
    const tweet = await Tweet.findOrFail(params.id)

    return response.status(200).send(tweet);
  }

  async update({ params, request, response }) {
    const tweet = await Tweet.findOrFail(params.id)

    Object.assign(tweet, request.all())
    tweet.save()

    response.status(200).send(tweet)
  }

  async destroy({ params, auth }) {
    const tweet = await Tweet.findOrFail(params.id)

    if (tweet.user_id !== auth.user.id) {
      return response.status(401).send({ msg: 'User not authorized!' })
    }

    await tweet.delete()

  }
}

module.exports = TweetController
