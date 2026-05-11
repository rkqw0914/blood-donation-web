import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

export default function StatusPage() {
  // 1. 왼쪽 막대 그래프 데이터 (혈액형별 보유량)
  const barData = {
    labels: ['A형', 'B형', 'O형', 'AB형'],
    datasets: [
      {
        label: '현재 보유 상태 (일수)',
        data: [4.4, 6.5, 4.8, 5.7],
        backgroundColor: '#ff4d4d',
        borderRadius: 8,
      },
    ],
  };

  // 2. 오른쪽 꺾은선 그래프 데이터 (2달치 추이 - 60일 예시 데이터)
  const lineData = {
    // 가로로 촘촘하게 하기 위해 60일치 라벨 생성
    labels: Array.from({ length: 60 }, (_, i) => `${i + 1}일`),
    datasets: [
      {
        label: '적혈구제제 보유 현황 추이',
        data: [
          18000, 19500, 17500, 21000, 23000, 21500, 19500, 19000, 20500, 22000, 
          23500, 21000, 19500, 20000, 21500, 23000, 24500, 22500, 21000, 20500,
          20000, 21500, 22500, 20000, 18500, 17000, 16000, 18500, 19500, 18000,
          17500, 16000, 15000, 16500, 17500, 18500, 17000, 16500, 17500, 18500,
          19500, 20500, 21000, 20000, 20500, 21000, 22000, 21500, 20000, 19500,
          20500, 22000, 23500, 25000, 24000, 23000, 22000, 24000, 25500, 27000
        ],
        borderColor: '#3b82f6',
        borderWidth: 2,
        tension: 0, // 너무 굴곡지지 않게 조절
        pointRadius: 1, // 데이터가 많으므로 점 크기를 최소화하여 촘촘하게 표현
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        max: 8,
        ticks: { stepSize: 1 },
        grid: {
          // 색상을 결정하는 함수를 작성합니다.
          color: (context) => {
            // 눈금의 값(tick.value)이 5인 경우만 빨간색, 나머지는 연한 회색
            return context.tick.value === 5 ? '#ff0000' : '#e5e7eb';
          },
          // 선의 굵기도 5일 때만 더 굵게 만들 수 있습니다.
          lineWidth: (context) => {
            return context.tick.value === 5 ? 2 : 1;
          }
        }
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.mainTitle}>혈액 보유 및 수급 현황</h2>
      
      {/* 두 그래프를 나란히 놓는 컨테이너 */}
      <div style={styles.chartFlexContainer}>
        {/* 왼쪽: 막대 그래프 */}
        <div style={styles.barWrapper}>
          <h3 style={styles.chartTitle}>혈액형별 보유 현황 <span style={{ fontWeight: 'bold', color: '#9c9c9c' }}>(5/11 기준)</span></h3>
          <Bar data={barData} options={commonOptions} />
        </div>

        {/* 오른쪽: 2달치 추이 그래프 (가로로 길게) */}
        <div style={styles.lineWrapper}>
          <h3 style={styles.chartTitle}>적혈구제제 보유 현황 추이 <span style={{ fontWeight: 'bold', color: '#9c9c9c' }}>(4/12 ~ 5/11)</span></h3>
          <Line data={lineData} options={{
            ...commonOptions,
            scales: {
              x: { ticks: { display: false } }, // 데이터가 너무 많아 라벨은 숨김 (마우스 오버로 확인)
              y: { min: 10000, max: 30000 }
            }
          }} />
        </div>
      </div>

      <div style={styles.infoBox}>
        {/*<p><strong>적정 보유량: 5일분</strong></p>
        <p>현재 A형과 O형의 관심이 필요합니다.</p> */}
        <p>출처: 대한적십자사 혈액관리본부</p>
        </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px', backgroundColor: '#f9fafb', borderRadius: '15px' },
  mainTitle: { textAlign: 'center', marginBottom: '30px', color: '#1f2937' },
  chartFlexContainer: {
    display: 'flex',
    flexDirection: 'row', // 가로 배치
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap' // 화면이 좁아지면 아래로 내려가도록 설정
  },
  barWrapper: {
    flex: '1', // 1:2 비율 중 1 차지
    minWidth: '300px',
    height: '350px',
    backgroundColor: '#fff',
    padding: '20px',
    paddingBottom: '50px',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
  },
  lineWrapper: {
    flex: '2', // 1:2 비율 중 2 차지 (더 넓게)
    minWidth: '500px',
    height: '350px',
    backgroundColor: '#fff',
    padding: '20px',
    paddingBottom: '50px',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
  },
  chartTitle: { fontSize: '15px', textAlign: 'center', marginBottom: '0px', color: '#4b5563' },
  infoBox: { marginTop: '30px', textAlign: 'left', color: '#6b7280', fontSize: '14px' }
};
