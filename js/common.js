// 공통 유틸리티 함수 및 이벤트 처리

document.addEventListener('DOMContentLoaded', function() {
  // 토스트 메시지 표시 함수
  window.showToast = function(message, type = 'info', duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    // 메시지 타입에 따른 아이콘 추가
    let icon = '';
    switch (type) {
      case 'success':
        icon = '<i class="fas fa-check-circle"></i> ';
        break;
      case 'error':
        icon = '<i class="fas fa-times-circle"></i> ';
        break;
      case 'warning':
        icon = '<i class="fas fa-exclamation-circle"></i> ';
        break;
      default:
        icon = '<i class="fas fa-info-circle"></i> ';
    }
    
    // 토스트 메시지 내용 설정
    toast.innerHTML = `<p>${icon}${message}</p>`;
    
    // 토스트 메시지 스타일 설정
    toast.style.display = 'block';
    toast.classList.add('show');
    
    // 타입에 따른 배경색 설정
    switch (type) {
      case 'success':
        toast.style.backgroundColor = 'var(--success-color)';
        toast.style.color = 'white';
        break;
      case 'error':
        toast.style.backgroundColor = 'var(--danger-color)';
        toast.style.color = 'white';
        break;
      case 'warning':
        toast.style.backgroundColor = 'var(--warning-color)';
        toast.style.color = 'white';
        break;
      default:
        toast.style.backgroundColor = 'var(--bg-white)';
        toast.style.color = 'var(--text-dark)';
    }
    
    // 일정 시간 후 토스트 메시지 숨기기
    setTimeout(function() {
      toast.classList.remove('show');
      setTimeout(function() {
        toast.style.display = 'none';
      }, 300);
    }, duration);
  };
  
  // 모달 관련 함수
  window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // 스크롤 방지
  };
  
  window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    modal.classList.remove('show');
    document.body.style.overflow = ''; // 스크롤 복원
  };
  
  // 모달 닫기 버튼 이벤트 리스너
  const closeButtons = document.querySelectorAll('.close-modal');
  closeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const modal = button.closest('.modal');
      if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
      }
    });
  });
  
  // 모달 외부 클릭 시 닫기
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
      event.target.classList.remove('show');
      document.body.style.overflow = '';
    }
  });
  
  // 현재 날짜 정보 표시
  const currentDateElements = document.querySelectorAll('.date');
  if (currentDateElements.length > 0) {
    const now = new Date();
    const formattedDate = now.getFullYear() + '년 ' + 
                          (now.getMonth() + 1) + '월 ' + 
                          now.getDate() + '일 ' + 
                          ['일', '월', '화', '수', '목', '금', '토'][now.getDay()] + '요일';
    
    currentDateElements.forEach(function(element) {
      element.textContent = formattedDate;
    });
  }
  
  // 설정 탭 전환 기능
  const settingsTabs = document.querySelectorAll('.settings-nav li');
  if (settingsTabs.length > 0) {
    settingsTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        // 활성 탭 변경
        settingsTabs.forEach(function(t) {
          t.classList.remove('active');
        });
        tab.classList.add('active');
        
        // 탭 컨텐츠 변경
        const tabId = tab.getAttribute('data-tab');
        const tabContent = document.querySelectorAll('.settings-tab');
        
        tabContent.forEach(function(content) {
          content.classList.remove('active');
        });
        
        document.getElementById(tabId + '-tab').classList.add('active');
      });
    });
  }
  
  // 공통 메시지 처리 (필요한 경우 URL 파라미터에서 메시지 추출)
  const urlParams = new URLSearchParams(window.location.search);
  const message = urlParams.get('message');
  const messageType = urlParams.get('type');
  
  if (message) {
    window.showToast(message, messageType || 'info');
  }
});

// 날짜 포맷팅 함수
function formatDate(date, format = 'YYYY-MM-DD') {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes);
}

// 시간 형식 변환 (24시간 -> 12시간)
function formatTime(time24) {
  const [hours, minutes] = time24.split(':');
  const period = hours >= 12 ? '오후' : '오전';
  const hours12 = hours % 12 || 12;
  
  return `${period} ${hours12}:${minutes}`;
}

// 로컬 스토리지 유틸리티
const Storage = {
  get: function(key, defaultValue = null) {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : defaultValue;
  },
  set: function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: function(key) {
    localStorage.removeItem(key);
  },
  clear: function() {
    localStorage.clear();
  }
};
