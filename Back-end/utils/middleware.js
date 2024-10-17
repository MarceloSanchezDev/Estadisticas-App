import { info, cError } from './logger.js'

export const requestLogger = (req, res, next) => {
  info('Method:', req.method)
  info('Path:  ', req.path)
  info('Body:  ', req.body)
  info('---')
  next()
}

export const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

export const errorHandler = (error, req, res, next) => {
  if (error.name === 'TypeError') {
    cError('(middleware)', error.name, error)
    return res.status(400).send({ error: 'Usuario o contraseña incorreactas' })
  } else if (error.name === 'ValidationError') {
    cError('(middleware)', error.name, error)
    return res.status(400).json({ error: 'error en las credenciales' })
  } else if (error.name === 'TokenExpiredError') {
    cError('(middleware)', error.name, error)
    return res.status(400).json({ error: 'token expirado' })
  } else if (error.name === 'JsonWebTokenError') {
    cError('(middleware)', error.name, error)
    return res.status(400).json({ error: 'No hay token' })
  }

  next(error)
}
