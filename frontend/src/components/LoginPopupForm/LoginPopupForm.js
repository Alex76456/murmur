import PopupWithForm from '../PopupWithForm/PopupWithForm';
import React from 'react';

function LoginPopupForm({ isOpened, onClose }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

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
            <PopupWithForm onSubmit={handleSubmit} button='Сохранить' name='login' title='Авторизация'
                isOpened={isOpened} onClose={onClose}>
                <input value={email || ''} onChange={handleEmail} placeholder="Почта"
                    id='login-email-input' name='profileEmailInput' className="popup__input-item popup__input-item_el_email" type="email"
                    required minLength="2" maxLength="40" />
                <span id='email-input-error' className="error"></span>
                <input value={password || ''} onChange={handlePassword} placeholder="Пароль"
                    id='login-password-input' name='profilePasswordInput' className="popup__input-item popup__input-item_el_password" type="password"
                    required minLength="2" maxLength="40" />
                <span id='password-input-error' className="error"></span>

            </PopupWithForm>
        </>
    )
}

export default LoginPopupForm;