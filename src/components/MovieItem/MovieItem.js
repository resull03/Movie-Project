import React, { Component } from "react";
import { connect } from "react-redux";
import { addMoive } from "../../redux/actions/actions";
import "./MovieItem.css";
class MovieItem extends Component {
  render() {
    const { imdbID, Title, Year, Poster, addMovie, disabled, linkActive } =
      this.props;
    return (
      <article className="movie-item">
        <img className="movie-item__poster" src={Poster} alt={Title} />
        <div className="movie-item__info">
          <h3 className="movie-item__title">
            {Title}&nbsp;({Year})
          </h3>
          <button
            type="button"
            className="movie-item__add-button"
            onClick={() => addMovie(imdbID)}
            disabled={disabled || linkActive}
          >
            Добавить в список
          </button>
        </div>
      </article>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addMovie: (id) => {
      dispatch(addMoive(id));
    },
  };
}

const mapStateToProps = (state) => {
  const { linkActive } = state;
  return {
    linkActive: linkActive,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);
