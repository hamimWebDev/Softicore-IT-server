import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import cockieParser from 'cookie-parser'
import path from 'path'
import globalErrorHandler from './app/middleware/globalErrorHandlers'
import notFound from './app/middleware/notFound'
import router from './app/routes'

const app: Application = express()

// parser
app.use(express.json())
app.use(cockieParser())


app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://softicore-it-client.vercel.app",
    "https://softicoreit.com"
  ], credentials: true
}))

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, '..', 'build')))

// // Set the directory for EJS views
// app.set("views", path.join(__dirname, "..", "./views")); // Ensure this points to your views folder
app.set('view engine', 'ejs') // Set EJS as the view engine

// Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));

// application routes

app.use('/api', router)

// Test route
app.get('/', async (req: Request, res: Response) => {
  interface TestRouteResponse {
    message: string
  }

  const message: TestRouteResponse['message'] =
    "Md. Hamim Howlader Asif's server is running"
  res.send(message)
})

// Catch-all route for client-side routing
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})

// global error handler
app.use(globalErrorHandler)

// not found route
app.use(notFound)

export default app
