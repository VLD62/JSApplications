export function notify(message, selector) {
    const notification = document.querySelector(selector);
    notification.textContent = message;
    notification.style.display = 'block';
    notification.addEventListener('click', () => {
        notification.style.display = 'none';
    });

}

let requests = 0;
export function beginRequest() {
    const notification = document.querySelector('#loadingBox');
    requests++;
    notification.style.display = 'block';
}

export function endRequest() {
    const notification = document.querySelector('#loadingBox');
    requests--;
    if (requests === 0) {
        notification.style.display = 'none';
    }
}