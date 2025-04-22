import express from 'express'
import routes from './routes'

class App {
    constructor() {
        this.app = express()

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use (express.json())
    }

    route() {
        this.app.use(routes)
    }
}

export default new App().app
