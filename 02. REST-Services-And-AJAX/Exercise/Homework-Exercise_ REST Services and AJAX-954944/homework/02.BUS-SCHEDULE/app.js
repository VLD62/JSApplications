function solve() {

    let connectionRef = document.querySelector('.info');
    let departBtn = document.querySelector('#depart');
    let arriveBtn = document.querySelector('#arrive');
    let currentStopId = 'depot';
    let nextStopId = ''
    let currentStopName = '';

    function setStateToTravelling(){
        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    function setStateToArriving(){
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }
    function getScheduleById(id){
        let requestId = id;
        if(!id){
            requestId = 'depot';
        }
        return fetch(`https://judgetests.firebaseio.com/schedule/${requestId}.json`)
    }

    function setNextStop(stopName){
        connectionRef.innerHTML = `Next stop ${stopName}`
    }

    function setArriving(stopName){
        connectionRef.innerHTML = `Arriving at ${stopName}`
    }
    function depart() {
        getScheduleById(currentStopId)
        .then(x=> x.json())
        .then(x=> {
            nextStopId = x.next;
            currentStopName = x.name;
            setNextStop(x.name);
        })

        setStateToTravelling();
    }

    function arrive() {
        setStateToArriving();
        currentStopId = nextStopId;
        setArriving(currentStopName)
    }

    return {
        depart,
        arrive
    };
}

let result = solve();