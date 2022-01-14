const weatherForm = document.querySelector('form')              //selecting form from client
const search = document.querySelector('input')                  //selecting search element from client
const messageOne = document.querySelector('#message-1')         //selecting from id / for class = ".className"
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {                 //selecting event
    e.preventDefault()                                          //prevent refreshing page
    const location = search.value
    messageOne.textContent = 'loading '
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {          //fetching json data to object from client
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }

        })
    })
})