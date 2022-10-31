import { Router } from 'express'

import home from '../http/controllers/home.js'
import command from '../http/controllers/command.js'
import notFound from '../http/controllers/404.js'

const router = Router()

router.get('/', home)
router.post('/command', command)
router.use('*', notFound)

export default router
