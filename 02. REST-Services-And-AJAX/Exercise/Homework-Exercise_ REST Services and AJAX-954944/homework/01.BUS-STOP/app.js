function getInfo() {
    let stopInputValue = document.querySelector('#stopId')
    let stopNameRef = document.querySelector('#stopName')
    let busesRef = document.querySelector('#buses');

    fetch(`https://judgetests.firebaseio.com/businfo/${stopInputValue.value}.json`)
    .then(x=> x.json())
    .then(x=> {
        busesRef.innerHTML = ''
        let valueToBeAppended = x;
            if(valueToBeAppended.name=== undefined){
                stopNameRef.innerHTML = 'Error';
                return;
            }
        stopNameRef.innerHTML = valueToBeAppended.name;
        Object.entries(valueToBeAppended.buses).forEach(([busId, time]) => {
            let li = document.createElement('li');
            li.innerHTML = `Bus ${busId} arrives in ${time} minutes`
            busesRef.appendChild(li);
        });
    })
}