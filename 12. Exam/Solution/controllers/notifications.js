export function notify(message, selector) {
    const notification = document.querySelector(selector);
    notification.textContent = message;
    notification.style.display = 'block';
    notification.addEventListener('click', () => {
        notification.style.display = 'none';
    });

}
