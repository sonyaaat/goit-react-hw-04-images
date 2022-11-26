import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import css from '../Searchbar/Searchbar.module.css';
const { useState } = require('react');

const Searchbar = ({ onSubmit }) => {
  const [inputText, setInputText] = useState('');

  const handleChange = evt => {
    setInputText(evt.target.value);
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(inputText);
    setInputText('');
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchForm__button}>
          <BsSearch size={30} />
          <span className={css.SearchForm_button_label}>Search</span>
        </button>

        <input
          onChange={handleChange}
          className={css.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          value={inputText}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
