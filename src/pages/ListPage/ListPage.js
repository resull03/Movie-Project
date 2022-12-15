import axios from "axios";
import React, { Component } from "react";
import "./ListPage.css";
class ListPage extends Component {
  state = {
    movies: [],
    title: "",
  };
  componentDidMount() {
    const apiKey = "23dbb244";
    const id = this.props.match.params.id;
    axios
      .get(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
      .then((res) => res.data)
      .then((data) => {
        this.setState({ title: data.title });
        data.movies.forEach((elem) => {
          axios
            .get(`http://www.omdbapi.com/?i=${elem}&apikey=${apiKey}`)
            .then((res) => res.data)
            .then((data) => {
              this.setState({ movies: [...this.state.movies, data] });
            });
        });
      });
  }
  render() {
    const { movies, title } = this.state;
    return (
      <div className="list-page">
        <h1 className="list-page__title">{title}</h1>
        <ul>
          {movies.map((item) => {
            return (
              <li key={item.imdbID}>
                <a
                  href={"https://www.imdb.com/title/" + item.imdbID}
                  className="link__block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.Title} ({item.Year})
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ListPage;
