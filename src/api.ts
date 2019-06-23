import * as request from 'request'

export const ServerName = "http://localhost:3000"

export const postRequest = (basename: string, body: any) => {
  console.log(`Requesting ${basename} on ${body}`)
  return new Promise((resolve, reject) => {
    request({
      uri: `${ServerName}/${basename}`,
      method: "POST",
      headers: {
        'X-PINGOTHER': 'pingpong'
      },
      json: {
        userId: ""
      }
    }, (err, response, body) => {
      if (err) {
        reject(err)
      }
      else if (response.statusCode === 200) {
        resolve(body)
      }
    })
  }) 
}