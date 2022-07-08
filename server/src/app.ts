import express from 'express'
import 'dotenv/config'
import 'express-async-errors'
import { connectDB } from './db/connect';
import { router } from './routes';
import { authenticationMiddleware } from './middlewares/ensureAuthenticated'
import { errorHandlerMiddleware } from './middlewares/errorHandler';

const app = express()

app.use(express.json())

app.use(router)

app.use(authenticationMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 4000

async function start(){
  try{
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  }catch(error){
    console.log(error)
  }
}

start()