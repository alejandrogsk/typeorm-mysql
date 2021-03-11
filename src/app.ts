import express, {Application} from 'express';
import morgar from 'morgan';


//Routes
import IndexRoute from './routes/index.routes';
import PostRoute from './routes/todo.routes';

export class App {
    private app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 4000);
    }

    middlewares() {
        this.app.use(morgar('dev'));
        this.app.use(express.json())
    }


    routes() {
        this.app.use(IndexRoute);
        this.app.use('/todo', PostRoute)
    }

    async listen(){
        await this.app.listen(this.app.get('port'))
        console.log(`Server on port ${this.app.get('port')}`)
    }

}   