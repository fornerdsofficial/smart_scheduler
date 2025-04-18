// 로그인 및 회원가입 관련 스크립트

document.addEventListener('DOMContentLoaded', function() {
    // 로그인/회원가입 폼 전환
    const showSignupBtn = document.getElementById('show-signup');
    const showLoginBtn = document.getElementById('show-login');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    if (showSignupBtn) {
      showSignupBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
      });
    }
    
    if (showLoginBtn) {
      showLoginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
      });
    }
    
    // 로그인 폼 제출 처리
    const loginFormElement = loginForm && loginForm.querySelector('form');
    if (loginFormElement) {
      loginFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('로그인 시도');
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        console.log('이메일:', email, '비밀번호:', password);
        
        if (!email || !password) {
          alert('이메일과 비밀번호를 모두 입력해주세요.');
          return;
        }
        
        // 간단한 데모 로그인 처리
        if (email === 'demo@example.com' && password === 'password') {
          alert('로그인 성공! 대시보드로 이동합니다.');
          
          // 로그인 상태 저장
          localStorage.setItem('user', JSON.stringify({
            name: '홍길동',
            email: email,
            isLoggedIn: true
          }));
          
          // 대시보드로 리디렉션
          window.location.href = 'dashboard.html';
        } else {
          alert('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
      });
    }
    
    // 이미 로그인된 사용자 처리
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user && user.isLoggedIn) {
          // 이미 로그인된 경우 대시보드로 리디렉션
          window.location.href = 'dashboard.html';
        }
      }
    } catch (e) {
      console.error('로그인 체크 오류:', e);
    }
  });