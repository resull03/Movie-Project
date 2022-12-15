import React, { Component } from "react";
import "./Favorites.css";
import { connect } from "react-redux";
import { removeMovie, setLinkActive } from "../../redux/actions/actions";
import axios from 'axios'

class Favorites extends Component {
  state = {
    title: "",
    listLink: "#",
  };

  handleInput = (e) => {
    this.setState({ title: e.target.value });
  };

  handleSaveList = (e) => {
    this.props.setLinkActive(true);
    this.saveList();
  };

  saveList = () => {
    axios
      .post("https://acb-api.algoritmika.org/api/movies/list", {
        title: this.state.title,
        movies: this.props.movies.map((item) => item.imdbID),
      })
      .then((res) => {
        this.setState({ listLink: res.data.id });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  render() {
    const { movies, removeMovie, linkActive } = this.props;
    const { title, listLink } = this.state;
    return (
      <div className="favorites">
        <input
          value={title}
          placeholder="Введите название списка"
          className="favorites__name"
          disabled={linkActive ? "disabled" : null}
          onChange={this.handleInput}
        />
        <ul className="favorites__list">
          {movies.map((item) => {
            return (
              <li key={item.imdbID}>
                {item.Title} ({item.Year})
                <button
                  onClick={() => removeMovie(item.imdbID)}
                  disabled={linkActive ? "disabled" : null}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          className={`favorites__save ${linkActive ? "link__none" : null}`}
          onClick={() => this.handleSaveList()}
          disabled={title === "" || movies.length === 0}
        >
          Сохранить список
        </button>
        <a
          href={`http://localhost:3000/list/${listLink}`}
          className={`link__none ${linkActive ? "link__block" : null}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Поделиться с друзьями
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { listMovies, linkActive } = state;
  return {
    movies: listMovies,
    linkActive: linkActive,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeMovie: (imdbID) => {
      dispatch(removeMovie(imdbID));
    },
    setLinkActive: (bool) => {
      dispatch(setLinkActive(bool));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
