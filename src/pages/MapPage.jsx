import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import Papa from 'papaparse';
import L from 'leaflet';

// 내 위치 전용 파란색 마커 아이콘
const userIcon = new L.Icon({
  iconUrl: '/userMarker.png', // public 폴더 기준 경로
  iconSize: [80, 80], // 이미지 크기에 맞춰 조절
  popupAnchor: [0, -40]
});
const locationIcon = new L.Icon({
  iconUrl: '/locationMarker.png', // public 폴더 기준 경로
  iconSize: [60, 60], // 이미지 크기에 맞춰 조절
  popupAnchor: [0, -30]
});


// 두 좌표 사이의 실제 거리(km)를 구하는 함수
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // 지구 반지름 (km)
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1); // 소수점 첫째자리까지
}

function RecenterAutomatically({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) map.setView([lat, lng], 13);
  }, [lat, lng]);
  return null;
}

export default function MapPage() {
  const [centers, setCenters] = useState([]);
  const [userPos, setUserPos] = useState(null);
  const [nearestList, setNearestList] = useState([]); // 가까운 3곳 저장

  useEffect(() => {
    Papa.parse("/data/blood_centers.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => setCenters(results.data),
    });

    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error(err)
    );
  }, []);

  // 내 위치가 잡히면 거리순으로 정렬하여 상위 3개 추출
  useEffect(() => {
    if (userPos && centers.length > 0) {
      const sorted = centers
        .map(center => {
          const dist = getDistance(userPos[0], userPos[1], parseFloat(center.Latitude), parseFloat(center.Longitude));
          return { ...center, distance: parseFloat(dist) };
        })
        .sort((a, b) => a.distance - b.distance) // 거리순 정렬
        .slice(0, 3); // 상위 3개

      setNearestList(sorted);
    }
  }, [userPos, centers]);

  return (
    <div style={{ height: 'calc(100vh - 120px)', width: '100%', position: 'relative' }}>
      {/* 상단 3곳 안내 패널 */}
      {nearestList.length > 0 && (
        <div style={styles.nearestPanel}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '14px' }}>가장 가까운 헌혈의 집들</h4>
          {nearestList.map((c, i) => (
            <div key={i} style={styles.item}>
              <span>{i + 1}. {c.헌혈의집}</span>
              <span style={styles.dist}>{c.distance}km</span>
            </div>
          ))}
        </div>
      )}

      <MapContainer center={[37.5665, 126.9780]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {userPos && <RecenterAutomatically lat={userPos[0]} lng={userPos[1]} />}
        {userPos && (
            <Marker position={userPos} icon={userIcon}>
                <Popup>
                <strong>현재 내 위치</strong>
                </Popup>
            </Marker>
        )}

        {centers.map((center, idx) => {
          const lat = parseFloat(center.Latitude);
          const lng = parseFloat(center.Longitude);
          if (isNaN(lat) || isNaN(lng)) return null;

          return (
            <Marker key={idx} position={[lat, lng]} icon={locationIcon}>
              <Popup>
                <strong>{center.헌혈의집}</strong><br />
                {center.주소지}<br />
                ☎: {center.전화번호}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

const styles = {
  nearestPanel: {
    position: 'absolute', top: '20px', right: '20px', zIndex: 1000,
    backgroundColor: 'white', padding: '15px', borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)', width: '220px'
  },
  item: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' },
  dist: { color: '#e63946', fontWeight: 'bold' }
};
