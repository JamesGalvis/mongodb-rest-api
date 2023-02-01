import { Router } from 'express'
import * as routeCtrl from '../controllers/tasks.controllers'

const router = Router()

router.get('/tasks', routeCtrl.findAllTasks)

router.get('/task/:id', routeCtrl.findTaskById)

router.get('/tasks/done', routeCtrl.findTasksDone)

router.get('/tasks/pending', routeCtrl.findPendingTasks)

router.post('/task', routeCtrl.createTask)

router.put('/task/:id', routeCtrl.updateTask)

router.delete('/task/:id', routeCtrl.deleteTask)

export default router
