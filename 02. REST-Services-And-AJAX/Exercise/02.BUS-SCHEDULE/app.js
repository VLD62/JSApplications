function solve() {
    const baseURL = 'https://judgetests.firebaseio.com/schedule/';
    const info = document.querySelector('span.info');
    const arriveButton = document.querySelector('input#arrive');
    const departButton = document.querySelector('input#depart');
    let busStopId = 'depot';
    let busStopName = '';

    function switchBusState() {

        if (arriveButton.disabled) {
            arriveButton.disabled = false;
            departButton.disabled = true;
        } else {
            arriveButton.disabled = true;
            departButton.disabled = false;
        }
    }

    function depart() {
        fetch(baseURL + busStopId + '.json')
            .then((response) => response.json())
            .then((response) => showBusInfo(response));

        function showBusInfo(data) {
            info.textContent = `Next stop ${data.name}`;
            busStopId = data.next;
            busStopName = data.name;
            switchBusState();
        }
    }

    function arrive() {
        info.textContent = `Arriving at ${busStopName}`;
        switchBusState();
    }

    return {
        depart,
        arrive
    };
}

let result = solve();