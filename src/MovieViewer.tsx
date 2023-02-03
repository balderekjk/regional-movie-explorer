import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import poster from './assets/no_poster.jpg';
import PercentBar from './PercentBar';

const MovieViewer = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [status, setStatus] = useState('Loading...');
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [pendingPage, setPendingPage] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [apiEndpoint, setApiEndpoint] = useState('');
  const { country, code, language } = useParams();
  const key = import.meta.env.VITE_TMDB_API_KEY;
  useEffect(() => {
    if (!isStart) {
      if (code === 'sg') {
        setApiEndpoint(
          `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${code.toUpperCase()}&with_keywords=4224&page=${page}&sort_by=vote_count.desc`
        );
      } else if (code === 'tw') {
        setApiEndpoint(
          `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${code.toUpperCase()}&with_keywords=9322&page=${page}&sort_by=vote_count.desc`
        );
      } else if (country === 'Hawaii') {
        setApiEndpoint(
          `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_keywords=235363&page=${page}&sort_by=release_date.desc`
        );
      } else if (code === 'hk') {
        setApiEndpoint(
          `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${code.toUpperCase()}&with_original_language=${language}&page=${page}&sort_by=vote_count.desc`
        );
      } else if (code === 'au') {
        setApiEndpoint(
          `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${code.toUpperCase()}&with_keywords=193455&page=${page}&sort_by=vote_count.desc`
        );
      } else if (code === 'ca') {
        setApiEndpoint(
          `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${code.toUpperCase()}&with_keywords=1329&page=${page}&sort_by=vote_count.desc`
        );
      } else if (country === 'England') {
        setApiEndpoint(
          `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=GB&with_keywords=392&vote_count.lte=5340&page=${page}&sort_by=vote_count.desc`
        );
      } else if (country === 'Northern Ireland') {
        setApiEndpoint(
          `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=GB&with_keywords=7005&vote_count.lte=4500&page=${page}&sort_by=vote_count.desc`
        );
      } else {
        code &&
          setApiEndpoint(
            `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${code.toUpperCase()}&with_original_language=${language}&vote_count.lte=715&page=${page}&sort_by=vote_count.desc`
          );
      }
    } else {
      if (country === 'Hawaii') {
        code &&
          setApiEndpoint(
            `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${code.toUpperCase()}&with_keywords=1668&page=${page}&sort_by=release_date.desc`
          );
      } else {
        code &&
          setApiEndpoint(
            `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${code.toUpperCase()}&page=${page}&sort_by=vote_count.desc`
          );
      }
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    apiEndpoint &&
      axios
        .get(apiEndpoint)
        .then((res) => {
          if (+res.data['total_pages'] > 500) {
            setTotalPages(500);
          } else {
            setTotalPages(+res.data['total_pages']);
          }
          if (res.data.results.length) {
            setMovies(res.data.results);
          } else {
            setStatus('No movies...');
          }
        })
        .catch((err) => console.log(err.response.data.errors));
  }, [isStart, apiEndpoint, page]);
  return (
    <>
      <h3>{country}</h3>
      <p>Touch a poster image to find watch options</p>
      <p>The {'<<'} button lifts language and keyword filters</p>
      <p>The &#x2693; button resets to initial filters</p>
      <p></p>
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
                      height: '46px',
                      overflowY: 'auto',
                      width: '200px',
                      padding: '1px',
                    }}
                  >
                    <strong>{movie.title}</strong> ({year ? year : '?'})
                  </p>
                  <PercentBar percent={movie['vote_average'] * 10} />
                  <div
                    onClick={() => {
                      window.open(
                        `https://www.youtube.com/results?search_query=${movie[
                          'original_title'
                        ].replace(/&|\+/g, 'and')}+${year}`
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
                    <p style={{ margin: '5px 0 0 5px' }}>Find on YouTube</p>
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
          gap: '1.4em',
          marginTop: '10px',
        }}
        className="nav-buttons"
      >
        <button
          onClick={() => {
            {
              setPage(1);
              setIsStart(true);
            }
          }}
        >
          {'<<'}
        </button>
        {page !== 1 && (
          <button
            onClick={() => {
              {
                setPage(page - 1);
              }
            }}
          >
            {'<'}
          </button>
        )}
        <p>
          {isEdit ? (
            <input
              onChange={(e) => setPendingPage(+e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setPage(pendingPage);
                  setIsEdit(false);
                }
              }}
              type="number"
              style={{ width: '42px' }}
              defaultValue={page}
              autoFocus
            />
          ) : (
            <div className="pseudo-input" onClick={() => setIsEdit(true)}>
              {page}
            </div>
          )}{' '}
          /
          {totalPages ? (
            <div style={{ display: 'inline-block', fontSize: '15px' }}>
              {totalPages}
            </div>
          ) : (
            '...'
          )}
        </p>
        {page < totalPages && (
          <button
            style={{ background: isEdit ? '#4BB543' : 'blue' }}
            onClick={() => {
              if (!isEdit) {
                setPage(page + 1);
              } else {
                setPage(pendingPage);
                setIsEdit(false);
              }
            }}
          >
            {!isEdit ? '>' : <div style={{ fontSize: '15px' }}>&#x2713;</div>}
          </button>
        )}
        <button
          style={{ background: isEdit ? 'red' : 'lightblue' }}
          onClick={() => {
            {
              if (!isEdit) {
                setPage(1);
                setIsStart(false);
              } else {
                setPendingPage(page);
                setIsEdit(false);
              }
            }
          }}
        >
          {!isEdit ? (
            <>&#x2693;</>
          ) : (
            <div style={{ padding: '2px 7px' }}>X</div>
          )}
        </button>
      </div>
    </>
  );
};

export default MovieViewer;
