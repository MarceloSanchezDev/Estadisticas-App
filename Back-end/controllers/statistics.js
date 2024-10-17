import { StatisticsModel } from '../models/turso/userStatics.js'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../utils/config.js'
import { info } from '../utils/logger.js'
// busco el token en la request y lo proceso para saber si el usuario tiene permisos
const getTokenFrom = req => {
  const authorization = req.get('authorization')
  info('Header Autorization : ', authorization)
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

export class StatisticController {
  static async getStatisticsUser (req, res, next) {
    // verifico el token
    const decodedToken = jwt.verify(getTokenFrom(req), SECRET_KEY)
    if (!decodedToken.username) {
      return res.status(401).json({ error: 'token invalid' })
    }
    // extraigo el usuario del token
    const { username } = decodedToken
    info('(Controlador) username : ', username)
    try {
      // busco las estadisticas en el modelo
      const statistics = await StatisticsModel.getAllStatistics({ username })
      info('(Controlador)estadisticas del usuario:', statistics)
      // si las estadisticas existen envio las estaidsticas
      res.json(statistics)
    } catch (error) {
      // sino pasa el error al middleware
      next(error)
    }
  }

  static async newStatistics (req, res, next) {
    // extraigo la estadistica nueva de la request
    const newStat = {
      ...req.body
    }
    info('(Controlador)nueva estadistica: ', newStat)
    // verifico el token
    const decodedToken = jwt.verify(getTokenFrom(req), SECRET_KEY)
    if (!decodedToken.username) {
      return res.status(401).json({ error: 'token invalid' })
    }
    // extraigo el usuario del token
    const { username } = decodedToken
    info('(Controlador) username : ', username)
    info('(Controlador)nueva estadistica formateaada: ', { newStat })
    try {
      // envio la nueva estadistica al modelo
      const trackStat = await StatisticsModel.createStatistics({ input: newStat }, { username })
      if (trackStat) {
        info('(Controlador)informacion trakeada: ', trackStat)
      }
      // si se crea con exito devuelvo la nueva stadistica
      res.status(201).json({ trackStat })
    } catch (error) {
      // sino pasa el error al middleware
      next(error)
    }
  }

  static async deleteStatistic (req, res, next) {
    const decodedToken = jwt.verify(getTokenFrom(req), SECRET_KEY)
    if (!decodedToken.username) {
      return res.status(401).json({ error: 'token invalid' })
    }
    // extraigo el id de la estadistica por los parametros de la url
    const { id } = req.params
    info('(Controlador) id de la estadistica:', id)
    try {
      // envio la estadistica al modelo
      const deleteStac = await StatisticsModel.delete({ id })
      if (deleteStac === undefined) {
        // si se elimina con exito devuelvo el mensaje
        info('(Controlador)estadistica eliminada')
        return res.json({ message: 'stat deleted' })
      }
      res.status(404).json({ message: 'stat not found' })
    } catch (error) {
      // sino pasa el error al middleware
      next(error)
    }
  }
}
