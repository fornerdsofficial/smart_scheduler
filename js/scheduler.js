// 스케줄러 관련 기능

document.addEventListener('DOMContentLoaded', function() {
  // 사용자 인증 확인
  const user = Storage.get('user');
  
  // 로그인 페이지가 아니고, 인증되지 않은 사용자인 경우 로그인 페이지로 리디렉션
  if (!window.location.pathname.includes('index.html') && (!user || !user.isLoggedIn)) {
    window.location.href = 'index.html';
    return;
  }
  
  // 로그아웃 기능
  const logoutBtn = document.querySelector('.sidebar-footer a');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // 로그아웃 처리
      Storage.remove('user');
      
      // 로그인 페이지로 리디렉션
      window.location.href = 'index.html?message=로그아웃되었습니다.&type=success';
    });
  }
  
  // 사용자 정보 표시
  const userMenuSpan = document.querySelector('.user-menu span');
  if (userMenuSpan && user) {
    userMenuSpan.textContent = user.name + ' 님';
  }
  
  // ----- 일정 생성 페이지 기능 -----
  if (window.location.pathname.includes('create-schedule.html')) {
    const analyzeBtn = document.getElementById('analyze-btn');
    const clearBtn = document.getElementById('clear-btn');
    const naturalInput = document.getElementById('natural-input');
    const schedulePreview = document.getElementById('schedule-preview');
    const voiceInputBtn = document.getElementById('voice-input');
    const recordingModal = document.getElementById('recording-modal');
    const stopRecordingBtn = document.getElementById('stop-recording');
    const saveScheduleBtn = document.getElementById('save-schedule');
    
    // 자연어 분석 버튼 클릭 이벤트
    if (analyzeBtn) {
      analyzeBtn.addEventListener('click', function() {
        const inputText = naturalInput.value.trim();
        
        if (!inputText) {
          showToast('일정을 입력해주세요.', 'warning');
          return;
        }
        
        // 로딩 상태 표시
        analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 분석 중...';
        analyzeBtn.disabled = true;
        
        // 자연어 분석 시뮬레이션 (실제로는 AI 서비스 호출 필요)
        setTimeout(function() {
          // 분석 완료 후 UI 복원
          analyzeBtn.innerHTML = '<i class="fas fa-magic"></i> 일정 분석하기';
          analyzeBtn.disabled = false;
          
          // 예시 분석 결과 표시
          schedulePreview.classList.remove('hidden');
          
          // 분석 성공 메시지
          showToast('일정이 성공적으로 분석되었습니다.', 'success');
          
          // 페이지 스크롤 이동
          schedulePreview.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
      });
    }
    
    // 입력 지우기 버튼
    if (clearBtn) {
      clearBtn.addEventListener('click', function() {
        naturalInput.value = '';
        naturalInput.focus();
      });
    }
    
    // 음성 입력 버튼
    if (voiceInputBtn) {
      voiceInputBtn.addEventListener('click', function() {
        openModal('recording-modal');
        
        // 실제 기능은 구현되지 않음 (브라우저 API 필요)
        // 대신 시뮬레이션만 제공
      });
    }
    
    // 녹음 중지 버튼
    if (stopRecordingBtn) {
      stopRecordingBtn.addEventListener('click', function() {
        closeModal('recording-modal');
        
        // 가상의 음성 인식 결과 반영
        naturalInput.value = '다음 주 월요일 오전 10시에 회의실 A에서 팀 회의 잡아줘';
        
        showToast('음성이 텍스트로 변환되었습니다.', 'success');
      });
    }
    
    // 일정 저장 버튼
    if (saveScheduleBtn) {
      saveScheduleBtn.addEventListener('click', function() {
        // 간단한 유효성 검사
        const title = document.getElementById('title-preview').value;
        
        if (!title) {
          showToast('일정 제목을 입력해주세요.', 'error');
          return;
        }
        
        // 저장 성공 메시지
        showToast('일정이 성공적으로 저장되었습니다.', 'success');
        
        // 대시보드로 리디렉션
        setTimeout(function() {
          window.location.href = 'dashboard.html?message=새 일정이 생성되었습니다.&type=success';
        }, 1500);
      });
    }
  }
  
  // ----- 다중 참석자 페이지 기능 -----
  if (window.location.pathname.includes('multi-attendee.html')) {
    const createMeetingBtn = document.getElementById('create-meeting');
    const reCalculateBtn = document.getElementById('re-calculate');
    const timePreference = document.querySelectorAll('input[name="time-preference"]');
    const timeCells = document.querySelectorAll('.time-cell');
    
    // 타임셀 클릭 이벤트
    if (timeCells.length > 0) {
      timeCells.forEach(function(cell) {
        cell.addEventListener('click', function() {
          // 이미 불가능한 시간은 클릭 무시
          if (cell.classList.contains('busy')) return;
          
          // 선택/해제 토글
          cell.classList.toggle('optimal');
        });
      });
    }
    
    // 시간 선호도 변경 이벤트
    if (timePreference.length > 0) {
      timePreference.forEach(function(radio) {
        radio.addEventListener('change', function() {
          showToast(`${radio.nextElementSibling.textContent.trim()} 선호도가 설정되었습니다.`, 'info');
        });
      });
    }
    
    // 재계산 버튼
    if (reCalculateBtn) {
      reCalculateBtn.addEventListener('click', function() {
        // 로딩 상태 표시
        reCalculateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 계산 중...';
        reCalculateBtn.disabled = true;
        
        // 재계산 시뮬레이션
        setTimeout(function() {
          // UI 복원
          reCalculateBtn.innerHTML = '<i class="fas fa-sync"></i> 다시 계산하기';
          reCalculateBtn.disabled = false;
          
          // 기존 optimal 클래스 제거
          document.querySelectorAll('.time-cell.optimal').forEach(function(cell) {
            cell.classList.remove('optimal');
          });
          
          // 새로운 최적 시간 표시 (랜덤하게 몇 개 선택)
          const availableCells = Array.from(document.querySelectorAll('.time-cell.available:not(.busy)'));
          
          // 랜덤하게 2-3개 셀 선택
          const numToSelect = 2 + Math.floor(Math.random() * 2);
          
          for (let i = 0; i < numToSelect && i < availableCells.length; i++) {
            const randomIndex = Math.floor(Math.random() * availableCells.length);
            availableCells[randomIndex].classList.add('optimal');
            availableCells.splice(randomIndex, 1); // 선택된 항목 제거
          }
          
          showToast('일정이 재계산되었습니다.', 'success');
        }, 1500);
      });
    }
    
    // 일정 생성 버튼
    if (createMeetingBtn) {
      createMeetingBtn.addEventListener('click', function() {
        // 선택된 최적 시간이 있는지 확인
        const optimalCells = document.querySelectorAll('.time-cell.optimal');
        
        if (optimalCells.length === 0) {
          showToast('최적 시간을 선택해주세요.', 'warning');
          return;
        }
        
        showToast('선택한 시간으로 일정을 생성합니다.', 'success');
        
        // 대시보드로 리디렉션
        setTimeout(function() {
          window.location.href = 'dashboard.html?message=다중 참석자 일정이 생성되었습니다.&type=success';
        }, 1500);
      });
    }
  }
  
  // ----- 일정 상세/최적화 페이지 기능 -----
  if (window.location.pathname.includes('schedule-detail.html')) {
    const optimizeToggle = document.getElementById('optimize-toggle');
    const travelTimeToggle = document.getElementById('travel-time-toggle');
    const prepTimeToggle = document.getElementById('prep-time-toggle');
    const bufferToggle = document.getElementById('buffer-toggle');
    
    // 최적화 토글 이벤트
    if (optimizeToggle) {
      optimizeToggle.addEventListener('change', function() {
        const optimizationOptions = document.querySelector('.optimization-options');
        const adjacentSchedules = document.querySelector('.adjacent-schedules');
        
        if (this.checked) {
          optimizationOptions.style.display = 'block';
          adjacentSchedules.style.display = 'block';
          showToast('일정 최적화가 활성화되었습니다.', 'success');
        } else {
          optimizationOptions.style.display = 'none';
          adjacentSchedules.style.display = 'none';
          showToast('일정 최적화가 비활성화되었습니다.', 'info');
        }
      });
    }
    
    // 이동 시간 토글 이벤트
    if (travelTimeToggle) {
      travelTimeToggle.addEventListener('change', function() {
        const travelTimeDetail = document.querySelector('.travel-time-detail');
        
        if (this.checked) {
          travelTimeDetail.style.display = 'block';
          showToast('이동 시간이 일정에 반영되었습니다.', 'info');
        } else {
          travelTimeDetail.style.display = 'none';
          showToast('이동 시간이 제외되었습니다.', 'info');
        }
      });
    }
    
    // 준비 시간 토글 이벤트
    if (prepTimeToggle) {
      prepTimeToggle.addEventListener('change', function() {
        const prepTimeDetail = document.querySelector('.prep-time-detail');
        
        if (this.checked) {
          prepTimeDetail.style.display = 'block';
          showToast('준비 시간이 일정에 반영되었습니다.', 'info');
        } else {
          prepTimeDetail.style.display = 'none';
          showToast('준비 시간이 제외되었습니다.', 'info');
        }
      });
    }
    
    // 버퍼 시간 토글 이벤트
    if (bufferToggle) {
      bufferToggle.addEventListener('change', function() {
        if (this.checked) {
          showToast('일정 앞뒤로 10분의 버퍼 시간이 추가되었습니다.', 'info');
        } else {
          showToast('버퍼 시간이 제거되었습니다.', 'info');
        }
      });
    }
  }
  
  // ----- 알림 설정 페이지 기능 -----
  if (window.location.pathname.includes('notification.html')) {
    const allNotifications = document.getElementById('all-notifications');
    const notificationToggles = document.querySelectorAll('.settings-item .toggle-switch input');
    const saveNotificationsBtn = document.getElementById('save-notifications');
    const resetNotificationsBtn = document.getElementById('reset-notifications');
    const requestPermissionBtn = document.getElementById('request-permission');
    
    // 모든 알림 토글 이벤트
    if (allNotifications) {
      allNotifications.addEventListener('change', function() {
        const isChecked = this.checked;
        
        // 모든 토글에 상태 적용
        notificationToggles.forEach(function(toggle) {
          if (toggle.id !== 'all-notifications') {
            toggle.checked = isChecked;
            toggle.disabled = !isChecked;
          }
        });
        
        showToast(isChecked ? '모든 알림이 활성화되었습니다.' : '모든 알림이 비활성화되었습니다.', 'info');
      });
    }
    
    // 알림 설정 저장 버튼
    if (saveNotificationsBtn) {
      saveNotificationsBtn.addEventListener('click', function() {
        // 알림 설정을 로컬 스토리지에 저장 (실제 서비스에서는 서버에 저장)
        const settings = {
          allNotifications: allNotifications.checked,
          scheduleNotifications: document.getElementById('schedule-notifications').checked,
          invitationNotifications: document.getElementById('invitation-notifications').checked,
          changeNotifications: document.getElementById('change-notifications').checked,
          aiNotifications: document.getElementById('ai-notifications').checked,
          timing: {
            min10: document.getElementById('time-10min').checked,
            min30: document.getElementById('time-30min').checked,
            hour1: document.getElementById('time-1hour').checked,
            day1: document.getElementById('time-1day').checked
          }
        };
        
        Storage.set('notificationSettings', settings);
        showToast('알림 설정이 저장되었습니다.', 'success');
      });
    }
    
    // 알림 설정 초기화 버튼
    if (resetNotificationsBtn) {
      resetNotificationsBtn.addEventListener('click', function() {
        if (confirm('알림 설정을 기본값으로 초기화하시겠습니까?')) {
          // 모든 토글을 기본값으로 초기화
          allNotifications.checked = true;
          
          notificationToggles.forEach(function(toggle) {
            if (toggle.id === 'all-notifications') return;
            
            // 기본적으로 중요 알림은 켜고, 나머지는 꺼놓음
            if (['schedule-notifications', 'invitation-notifications', 'change-notifications'].includes(toggle.id)) {
              toggle.checked = true;
            } else {
              toggle.checked = false;
            }
            
            toggle.disabled = false;
          });
          
          // 시간 설정 초기화
          document.getElementById('time-10min').checked = true;
          document.getElementById('time-30min').checked = true;
          document.getElementById('time-1hour').checked = false;
          document.getElementById('time-1day').checked = false;
          
          showToast('알림 설정이 기본값으로 초기화되었습니다.', 'success');
        }
      });
    }
    
    // 브라우저 알림 권한 요청 버튼
    if (requestPermissionBtn) {
      requestPermissionBtn.addEventListener('click', function() {
        // 브라우저 Notifications API 지원 여부 확인
        if ('Notification' in window) {
          Notification.requestPermission().then(function(permission) {
            if (permission === 'granted') {
              showToast('알림 권한이 허용되었습니다.', 'success');
              
              // 테스트 알림 표시
              new Notification('스마트 스케줄러', {
                body: '알림 설정이 완료되었습니다.',
                icon: 'https://via.placeholder.com/64'
              });
            } else {
              showToast('알림 권한이 거부되었습니다. 브라우저 설정에서 변경할 수 있습니다.', 'error');
            }
          });
        } else {
          showToast('이 브라우저는 알림 기능을 지원하지 않습니다.', 'error');
        }
      });
    }
  }
  
  // ----- 설정 페이지 기능 -----
  if (window.location.pathname.includes('settings.html')) {
    const saveProfileBtn = document.querySelector('.profile-form .btn-primary');
    const changePasswordBtn = document.querySelector('.account-settings .btn-primary');
    const deleteAccountBtn = document.querySelector('.danger-zone .btn-danger');
    const themeOptions = document.querySelectorAll('input[name="theme"]');
    const colorOptions = document.querySelectorAll('input[name="accent"]');
    
    // 프로필 저장 버튼
    if (saveProfileBtn) {
      saveProfileBtn.addEventListener('click', function() {
        // 간단한 유효성 검사
        const name = document.getElementById('profile-name').value;
        const email = document.getElementById('profile-email').value;
        
        if (!name || !email) {
          showToast('이름과 이메일은 필수 입력 항목입니다.', 'error');
          return;
        }
        
        // 이메일 형식 검증
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          showToast('유효한 이메일 주소를 입력해주세요.', 'error');
          return;
        }
        
        // 사용자 정보 업데이트
        const user = Storage.get('user');
        if (user) {
          user.name = name;
          user.email = email;
          Storage.set('user', user);
          
          // 화면에 반영
          const userMenuSpan = document.querySelector('.user-menu span');
          if (userMenuSpan) {
            userMenuSpan.textContent = name + ' 님';
          }
        }
        
        showToast('프로필 정보가 업데이트되었습니다.', 'success');
      });
    }
    
    // 비밀번호 변경 버튼
    if (changePasswordBtn) {
      changePasswordBtn.addEventListener('click', function() {
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (!currentPassword || !newPassword || !confirmPassword) {
          showToast('모든 필드를 입력해주세요.', 'error');
          return;
        }
        
        if (newPassword !== confirmPassword) {
          showToast('새 비밀번호가 일치하지 않습니다.', 'error');
          return;
        }
        
        if (newPassword.length < 8) {
          showToast('비밀번호는 8자 이상이어야 합니다.', 'error');
          return;
        }
        
        // 현재 비밀번호 확인 (데모에서는 'password'로 가정)
        if (currentPassword !== 'password') {
          showToast('현재 비밀번호가 일치하지 않습니다.', 'error');
          return;
        }
        
        showToast('비밀번호가 성공적으로 변경되었습니다.', 'success');
        
        // 필드 초기화
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';
      });
    }
    
    // 계정 삭제 버튼
    if (deleteAccountBtn) {
      deleteAccountBtn.addEventListener('click', function() {
        if (confirm('정말 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
          if (confirm('모든 데이터가 영구적으로 삭제됩니다. 계속하시겠습니까?')) {
            // 모든 데이터 삭제
            Storage.clear();
            
            showToast('계정이 삭제되었습니다. 로그인 페이지로 이동합니다.', 'info');
            
            // 로그인 페이지로 리디렉션
            setTimeout(function() {
              window.location.href = 'index.html';
            }, 2000);
          }
        }
      });
    }
    
    // 테마 변경 이벤트
    if (themeOptions.length > 0) {
      themeOptions.forEach(function(radio) {
        radio.addEventListener('change', function() {
          const theme = this.id.replace('theme-', '');
          document.body.className = ''; // 기존 클래스 제거
          document.body.classList.add(`theme-${theme}`);
          
          showToast(`${theme.charAt(0).toUpperCase() + theme.slice(1)} 테마가 적용되었습니다.`, 'info');
        });
      });
    }
    
    // 색상 변경 이벤트
    if (colorOptions.length > 0) {
      colorOptions.forEach(function(radio) {
        radio.addEventListener('change', function() {
          const color = this.id.replace('color-', '');
          const root = document.documentElement;
          
          // CSS 변수 업데이트 (실제로는 더 복잡한 색상 계산 필요)
          switch (color) {
            case 'green':
              root.style.setProperty('--primary-color', '#38a169');
              root.style.setProperty('--primary-light', '#68d391');
              root.style.setProperty('--primary-dark', '#2f855a');
              break;
            case 'blue':
              root.style.setProperty('--primary-color', '#3182ce');
              root.style.setProperty('--primary-light', '#63b3ed');
              root.style.setProperty('--primary-dark', '#2c5282');
              break;
            case 'purple':
              root.style.setProperty('--primary-color', '#805ad5');
              root.style.setProperty('--primary-light', '#b794f4');
              root.style.setProperty('--primary-dark', '#553c9a');
              break;
            case 'orange':
              root.style.setProperty('--primary-color', '#dd6b20');
              root.style.setProperty('--primary-light', '#f6ad55');
              root.style.setProperty('--primary-dark', '#c05621');
              break;
            case 'red':
              root.style.setProperty('--primary-color', '#e53e3e');
              root.style.setProperty('--primary-light', '#fc8181');
              root.style.setProperty('--primary-dark', '#c53030');
              break;
          }
          
          showToast(`${color.charAt(0).toUpperCase() + color.slice(1)} 색상 테마가 적용되었습니다.`, 'info');
        });
      });
    }
  }
});
