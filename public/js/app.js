console.log('Client side javascript file is loaded!');

// fetch('http://localhost:3000/weather?address=kolkata')
//     .then((res) => (data = res.json()))
//     .then((data) => {
//         if (data.error) {
//             console.log(data.error);
//         } else {
//             console.log(data.forecast);
//             console.log(data.location);
//         }
//     });
    const messageOne = document.querySelector('#message-1')
    const messageTwo = document.querySelector('#message-2')
    const weatherForm = document.querySelector('form')
    const search = document.querySelector('input')
    weatherForm.addEventListener('submit',(e)=>{
        e.preventDefault()

        const location = search.value

        messageOne.textContent='Loading...'
        messageTwo.textContent = ''
        
        fetch(`http://localhost:3000/weather?address=${location}`)
    .then((res) => (data = res.json()))
    .then((data) => {
        if (data.error) {
           messageOne.textContent = data.error;
           ;
        } else {
            messageOne.textContent = data.forecast;
            messageTwo.textContent = data.location;
        }
    });
    })
