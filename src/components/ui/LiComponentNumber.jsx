import React, { useEffect, useState } from 'react';
import { load } from '@2gis/mapgl';

export default function LiComponentNumber({ el }) {
  const [mapInstance, setMapInstance] = useState();
  const [showMap, setShowMap] = useState(false);
  const [geoCode, setGeoCod] = useState({});
  const showMapBtn = () => {
    setShowMap(true);
  };
  const clozeMapBtn = () => {
    setShowMap(false);
  };
  let map;
  useEffect(() => {
    if (showMap) {
      fetch(`api/v1/map/geo/${el.id}`)
        .then((res) => res.json())
        .then((data) => setGeoCod(data));
    }
    // return () => map && map.destroy();
  }, [showMap]);

  useEffect(() => {
    if (showMap) {
      load().then((mapglAPI) => {
        map = new mapglAPI.Map('map-container', {
          center: [geoCode.lon, geoCode.lat],
          zoom: 9,
          key: '486c5922-c3f3-4aec-9dee-554a93d8ed78',
        });
        const marker = new mapglAPI.Marker(map, {
          coordinates: [geoCode.lon, geoCode.lat],
        });
      });
      setMapInstance(map);
    }
  }, [geoCode]);

  useEffect(() => {
    console.log(geoCode);
  }, [geoCode]);
  return (
    <>
      <b>Кампания:</b>
      {el.company}
      <p />
      <b>Номер телефона:</b>
      {el.phone}
      <p />
      {showMap ? (
        <>
          <div style={{ width: '880px', height: '250px', textAlign: 'center' }}>
            <div id="map-container" style={{ width: '100%', height: '100%' }} />
          </div>
          <p />
          <button type="button" onClick={clozeMapBtn} className="btn btn-outline-warning">Скрыть</button>
        </>
      ) : (
        <button type="button" onClick={showMapBtn} className="btn btn-outline-warning">Показать на карте</button>
      )}
    </>
  );
}
