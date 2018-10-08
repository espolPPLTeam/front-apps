import axios from 'axios'

export default async (url = '', data = {}, type = 'GET') => {
  type = type.toUpperCase()
  return new Promise((resolve, reject) => {
    if (!['GET', 'POST', 'PUT', 'DELETE'].includes(type)) {
      reject(new Error('No se escogio de metodo correcto'))
    } else {
      axios({ method: type, url, data })
        .then((response) => {
          if (response.data) {
            resolve(response.data.datos, response.data.estado)
          } else {
            reject(response.data)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  })
}
