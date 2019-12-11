'use strict'

class AppController {
    index() {
        return { msg: "Route is protect with JWT! HELLO WORLD" }
    }
}

module.exports = AppController
