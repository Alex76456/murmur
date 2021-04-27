import PopupWithForm from '../PopupWithForm/PopupWithForm';
import React from 'react';
import { useFormWithValidation } from '../../utils/Validation/Validation'


function LoginPopupForm({ isOpened, onClose }) {
    // const [email, setEmail] = React.useState('');
    // const [password, setPassword] = React.useState('');

    // function handlePassword(e) {
    //     setPassword(e.target.value);
    // }
    // function handleEmail(e) {
    //     setEmail(e.target.value);
    // }
    // function handleSubmit(e) {
    //     e.preventDefault();
    //     console.log('SUBMIT')
    //     // onRegistration({
    //     //     profileNameInput: name,
    //     //     profilePassword: password,
    //     //     profileEmail: email,
    //     // });

    // }
    const { value, handleChange, errors, isValid } = useFormWithValidation({});

    const onSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            console.log('Success');
        }
    }

    return (
        <>
            <PopupWithForm onSubmit={onSubmit} button='Сохранить' name='login' title='Авторизация'
                isOpened={isOpened} onClose={onClose}>
                <input onChange={handleChange} placeholder="Почта"
                    id='login-email-input' name='email' className="popup__input-item popup__input-item_el_email" type="email"
                    required minLength="2" maxLength="40" />
                <span className="input-error">{errors && errors['email'] !== '' && errors['email']}</span>
                <input onChange={handleChange} placeholder="Пароль"
                    id='login-password-input' name='password' className="popup__input-item popup__input-item_el_password" type="password"
                    required minLength="2" maxLength="40" />
                <span className="input-error">{errors && errors['password'] !== '' && errors['password']}</span>

            </PopupWithForm>
        </>
    )
}

export default LoginPopupForm;