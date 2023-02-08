import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import poster from './assets/no_poster.jpg';
import PercentBar from './PercentBar';

const MovieViewer = () => {
  let { country, code, language, filter, pgnum } = useParams();
  const [movies, setMovies] = useState<any[]>([]);
  const [status, setStatus] = useState('Loading...');
  const [totalPages, setTotalPages] = useState(0);
  const [pendingPage, setPendingPage] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const key = import.meta.env.VITE_TMDB_API_KEY;
  let endpoint = '';

  useEffect(() => {
    window.scrollTo(0, 0);
    if (filter === 'filtered') {
      if (code === 'sg') {
        endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${code.toUpperCase()}&with_keywords=4224&page=${pgnum}&sort_by=vote_count.desc`;
      } else if (code === 'tw') {
        endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${code.toUpperCase()}&with_keywords=9322&page=${pgnum}&sort_by=vote_count.desc`;
      } else if (country === 'Hawaii') {
        endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_keywords=235363&page=${pgnum}&sort_by=release_date.desc`;
      } else if (code === 'hk') {
        endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${code.toUpperCase()}&with_original_language=${language}&page=${pgnum}&sort_by=vote_count.desc`;
      } else if (code === 'au') {
        endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${code.toUpperCase()}&with_keywords=193455&page=${pgnum}&sort_by=vote_count.desc`;
      } else if (code === 'ca') {
        endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${code.toUpperCase()}&with_keywords=1329&page=${pgnum}&sort_by=vote_count.desc`;
      } else if (country === 'England') {
        endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=GB&with_keywords=212&vote_count.lte=3619&page=${pgnum}&sort_by=vote_count.desc`;
      } else if (country === 'Northern Ireland') {
        endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=GB&with_keywords=7005&vote_count.lte=4500&page=${pgnum}&sort_by=vote_count.desc`;
      } else {
        if (code) {
          endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${code.toUpperCase()}&with_original_language=${language}&vote_count.lte=715&page=${pgnum}&sort_by=vote_count.desc`;
        }
      }
    } else if (filter === 'all') {
      if (country === 'Hawaii') {
        if (code) {
          endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${code.toUpperCase()}&with_keywords=1668&page=${pgnum}&sort_by=release_date.desc`;
        }
      } else {
        if (code) {
          endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&region=${code.toUpperCase()}&page=${pgnum}&sort_by=vote_count.desc`;
        }
      }
    }
    axios
      .get(endpoint)
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
    setIsEdit(false);
  }, [navigate]);
  return (
    <>
      <h3>{country}</h3>
      <p>Touch a poster image to find watch options</p>
      <p>The {'<<'} button lifts language/keyword filters</p>
      <p>The &#x2693; button resets to initial filters</p>
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
              navigate(`/${country}/${code}/${language}/all/1`);
            }
          }}
        >
          {'<<'}
        </button>
        {pgnum && +pgnum !== 1 && (
          <button
            onClick={() => {
              {
                let newPage = pgnum && +pgnum - 1;
                navigate(
                  `/${country}/${code}/${language}/${filter}/${newPage}`
                );
              }
            }}
          >
            {'<'}
          </button>
        )}
        <div>
          {isEdit ? (
            <input
              onChange={(e) => setPendingPage(+e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  let newPage = pendingPage;
                  navigate(
                    `/${country}/${code}/${language}/${filter}/${newPage}`
                  );
                }
              }}
              type="number"
              style={{ width: '42px' }}
              defaultValue={pgnum}
              autoFocus
            />
          ) : (
            <p className="pseudo-input" onClick={() => setIsEdit(true)}>
              {pgnum}
            </p>
          )}{' '}
          /
          {totalPages ? (
            <p style={{ display: 'inline-block', fontSize: '15px' }}>
              {totalPages}
            </p>
          ) : (
            '...'
          )}
        </div>
        {pgnum && +pgnum < totalPages && (
          <button
            style={{ background: isEdit ? '#4BB543' : 'blue' }}
            onClick={() => {
              if (!isEdit) {
                let newPage = pgnum && +pgnum + 1;
                navigate(
                  `/${country}/${code}/${language}/${filter}/${newPage}`
                );
              } else {
                navigate(
                  `/${country}/${code}/${language}/${filter}/${pendingPage}`
                );
              }
            }}
          >
            {!isEdit ? '>' : <p style={{ fontSize: '15px' }}>&#x2713;</p>}
          </button>
        )}
        <button
          style={{ background: isEdit ? 'red' : 'lightblue' }}
          onClick={() => {
            {
              if (!isEdit) {
                let newPage = 1;
                navigate(`/${country}/${code}/${language}/filtered/${newPage}`);
              } else {
                setIsEdit(false);
              }
            }
          }}
        >
          {!isEdit ? <>&#x2693;</> : <p style={{ padding: '2px 7px' }}>X</p>}
        </button>
      </div>
    </>
  );
};

export default MovieViewer;
