// importar un json ESmodules
// import movies from './movies.json' with {type: 'json'}
// recomendado
/*
  import fs from 'node:fs'
  const movies = JSON.parse(fs.readFileSync('./movies.json','utf-8'))
*/
// leer un json en ESmodules Recomendado hasta ahora
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

export const readJSON = (path) => require(path)
