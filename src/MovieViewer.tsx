import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import poster from './assets/no_poster.jpg';
import PercentBar from './PercentBar';

const Test = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [status, setStatus] = useState('Loading...');
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [apiEndpoint, setApiEndpoint] = useState('');
  const { country, code, language } = useParams();
  const key = import.meta.env.VITE_TMDB_API_KEY;
  useEffect(() => {
    if (code === 'sg') {
      setApiEndpoint(
        `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${code.toUpperCase()}&with_keywords=4224&page=${page}&sort_by=vote_count.desc`
      );
    } else if (code === 'tw') {
      setApiEndpoint(
        `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${code.toUpperCase()}&with_keywords=9322&page=${page}&sort_by=vote_count.desc`
      );
    } else if (code === 'hw') {
      setApiEndpoint(
        `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_keywords=235363&&page=${page}sort_by=release_date.desc`
      );
    } else if (code === 'hk') {
      setApiEndpoint(
        `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${code.toUpperCase()}&with_original_language=${language}&with_keywords=12354&page=${page}&sort_by=vote_count.desc`
      );
    } else {
      code &&
        setApiEndpoint(
          `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${code.toUpperCase()}&with_original_language=${language}&vote_count.lte=278&page=${page}&sort_by=vote_count.desc`
        );
    }
    apiEndpoint &&
      axios
        .get(apiEndpoint)
        .then((res) => {
          !totalPages && setTotalPages(+res.data['total_pages']);
          if (res.data.results.length) {
            setMovies(res.data.results);
          } else {
            setStatus('No movies...');
          }
        })
        .catch((err) => console.log(err));
  }, [apiEndpoint, page]);
  return (
    <>
      <h3>{country}</h3>
      <div className="movie-grid">
        {movies.length
          ? movies.map((movie) => {
              let year = movie['release_date'].substring(0, 4);
              return (
                <div key={movie.id}>
                  <img
                    onClick={() => {
                      window.open(
                        `https://www.themoviedb.org/movie/${movie.id}/watch`,
                        '_blank'
                      );
                    }}
                    src={
                      movie['poster_path']
                        ? `https://www.themoviedb.org/t/p/original/${movie['poster_path']}`
                        : poster
                    }
                    height="300px"
                    width="200px"
                    alt={`Movie Poster`}
                  />
                  <p className="movie-description">
                    {movie.overview.length
                      ? movie.overview
                      : 'No description available'}
                  </p>
                  <p
                    style={{
                      marginTop: '3px',
                      height: '45px',
                      overflowY: 'auto',
                      width: '200px',
                      padding: '1px',
                    }}
                  >
                    <strong>{movie.title}</strong> ({year})
                  </p>
                  <PercentBar percent={movie['vote_average'] * 10} />
                  <div
                    onClick={() => {
                      window.open(
                        `https://www.youtube.com/results?search_query=${movie['original_title']}+${year}`
                      );
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'end',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        height: '20px',
                        width: '30px',
                        background: 'red',
                        borderRadius: '5px',
                        color: 'white',
                        fontSize: '13px',
                      }}
                    >
                      &#9654;
                    </div>
                    <p style={{ marginLeft: '3px' }}>Find on YouTube</p>
                  </div>
                </div>
              );
            })
          : status}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8em',
          marginTop: '10px',
        }}
        className="nav-buttons"
      >
        {page !== 1 && (
          <button
            onClick={() => {
              {
                setPage(page - 1);
                window.scroll({
                  top: 0,
                  left: 0,
                  behavior: 'smooth',
                });
              }
            }}
          >
            {'<'}
          </button>
        )}
        {page !== totalPages && (
          <button
            onClick={() => {
              setPage(page + 1);
              window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth',
              });
            }}
          >
            {'>'}
          </button>
        )}
      </div>
    </>
  );
};

export default Test;
