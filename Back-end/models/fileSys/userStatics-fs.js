import bcrypt from 'bcrypt'
import uuid from 'node:uuid'
import {SALT_ROUNDS } from '../../utils/config.js'
import { info, cError } from '../../utils/logger.js'

export class StatisticsModel {
  static async getAllStatistics ({ username }) {
    info('(Modelo)nombre del usuario:', username)
  }

  static async createStatistics ({ input }, { username }) {
    info('(Modelo)input:', input)
    info('(Modelo)nombre del usuario:', username)
    // extraigo del input los porcentajes y la fecha de la estadistica
    const { porcentaje2Puntos, porcentaje3Puntos, fechaHoraFormateada } = input.input
    info('(Modelo)nuevo input:', porcentaje2Puntos, porcentaje3Puntos)
    // creo un uuid y lo paso a binario
    const id = uuid()
    // hago un query y extraigo ese id
    try {
      // creo la query para insertar en la base de datos la nueva estadistica con la id y el input
      // si hay algun error que envie el error
      cError('(Modelo)Error al crear stadisticas', e)
    }
    // luego me selecciona de la base de datos la nueva estadistica creada y la envia al controlado
    return statistics[0]
  }

  static async delete ({ id }) {
    info('(Modelo)id de la estadistica:', id)
    try {
      // busco y borro la estadistica con el id indicado en el parametro
    } catch (e) {
      // si hay algun error lo muestra por consola
      cError('(Modelo)Error al borrar la estadistica', e)
    }
    // busco la estadistica borrada y si se borra con exito retorna el array basio al controlador
    if (statistics.length === 1) return false
    return statistics[0]
  }
}

export class UserModel {
  static async registerUser ({ input }) {
    // extraigo del input los siguientes datos
    const {
      username,
      password,
      nombre,
      apellido
    } = input
    info('(Modelo)input:', input)
    // hasheo la contraseña
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    info('(Modelo)contrseña hasheada :', hashedPassword)
    // creo un nuevo id
    info('(Modelo)id_binaria:', { uuidBin })
    try {
      // inserto en la base de datos el nuevo usuario
 } catch (e) {
      // si hay algun error lo envio al controlador
      cError('(Modelo)Error register a User', e)
    }
    // devuelvo el usuario al controlador si fue un exito
    return user[0]
  }

  static async login ({ input }) {
    // extraigo del input los siguientes datos
    const {
      username,
      password
    } = input
    info('(Modelo)info del usuario:', input)
    try {
      // busco al usuario en a base de datos
      info('(Modelo)usuario:', validatedUser)
      // comparo  la contraseña con la hasheada
      const passwordMach = await bcrypt.compare(password, validatedUser.password)
      if (!(user && passwordMach)) { throw new Error('credentials invalid') }
      // retorno el usuario
      return validatedUser
    } catch (e) {
      // si hay algun error lo envio al controlador
      cError('(Modelo)error al iniciar sesion', e)
    }
  }
}
