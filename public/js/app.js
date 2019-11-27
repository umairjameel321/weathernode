console.log("Client side javascript")

var fetchWeather = "http://localhost:3000/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = "From javascript"

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    const locationApi = fetchWeather + "?address=" + search.value;

    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error) {
                messageOne.textContent = data.error;
            } else {
                console.log(data);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.data.Summary.summary;
            }   
        })
    })


    console.log("testing");
})