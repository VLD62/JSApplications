function getInfo() {
    const baseURL = "https://judgetests.firebaseio.com/businfo/{busStopId}.json";
    const validIDs = ["1287", "1308", "1327", "2334"];
    const stopId = document.querySelector('input#stopId').value;
    const stopName = document.querySelector('div#stopName');
    const buses = document.querySelector('ul#buses');

    if (!validIDs.includes(stopId)) {
        stopName.textContent = "Error";
        return;
    }

    fetch(baseURL.replace('{busStopId}', stopId))
        .then((response) => response.json())
        .then((result) => appendData(result));

    function appendData(input) {
        stopName.textContent = input.name;
        Object.keys(input.buses).forEach((bus) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Bus ${bus} arrives in ${input.buses[bus]}`;
            buses.appendChild(listItem);
        });
    }
}