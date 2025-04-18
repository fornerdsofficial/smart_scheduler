// 캘린더 관련 기능

document.addEventListener('DOMContentLoaded', function() {
  // 캘린더 렌더링
  function renderCalendar(date = new Date()) {
    // 현재 구현되지 않음
    // 실제 서비스에서는 캘린더 UI를 동적으로 생성하고 렌더링하는 코드 필요
  }
  
  // 이벤트 데이터 (예시)
  const events = [
    {
      id: 1,
      title: '팀 주간 미팅',
      start: '2025-04-17T09:00:00',
      end: '2025-04-17T10:00:00',
      location: '회의실 A',
      type: 'meeting',
      attendees: ['홍길동', '김영희', '이철수']
    },
    {
      id: 2,
      title: '프로젝트 기획 회의',
      start: '2025-04-17T13:30:00',
      end: '2025-04-17T14:30:00',
      location: '온라인 (Zoom)',
      type: 'meeting',
      attendees: ['홍길동', '김영희', '박민지']
    },
    {
      id: 3,
      title: '클라이언트 미팅',
      start: '2025-04-17T16:00:00',
      end: '2025-04-17T17:00:00',
      location: '카페 스테이션',
      type: 'meeting',
      attendees: ['홍길동', '이철수']
    },
    {
      id: 4,
      title: '프로젝트 마감일',
      start: '2025-04-22T00:00:00',
      end: '2025-04-22T23:59:59',
      type: 'important'
    },
    {
      id: 5,
      title: '팀 회식',
      start: '2025-04-19T18:00:00',
      end: '2025-04-19T21:00:00',
      location: '서울식당',
      type: 'personal',
      attendees: ['홍길동', '김영희', '이철수', '박민지']
    }
  ];
  
  // 이벤트 클릭 처리
  function handleEventClick(eventId) {
    const event = events.find(e => e.id === eventId);
    
    if (!event) return;
    
    // 실제로는 상세 페이지로 이동하거나 모달 표시
    window.location.href = `schedule-detail.html?id=${eventId}`;
  }
  
  // 날짜 클릭 처리
  function handleDateClick(date) {
    // 실제로는 해당 날짜로 이동하거나 이벤트 생성 모달 표시
    window.location.href = `create-schedule.html?date=${date}`;
  }
  
  // 이벤트 생성 처리
  function createEvent(eventData) {
    // 실제로는 서버에 저장하고 UI에 반영
    // 여기서는 처리하지 않음
  }
  
  // 이벤트 업데이트 처리
  function updateEvent(eventId, eventData) {
    // 실제로는 서버에 업데이트하고 UI에 반영
    // 여기서는 처리하지 않음
  }
  
  // 이벤트 삭제 처리
  function deleteEvent(eventId) {
    // 실제로는 서버에서 삭제하고 UI에서 제거
    // 여기서는 처리하지 않음
  }
  
  // 초기 로드 시 캘린더 렌더링
  renderCalendar();
});
