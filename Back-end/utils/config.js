import dotenv from 'dotenv'
import { info } from './logger.js'
dotenv.config()
export const PORT = process.env.PORT

export const DB = process.env.NODE_ENV === 'test'
  ? process.env.DBTEST
  : process.env.DBPRODUC
if (DB === process.env.NODE_ENV === 'test') {
  info('Base de Datos tester')
} else {
  info('Base de datos Produccion')
}
export const PASSWORD = process.env.DBPASSWORD

export const SECRET_KEY = process.env.SECRET_KEY

export const SALT_ROUNDS = 10

export const DBTOKEN = process.env.DBTOKEN
