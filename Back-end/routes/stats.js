import { Router } from 'express'
import { StatisticController } from '../controllers/statistics.js'
export const statsRouter = Router()

statsRouter.get('/:user', StatisticController.getStatisticsUser)

statsRouter.post('/:user', StatisticController.newStatistics)

statsRouter.delete('/:id', StatisticController.deleteStatistic)
