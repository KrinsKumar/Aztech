let prompt = document.querySelector('#prompt');
let buttons = document.querySelectorAll('.helper-buttons');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        prompt.value += button.innerText;
    })
})