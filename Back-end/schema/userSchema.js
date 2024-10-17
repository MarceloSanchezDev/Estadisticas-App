import { z } from 'zod'
import { info } from '../utils/logger.js'

const UserRegister = z.object({
  username: z.string({
    required_error: 'user is required',
    invalid_type_error: 'user must be a string'
  }).max(20, { message: 'Must be 20 or fewer characters long' }),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a string'
  }).min(6, { message: 'Must be 6 or more characters long' }),
  nombre: z.string({
    invalid_type_error: 'nombre must be a string'
  }).max(20, { message: 'Must be 20 or fewer characters long' }),
  apellido: z.string({
    invalid_type_error: 'apellido must be a string'
  }).max(20, { message: 'Must be 20 or fewer characters long' }),
  email: z.string({
    required_error: 'email is required',
    invalid_type_error: 'email must be a string'
  }).email().min(6, { message: 'Must be 6 or more characters long' })
})
const UserLogin = z.object({
  username: z.string({
    required_error: 'user is required',
    invalid_type_error: 'user must be a string'
  }).max(20, { message: 'Must be 20 or fewer characters long' }),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a string'
  }).min(6, { message: 'Must be 6 or more characters long' })
})

export function validUser (object) {
  info('(SCHEMA) object:', object)
  return UserLogin.safeParse(object)
}
export function validRegisterUser (object) {
  info('(SCHEMA) object:', object)
  return UserRegister.safeParse(object)
}
