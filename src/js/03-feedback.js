
import _throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const LOCAL_S_KEY = 'feedback-form-state';

let formData = {};

loadForm();

form.addEventListener(`submit`, onFormSubmit);
form.addEventListener('input', _throttle(onSaveFormInput, 500));

function onFormSubmit(event) {
    event.preventDefault();
    const formElements = event.currentTarget.elements;
    const email = formElements.email.value;
    const message = formElements.message.value;
    
    if (email === '' || message === '') {
        return alert('Заполните все поля')
    }

    event.currentTarget.reset();
    console.log(formData);
    localStorage.removeItem(LOCAL_S_KEY);
}

function onSaveFormInput(event) {
    formData = JSON.parse(localStorage.getItem(LOCAL_S_KEY)) || {};
    formData[event.target.name] = event.target.value;
    localStorage.setItem(LOCAL_S_KEY, JSON.stringify(formData))
}

function loadForm(){
    try {
        let formLoad = JSON.parse(localStorage.getItem(LOCAL_S_KEY))
        if (!formLoad) {
            return;
        }

        formData = formLoad;
        form.email.value = formData.email || '';
        form.message.value = formData.message || '';

    } catch (error) {
        console.error('Error.message ', error.message);
    }
}


