import { Router } from 'express'
import { AuthRoutes } from '../modules/Auth/auth.routes'
import { WorkRoutes } from '../modules/Work/work.routes'
import { BlogRoutes } from '../modules/Blog/blog.routes'
import { TeamRoutes } from '../modules/Team/team.routes'
import { ClientRoutes } from '../modules/Client/client.routes'
import { chatRoutes } from '../modules/ChatBot/chat.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/work',
    route: WorkRoutes,
  },
  {
    path: '/blog',
    route: BlogRoutes,
  },
  {
    path: '/team',
    route: TeamRoutes,
  },
  {
    path: '/client',
    route: ClientRoutes,
  },
  {
    path: '/chat',
    route: chatRoutes,
  }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
