import { Router } from 'express'

import home from '../http/controllers/home.js'
import notFound from '../http/controllers/404.js'

const router = Router()

router.get('/', home)
router.use('*', notFound)

export default router
