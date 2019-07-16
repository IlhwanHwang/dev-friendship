import * as request from 'request'

export const ServerName = location.host == "localhost:1234" ? "http://localhost:37122" : "http://rwan.ml:37123"

export const postRequest = (basename: string, payload: any) => {
  console.log(`Requesting ${basename} on ${JSON.stringify(payload)}`)
  return new Promise((resolve, reject) => {
    request({
      uri: `${ServerName}/${basename}`,
      method: "POST",
      headers: {
        'X-PINGOTHER': 'pingpong'
      },
      json: payload
    }, (err, response, body) => {
      if (err) {
        reject(err)
      }
      else if (response.statusCode === 200) {
        resolve(body)
      }
      else {
        resolve({ success: false })
      }
    })
  }) 
}