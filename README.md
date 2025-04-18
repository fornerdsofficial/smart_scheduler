# 스마트 스케줄러 (Smart Scheduler)

스마트 스케줄러는 AI 기반의 일정 관리 및 최적화 서비스를 제공하는, 반응형 웹 애플리케이션 모킹 프로젝트입니다. 자연어 입력, 다중 참석자 일정 조율, 그리고 AI 기반 일정 최적화 등의 핵심 기능을 갖추고 있습니다.

## 주요 기능

- **자연어 일정 입력**: 일상 언어로 일정을 입력하면 AI가 분석하여 구조화된 일정으로 변환
- **다중 참석자 일정 조율**: 여러 참석자의 일정을 분석하여 최적의 미팅 시간 추천
- **일정 최적화**: 이동 시간, 준비 시간 등을 고려한 지능적 일정 관리
- **개인화된 알림 설정**: 다양한 채널과 시점에 따른 맞춤형 알림 기능
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 등 다양한 디바이스 지원

## 페이지 구성

1. **로그인 / 회원가입 페이지**: 사용자 인증 및 가입 처리
2. **메인 대시보드**: 오늘 일정, 주간 일정, AI 추천 일정 표시
3. **일정 생성 / 자연어 입력 페이지**: 자연스러운 언어로 일정 입력 및 분석
4. **다중 참석자 일정 조율 페이지**: 여러 참석자의 일정 통합 분석 및 최적 시간 제안
5. **일정 상세 / 최적화 페이지**: 일정 세부 정보 확인 및 최적화 옵션 설정
6. **알림 설정 페이지**: 알림 방식, 시점, 중요도별 설정
7. **설정 / 사용자 계정 관리 페이지**: 프로필, 보안, 연동 서비스, 앱 환경설정 관리

## 기술 스택

- **프론트엔드**: HTML5, CSS3, JavaScript (바닐라)
- **디자인**: 커스텀 UI 컴포넌트 및 반응형 디자인
- **아이콘**: Font Awesome
- **저장소**: 로컬 스토리지 (데모용)

## 설치 및 실행

1. 저장소 클론
```bash
git clone https://github.com/yourusername/smart-scheduler.git
cd smart-scheduler
```

2. 웹 서버 실행 (예: Python의 SimpleHTTPServer 사용)
```bash
# Python 3
python -m http.server

# Python 2
python -m SimpleHTTPServer
```

3. 브라우저에서 접속
```
http://localhost:8000
```

## 데모 계정

- **이메일**: demo@example.com
- **비밀번호**: password

## 프로젝트 구조

```
scheduler-mockup/
├── css/
│   ├── style.css        # 공통 스타일
│   ├── login.css        # 로그인 페이지 스타일
│   ├── dashboard.css    # 대시보드 및 공통 레이아웃 스타일
│   └── calendar.css     # 캘린더 관련 스타일
├── js/
│   ├── common.js        # 공통 유틸리티 함수
│   ├── login.js         # 로그인/회원가입 관련 스크립트
│   ├── scheduler.js     # 일정 관리 관련 스크립트
│   └── calendar.js      # 캘린더 기능 관련 스크립트
├── assets/
│   └── default-avatar.png # 기본 프로필 이미지
├── index.html           # 로그인/회원가입 페이지
├── dashboard.html       # 메인 대시보드
├── create-schedule.html # 일정 생성/자연어 입력
├── multi-attendee.html  # 다중 참석자 일정 조율
├── schedule-detail.html # 일정 상세/최적화
├── notification.html    # 알림 설정
├── settings.html        # 설정/사용자 계정 관리
└── README.md            # 프로젝트 설명
```

## 참고사항

- 이 프로젝트는 모킹 목적으로 만들어졌으며, 실제 기능은 구현되어 있지 않습니다.
- 로컬 스토리지를 통해 간단한 상태 관리를 제공하여 로그인, 설정 저장 등의 기능을 시뮬레이션합니다.
- 실제 서비스 개발 시에는 백엔드 API와 연동하여 기능을 구현해야 합니다.

## 향후 개발 계획

- 백엔드 API 연동
- 실제 AI 자연어 처리 기능 구현
- 외부 캘린더 서비스(Google, Outlook 등)와의 연동
- 모바일 앱 버전 개발

## 기여하기

1. 이 저장소를 포크합니다.
2. 새 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`).
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`).
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`).
5. Pull Request를 생성합니다.

## 라이선스

이 프로젝트는 MIT 라이선스에 따라 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.