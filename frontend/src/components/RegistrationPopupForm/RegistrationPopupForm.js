import PopupWithForm from '../PopupWithForm/PopupWithForm';
import React from 'react';

function RegistrationPopupForm({ isOpened, onClose }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');

    function handleName(e) {
        setName(e.target.value);
    }
    function handlePassword(e) {
        setPassword(e.target.value);
    }
    function handleEmail(e) {
        setEmail(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        console.log('SUBMIT')
        // onRegistration({
        //     profileNameInput: name,
        //     profilePassword: password,
        //     profileEmail: email,
        // });

    }
    return (
        <>
            <PopupWithForm onSubmit={handleSubmit} button='Сохранить' name='registration' title='Регистрация'
                isOpened={isOpened} onClose={onClose}>
                <input value={name || ''} onChange={handleName} placeholder="Имя" id="input-name"
                    name='profileNameInput' className="popup__input-item popup__input-item_el_name" type="text"
                    required minLength="2" maxLength="40" />
                <span id='input-name-error' className="error"></span>
                <input value={password || ''} onChange={handlePassword} placeholder="Пароль"
                    id='registration-password-input' name='profilePasswordInput' className="popup__input-item popup__input-item_el_password" type="password"
                    required minLength="2" maxLength="40" />
                <span id='input-password-error' className="error"></span>

                <input value={email || ''} onChange={handleEmail} placeholder="Почта"
                    id='registration-email-input' name='profileEmailInput' className="popup__input-item popup__input-item_el_email" type="email"
                    required minLength="2" maxLength="40" />
                <span id='email-input-error' className="error"></span>
            </PopupWithForm>
        </>
    )
}

export default RegistrationPopupForm;