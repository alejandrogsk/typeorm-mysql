import "reflect-metadata";
import express, {Application} from 'express';

import morgar from 'morgan';
import {createConnection} from 'typeorm'

//Routes
import IndexRoute from './routes/index.routes';
import TodoRoute from './routes/todo.routes';
import UserRoute from './routes/user.routes';



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
        this.app.use('/todos', TodoRoute)
        this.app.use('/auth', UserRoute)
    }

    async listen(){
        await this.app.listen(this.app.get('port'))
        console.log(`Server on port ${this.app.get('port')}`)
    }

    async dbConnection() {
        try {
            const connection = await createConnection();

            console.log('Connection has been established successfully.');
            
            await connection.synchronize();

        } catch (err) {
            console.log('error en tablas', err)
        }
    }

}   