import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'
import { DB, PASSWORD, SALT_ROUNDS } from '../../utils/config.js'
import { info, cError } from '../../utils/logger.js'
// configuro los datos para la coneccion con la base de datos
const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: PASSWORD,
  database: DB
}
// conecto la base de datos
const connection = await mysql.createConnection(config)

export class StatisticsModel {
  static async getAllStatistics ({ username }) {
    info('(Modelo)nombre del usuario:', username)
    try {
      // hago la query a la base de datos para extraer todas las estadisticas
      const [statistics] = await connection.query(`
      SELECT u.username, hex(e.id_bin) id , e.fecha, e.hora, e.estadisticasDosPuntos, e.estadisticasTresPuntos, e.nombreEstadistica, e.cant_dosPuntos, e.cant_tresPuntos, e.cant_dosPuntosEncestados, e.cant_tresPuntosEncestados FROM user u JOIN user_estadisticas e WHERE u.username = ?`, [username])
      info(statistics)
      // retonro las estadisticas
      return statistics
    } catch (e) {
      // si hay algun error se envia el error
      cError('(Modelo)Error al traer las stadisticas: ', e)
    }
  }

  static async createStatistics ({ input }, { username }) {
    info('(Modelo)input:', input)
    info('(Modelo)nombre del usuario:', username)
    // extraigo del input los porcentajes y la fecha de la estadistica
    const { nombreStat, tiroDosPuntos, tiroTresPuntos, tiroTresPuntosEncestados, tiroDosPuntosEncestados, porcentaje2Puntos, porcentaje3Puntos, fechaFormateada, horaFormateada } = input.input
    info('(Modelo)nuevo input:', nombreStat, tiroDosPuntos, tiroTresPuntos, tiroTresPuntosEncestados, tiroDosPuntosEncestados, porcentaje2Puntos, porcentaje3Puntos, fechaFormateada, horaFormateada)
    // creo un uuid y lo paso a binario
    const [uuidBinResult] = await connection.query("SELECT unhex(replace(UUID(),'-','')) uuidBin")
    // hago un query y extraigo ese id
    const [{ uuidBin }] = uuidBinResult
    info('(Modelo)estadistica a cargar :', uuidBin, input, username)
    try {
      // creo la query para insertar en la base de datos la nueva estadistica con la id y el input
      await connection.query(
        'INSERT INTO user_estadisticas (id_bin ,fecha, hora , estadisticasDosPuntos, estadisticasTresPuntos, user_username, nombreEstadistica, cant_dosPuntos, cant_tresPuntos, cant_dosPuntosEncestados, cant_tresPuntosEncestados ) values(?,?,?,?,?,?,?,?,?,?,?)',
        [uuidBin, fechaFormateada, horaFormateada, porcentaje2Puntos, porcentaje3Puntos, username, nombreStat, tiroDosPuntos, tiroTresPuntos, tiroDosPuntosEncestados, tiroTresPuntosEncestados])
    } catch (e) {
      // si hay algun error que envie el error
      cError('(Modelo)Error al crear stadisticas', e)
    }
    // luego me selecciona de la base de datos la nueva estadistica creada y la envia al controlador
    const [statistics] = await connection.query(
      'SELECT *, hex(id_bin) FROM user_estadisticas WHERE id_bin  = ?', [uuidBin]
    )
    return statistics[0]
  }

  static async delete ({ id }) {
    info('(Modelo)id de la estadistica:', id)
    try {
      // busco y borro la estadistica con el id indicado en el parametro
      await connection.query(
        'DELETE FROM user_estadisticas WHERE id_bin = unhex(?)', [id]
      )
    } catch (e) {
      // si hay algun error lo muestra por consola
      cError('(Modelo)Error al borrar la estadistica', e)
    }
    // busco la estadistica borrada y si se borra con exito retorna el array basio al controlador
    const [statistics] = await connection.query('SELECT * FROM user_estadisticas WHERE id_bin = unhex(?) ', [id])
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
    const [uuidBinResult] = await connection.query("SELECT unhex(replace(UUID(),'-','')) uuidBin")
    const [{ uuidBin }] = uuidBinResult
    info('(Modelo)id_binaria:', { uuidBin })
    try {
      // inserto en la base de datos el nuevo usuario
      await connection.query(
        'INSERT INTO user (id_bin, username, password, nombre, apellido) values(?,?,?,?,?)', [uuidBin, username, hashedPassword, nombre, apellido])
    } catch (e) {
      // si hay algun error lo envio al controlador
      cError('(Modelo)Error register a User', e)
    }
    // devuelvo el usuario al controlador si fue un exito
    const [user] = await connection.query(
      'SELECT *, hex(id_bin) as idHex FROM user WHERE id_bin = ?', [uuidBin]
    )
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
      const [user] = await connection.query('SELECT *, hex(id_bin) as idHex FROM user WHERE username = ?', [username])
      if (user.length === 0) { throw new Error('User not found') }
      const validatedUser = user[0]
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
