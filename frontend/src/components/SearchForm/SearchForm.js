import { useFormWithValidation } from '../../utils/validation';
import './SearchForm.css';
import api from '../../utils/api';
const SearchForm = ({ handleSetMurms, handleSetCurrentUser, isLoggedIn }) => {
    const { values, handleChange, errors, isValid } = useFormWithValidation({});


    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            //список мурмов из LS
            api.getMurms()
                .then((res) => {
                    localStorage.setItem('murms', JSON.stringify(res));
                })
                .catch(err => console.log(err));

            const murmsList = JSON.parse(localStorage.getItem('murms'));
            if (murmsList) {
                const newList = murmsList.filter(function (e) {
                    return e.link === values.link;
                });
                handleSetMurms(newList);
                //список юзеров из LS
                api.getUsers()
                    .then((res) => {
                        localStorage.setItem('users', JSON.stringify(res));
                    })
                    .catch(err => console.log(err));
                //ищем пользователя из списка
                const usersList = JSON.parse(localStorage.getItem('users'));
                const userProfile = usersList.filter(function (e) {
                    return e.link === values.link;
                });
                if (userProfile[0]) {
                    handleSetCurrentUser(userProfile[0])
                } else {
                    api.getUser(localStorage.getItem('jwt'))
                        .then(res => handleSetCurrentUser(res))

                    api.getMurms().then((r) => {
                        handleSetMurms(r.reverse());
                    });
                }

            }

        }
    }
        return (
            <>
                { isLoggedIn && (
                    <div className="search">

                        <form className="search__form" onSubmit={handleSubmit} noValidate>
                            <input className={`search__input ${errors && errors["link"] && 'search__input_type_error'}`}
                                placeholder="Найти пользователя" required onChange={handleChange} name="link" type="text" ></input>
                            <button type="submit" className="search__button" >Поиск</button>
                        </form>

                    </div>
                )}
            </>
        );
    };

    export default SearchForm;