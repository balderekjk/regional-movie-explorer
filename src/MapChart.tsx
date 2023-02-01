import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import countries from './db.json';
import { Link, useNavigate } from 'react-router-dom';

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

export default function MapChart() {
  let navigate = useNavigate();
  const [selectCountry, setSelectCountry] = useState('Afghanistan');
  return (
    <>
      <div style={{ width: '100vw' }}>
        <p>Swipe/scroll to the right to see full map</p>
        <p>Click a region/name. Zoom-in helps.</p>
        <div style={{ marginTop: '5px' }}>
          <label htmlFor="countries">Alternatively: </label>
          <select
            onChange={(e) => setSelectCountry(e.target.value)}
            name="countries"
            id="countries"
          >
            {countries.map((country) => {
              return (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              );
            })}
          </select>
          <button
            onClick={() => {
              let found = countries.filter(
                (country) => country.code === selectCountry
              );
              navigate(
                `/${found[0].name}/${found[0].code}/${found[0].language[0].code}`
              );
            }}
            style={{ marginLeft: '3px' }}
          >
            Go
          </button>
        </div>
      </div>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                onClick={() => {
                  let found = countries.filter(
                    (country) => country.name === geo.properties.name
                  );
                  found.length &&
                    navigate(
                      `/${found[0].name}/${found[0].code}/${found[0].language[0].code}`
                    );
                }}
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: { fill: 'hsl(137, 71%, 63%)' },
                  hover: { fill: 'hsl(137, 71%, 83%)' },
                  pressed: { fill: 'hsl(137, 71%, 73%)' },
                }}
              />
            ))
          }
        </Geographies>
        {countries.map((country) => {
          return (
            <Marker
              key={country.code}
              coordinates={[country.longitude, country.latitude]}
            >
              <text textAnchor="middle">
                <Link
                  to={`/${country.name}/${country.code}/${country.language[0].code}`}
                >
                  {country.name}
                </Link>
              </text>
            </Marker>
          );
        })}
      </ComposableMap>
    </>
  );
}
