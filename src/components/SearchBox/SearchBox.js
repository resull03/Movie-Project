import React, { Component } from "react";
import { addFilterMovies, getMovieList } from "../../redux/actions/actions";
import { connect } from "react-redux";

import "./SearchBox.css";

class SearchBox extends Component {
  state = {
    searchLine: "",
  };
  searchLineChangeHandler = (e) => {
    this.setState({ searchLine: e.target.value });
  };
  searchBoxSubmitHandler = (e) => {
    e.preventDefault();
  };

  render() {
    const { addFilterMovies } = this.props;
    const { searchLine } = this.state;
    return (
      <div className="search-box">
        <form
          className="search-box__form"
          onSubmit={this.searchBoxSubmitHandler}
        >
          <label className="search-box__form-label">
            Искать фильм по названию:
            <input
              type="text"
              className="search-box__form-input"
              placeholder="Например, Shawshank Redemption"
              onChange={this.searchLineChangeHandler}
            />
          </label>
          <button
            type="submit"
            className="search-box__form-submit"
            onClick={() =>
              getMovieList(searchLine)
                .then((res) => {
                  addFilterMovies(res);
                })
                .catch((err) => {
                  addFilterMovies([]);
                  return err;
                })
            }
            disabled={!searchLine}
          >
            Искать
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFilterMovies: (movies) => {
      dispatch(addFilterMovies(movies));
    },
  };
};

export default connect(null, mapDispatchToProps)(SearchBox);
