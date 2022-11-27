const rp = require('request-promise')

module.exports = async function(city = '') {
    if(!city){
        throw new Error('Имя города не может быть пустым')
    }
    const key = '5eb77e3183d8ab50e3b6545d85552e8b'
    const uri = 'http://api.openweathermap.org/data/2.5/weather'
    const Option = {
        uri,
        qs:{
            appid:key,
            q:city,
            units:'imperial'
        },
        
        json:true
    }
    try {
        
        const data = await rp(Option)
        
        let cels =(data.main.temp - 32) * 5/9
        cels = Math.round(cels)
        console.log(data)
        let feel = Math.round((data.main.feels_like - 32) * 5/9)
        return{
            weather: `${data.name}: ${cels}°С`,
            error:null,
            main: `${data.weather[0].description}`,
            fl: `feels like: ${feel}°С`
        }

    } catch (error) {
        return{
            weather: null,
            error:error.error.message
        }
    }
}