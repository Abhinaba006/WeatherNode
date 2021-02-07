console.log('I am working')

const weather_form = document.querySelector('form')
const weather_place = document.querySelector('input')
const messageOne = document.querySelector('.output')
const messageError = document.querySelector('.error')


weather_form.addEventListener('submit', (event)=>{
    event.preventDefault();

    messageOne.textContent = ''
    messageError.textContent = ''

    const place = weather_place.value;
    console.log(place)
    fetch('/weather?place='+place).then((response)=>{
    response.json().then((data)=>{
        if(!data[0])
            return messageOne.textContent = data[1].forecast_data+' in '+ data[1].location
        return messageError.textContent = data[0].error
    })
})
})