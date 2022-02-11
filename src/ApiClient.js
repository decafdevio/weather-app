import axios from 'axios'

export class ApiClient {

  status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }

  getWeather() {
    return this.getRequest("https://api.openweathermap.org/data/2.5/onecall?lat=53.382969&lon=-1.4659&exclude=minutely&units=metric&appid=a7060406efaa81d1dcedc42aaad91eeb")
  }

  getPostcode() {
    return this.getRequest("https://api.postcodes.io/postcodes/S38GW")
  }

  getRequest(url) {
    return axios.get(url)
      .then(this.status)
      .catch(function (error) {
        console.error(error);
        alert(error)
      })
  }

}