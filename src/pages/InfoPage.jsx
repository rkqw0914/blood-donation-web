export default function InfoPage() {
  return (
    <div style={{ maxWidth: '50rem', margin: '0rem auto', padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
      
      {/* 1. 헌혈의 정의 */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.75rem', borderBottom: '2px solid grey', paddingBottom: '0.5rem' }}>헌혈이란?</h2>
        <p style={{ color: '#4b5563', lineHeight: '1.625' }}>
          헌혈은 건강한 사람이 수혈이 필요한 환자를 위해 자유 의사에 따라 자신의 혈액을 기증하는 
          {/* 볼드와 색상 적용 */}
          <span style={{ fontWeight: 'bold', color: '#ef4444' }}> '생명 나눔'</span> 활동입니다.
        </p>
      </section>

      {/* 2. 헌혈의 필요성 - 연한 빨간색 배경 적용 */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.75rem', borderBottom: '2px solid grey', paddingBottom: '0.5rem' }}>헌혈을 해야하는 이유</h2>
        <p style={{ color: '#4b5563', lineHeight: '1.625' }}>
          대한적십자사 혈액관리본부에 따르면, 적혈구제제 보유량이 5일분 미만일 경우 '혈액 수급 부족' 단계로 분류됩니다.<br />
          현재 평균 보유량은 5일 수준으로 안정적인 상태를 유지하기 위한 경계선에 있습니다.<br />
          특히 우리나라는 휴전 국가로서 재난이나 대규모 인명 피해 발생 시 혈액 수요가 급증할 위험이 있습니다.<br />
          혈액은 유통기한이 짧아 장기 보관이 불가능하므로, 지속적이고 꾸준한 헌혈 참여가 무엇보다 중요합니다.
        </p>
      </section>

      {/* 3. 생생한 헌혈 후기 */}
      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.75rem', borderBottom: '2px solid grey', paddingBottom: '0.5rem' }}>나의 헌혈 경험</h2>
        <p style={{ color: '#4b5563', lineHeight: '1.625' }}>
          직접 헌혈의 집을 방문했을 때, 직원분들의 친절한 안내 덕분에 편안하게 참여할 수 있었습니다.<br />
          '전혈 헌혈'은 약 30분 내외의 짧은 시간이 소요되었고, 우려와 달리 헌혈 후 후유증도 전혀 없었습니다.<br />
          무엇보다 헌혈을 통해 생명을 살리는 동시에, 봉사시간 인정과 다양한 기념품까지 받을 수 있어 정말 뿌듯했습니다.<br />
          더 많은 분이 헌혈을 했으면 좋겠다는 생각이 들어 이 사이트를 만들게 되었습니다.
        </p>
      </section>
    </div>
  );
}
