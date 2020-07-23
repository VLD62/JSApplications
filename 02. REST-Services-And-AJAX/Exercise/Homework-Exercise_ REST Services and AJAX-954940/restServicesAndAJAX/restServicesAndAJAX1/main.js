function getInfo() {
    const validIds = ["1287", "1308", "1327", "2334"];
    const elements = {
        stopId(){return document.querySelector('input#stopId')},
        stopName(){return document.querySelector('div#stopName')},
        buses(){return document.querySelector('ul#buses')}
    }
    const stopId = elements.stopId().value;
    if(!validIds.includes(stopId)){
        elements.stopName().textContent = 'Error!';
        return;
    }
    const baseUrl = `https://judgetests.firebaseio.com/businfo/${stopId}.json`;
    console.log(baseUrl);
    fetch(baseUrl)
        .then((response)=>response.json())
        .then((result)=>showInfo(result));
    function showInfo(data){
        elements.stopName().textContent = data.name;
        Object.keys(data.buses).forEach(bus => {
            const listItem = document.createElement('li');
            listItem.textContent = `Bus ${bus} arrives in ${data.buses[bus]}`;
            elements.buses().appendChild(listItem);
        })
    }
}