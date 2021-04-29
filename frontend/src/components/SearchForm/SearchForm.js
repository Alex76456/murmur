import { useFormWithValidation } from '../../utils/Validation/Validation';
import './SearchForm.css';

const SearchForm = ({ handleSearchSubmit }) => {
    const { values, handleChange, errors, isValid } = useFormWithValidation({});

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    
    return (
        
            <div className="search">
                <form className="search__form" onSubmit={handleSubmit} noValidate>
                    <input className={`search__input ${errors && errors["user"] && 'search__input_type_error'}`}
                        placeholder="Найти пользователя" required onChange={handleChange} name="user" type="text" ></input>
                    <span className="search__input-error">
                        {errors && errors["user"] && errors["user"]}
                    </span>
                    <button type="submit" className="search__button" >Поиск</button>
                </form>
            </div>
        
    );
};

export default SearchForm;