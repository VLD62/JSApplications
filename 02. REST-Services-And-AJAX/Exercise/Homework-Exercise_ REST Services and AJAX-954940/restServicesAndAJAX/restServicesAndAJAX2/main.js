function solve() {

    const baseURL = "https://judgetests.firebaseio.com/schedule/";
    let busStopId = "depot";
    let busStopName = "";

    const elements = {
        stopInfo() { return document.querySelector('span.info') },
        arrive() { return document.querySelector('input#arrive') },
        depart() { return document.querySelector('input#depart') }
    }

    function depart() {
        fetch(baseURL + `${busStopId}.json`)
            .then((response) => response.json())  
            .then((response) => showBusInfo(response));
 
        function showBusInfo(data) {
            elements.stopInfo().textContent = `Next stop ${data.name}`;
            busStopId = data.next;
            busStopName = data.name;
            switchBusState();
        }
    }

    function arrive() {
        elements.stopInfo().textContent = `Arriving at ${busStopName}`;
        switchBusState();
    }

    function switchBusState() {
        const { disabled: isDisabled } = elements.arrive();

        if (isDisabled) {
            elements.arrive().disabled = false;
            elements.depart().disabled = true;
        } else {
            elements.arrive().disabled = true;
            elements.depart().disabled = false;
        }
    }

    return {
        depart,
        arrive
    };
}

let result = solve();