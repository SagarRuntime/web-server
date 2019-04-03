console.log('Loaded Client side Javascript')


const fetchLoc = (location)=>{
    message1.textContent = 'Loading info for Location '+location+' Search!'
    const queryString = '/weather?address='+location
    fetch(queryString).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message1.textContent=data.error
            }else
            {
                console.log(data)
                message1.textContent= 'Weather info for location '+data.Address
                message2.textContent= 'Lat :'+data.Latitude +'\nLong :'+data.Longitude+'\nLoc : '+data.location+'\nTemp :'+data.temperature+'\nPrecepitation :'+data.pricipitationProb
            }
        }) 
    })
}

var weatherform = document.querySelector('form')
var ipLocation = document.querySelector('input')
var message1 = document.querySelector('#message-1')
var message2 = document.querySelector('#message-2')
message1.textContent = ''
message2.textContent = ''
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const value = ipLocation.value
    if(!value){
        console.log('Please provide an Input!')
        return
    }
    fetchLoc(value)
})