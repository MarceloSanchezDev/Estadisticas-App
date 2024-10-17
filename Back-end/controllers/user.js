import { UserModel } from '../models/turso/userStatics.js'
import { validRegisterUser, validUser } from '../schema/userSchema.js'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../utils/config.js'
import { info } from '../utils/logger.js'

export class UserController {
  static async registerUser (req, res, next) {
    try {
      // envio al esquema el body de la request
      const result = validRegisterUser(req.body)
      info('(Controlador)resutado :', result.data)
      // si sale exitosa se envia al modelo
      const userValid = await UserModel.registerUser({ input: result.data })
      // si el modelo crea con exito el usuario , extraigo el username , nombre, apellido y el id
      const { username, nombre, apellido, id } = userValid[0]
      info('(Controlador)UserValid :', userValid)
      info('(Controlador)username:', username, 'id:', id)
      // los imprimo en el token
      const token = jwt.sign({ id, username }, SECRET_KEY, {
        expiresIn: 60 * 60
      })
      info('(Controlador)token :', token)
      info('(Controlador)nuevo usuario creado : ', userValid)
      // los envio al front
      res.send({ username, nombre, apellido, token })
    } catch (error) {
      // si hay algun error los mando al middleware
      next(error)
    }
  }

  static async login (req, res, next) {
    try {
      // envio al esquema el body de la request
      const result = validUser(req.body)
      info('(Controlador) resultado :', result)
      // si sale exitosa se envia al modelo
      const userValid = await UserModel.login({ input: result.data })
      info('(Controlador)UserValid :', userValid)
      // si el modelo crea con exito el usuario , extraigo el username , nombre, apellido y el id en Hexadecimal
      const { username, nombre, apellido, id } = userValid
      info('(Controlador)username:', username, 'id:', id)
      // los imprimo en el token
      const token = jwt.sign({ id, username }, SECRET_KEY, {
        expiresIn: '2 days'
      })
      info('(Controlador)usuario:', userValid, '(Controlador)token:', token)
      // los envio al front
      res.send({ username, nombre, apellido, token, id })
    } catch (error) {
      // si hay algun error los mando al middleware
      next(error)
    }
  }
}
