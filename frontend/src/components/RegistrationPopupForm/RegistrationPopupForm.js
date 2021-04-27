import PopupWithForm from '../PopupWithForm/PopupWithForm';
import React from 'react';
import { useFormWithValidation } from '../../utils/Validation/Validation'



function RegistrationPopupForm({ isOpened, onClose }) {
    // const [email, setEmail] = React.useState('');
    // const [password, setPassword] = React.useState('');
    // const [name, setName] = React.useState('');

    // function handleName(e) {
    //     setName(e.target.value);
    // }
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

    const {value , handleChange, errors , isValid} = useFormWithValidation({});

    const onSubmit = (e) => {
        e.preventDefault();
        if(isValid) {
            console.log(value);
        }
    }

    return (
        <>
            <PopupWithForm onSubmit={onSubmit} button='Сохранить' name='registration' title='Регистрация'
                isOpened={isOpened} onClose={onClose}>
                <input  onChange={handleChange} placeholder="Имя" id="input-name"
                    name='name' className="popup__input-item popup__input-item_el_name" type="text"
                    required minLength="2" maxLength="40" />
                <span className="input-error">{errors && errors['name'] !== '' && errors['name']}</span>
                <input  onChange={handleChange} placeholder="Пароль"
                    id='registration-password-input' name='password' className="popup__input-item popup__input-item_el_password" type="password"
                    required minLength="8" maxLength="16" />
                <span className="input-error">{errors && errors['password'] !== '' && errors['password']}</span>

                <input  onChange={handleChange} placeholder="Почта"
                    id='registration-email-input' name='email' className="popup__input-item popup__input-item_el_email" type="email"
                    required minLength="2" maxLength="40" pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
                <span className="input-error">{errors && errors['email'] !== '' && errors['email']}</span>
            </PopupWithForm>
        </>
    )
}

export default RegistrationPopupForm;