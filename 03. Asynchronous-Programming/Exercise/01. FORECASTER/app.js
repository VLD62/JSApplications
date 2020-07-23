function attachEvents() {
    const baseUrl = "https://judgetests.firebaseio.com/";
    const location = document.querySelector('#location');
    const submitBtn = document.querySelector('#submit');
    const forecastDiv = document.querySelector('#forecast');
    const currentDiv = document.querySelector('#current');
    const upcomingDiv = document.querySelector('#upcoming');
    const symbols = {
        'Sunny': '&#x2600;',
        'Partly Sunny': '&#x26C5;',
        'Overcast': '&#x2601;',
        'Rain': '&#x2614',
        'Degress': '&#176',
    };

    function el(type, content, attributes) {
        const result = document.createElement(type);
        if (attributes !== undefined) {
            Object.assign(result, attributes);
        }
        if (Array.isArray(content)) {
            content.forEach(append);
        } else {
            append(content);
        }
        function append(node) {
            if (typeof node === 'string' || typeof node === 'number') {
                node = document.createTextNode(node);
            }
            result.appendChild(node);
        }
        return result;
    }

    function host(baseUrl, endpoint) {
        return `${baseUrl}${endpoint}.json`
    }

    const api = {
        locations: 'locations',
        current: 'forecast/today/',
        upcoming: 'forecast/upcoming/'
    }

    async function getCode(name) {
        const data = await (await fetch(host(baseUrl, api.locations))).json();
        return data.find(l => l.name.toLowerCase() == name.toLowerCase()).code;
    }

    async function getCurrent(code) {
        const data = await (await fetch(host(baseUrl, api.current + code))).json()
        return data;
    }

    async function getUpcomming(code) {
        const data = await (await fetch(host(baseUrl, api.upcoming + code))).json()
        return data;
    }

    function renderUpcoming(forecast) {
        const symbolSpan = el('span', '', { className: 'symbol' });
        symbolSpan.innerHTML = symbols[forecast.condition];
        const tempSpan = el('span', '')
        tempSpan.innerHTML = `${forecast.low}${symbols.Degress}/${forecast.high}${symbols.Degress}`;
        const result = el('span', [
            symbolSpan,
            tempSpan,
            el('span', forecast.condition, { className: 'forecast-data' }),
        ], { className: 'upcoming' });
        return result;
    }

    submitBtn.addEventListener('click', async e => {
        let code = ''
        try {
            code = await getCode(location.value);
        } catch (err) {
            location.value = 'ERROR - incorrect location!'
            return;
        }
        const current = await getCurrent(code);
        const upcoming = await getUpcomming(code);
        const symbolSpan = el('span', '', { className: 'condition symbol' });
        symbolSpan.innerHTML = symbols[current.forecast.condition];
        currentDiv.appendChild(el('div', [
            symbolSpan,
            el('span', [
                el('span', current.name, { className: 'forecast-data' }),
                el('span', `${current.forecast.low}/${current.forecast.high}`, { className: 'forecast-data' }),
                el('span', current.forecast.condition, { className: 'forecast-data' }),
            ], { className: 'condition' })
        ], {
            className: 'forecast'
        }));
        const forecastInfoDiv = el('div', upcoming.forecast.map(renderUpcoming), { className: 'forecast-info' });
        upcomingDiv.appendChild(forecastInfoDiv);
        forecastDiv.style.display = 'block';
    });

}
attachEvents();
