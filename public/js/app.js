const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    getWeather(location)
});

function getWeather(location){
const ourApi = 'http://localhost:3000/weather?address='+location
messageOne.textContent = 'loading...'
messageTwo.textContent = ''
fetch(ourApi).then((response) => {
    if(response){
        response.json().then((data) => {
            console.log(data)
            if(data.error){
                messageOne.textContent = location;
                messageTwo.textContent = data.error;
            }
            else{
                messageOne.textContent = data.location
                messageTwo.textContent = 'It is currently '+data.forecast.current.temperature+' degrees outside and there are '+data.forecast.current.precip+'% chances of rain.'
            }
        })
    }
    else{
        console.log('error');

    }
}).catch((err) => {
    console.log(err)
})
}