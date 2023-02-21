import React, { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    filter: '',
  };

  inputHandler = event => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  submitHandler = event => {
    event.preventDefault();
    if (!this.state.filter.trim()) {
      console.log('Ничего нет!'); //  Сделать нотификашку
      return;
    }

    this.props.onSubmit(this.state.filter);
    this.reset();
  };

  reset = () => {
    this.setState({
      filter: '',
    });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.submitHandler}>
          <button type="submit" className={css.SearchFormButton}>
            <ImSearch size={20} />
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={css.SearchFormInput}
            type="text"
            name="filter"
            value={this.state.filter}
            onChange={this.inputHandler}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
