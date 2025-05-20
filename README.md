# 이벤트/보상 관리 플랫폼

## 프로젝트 개요

이 프로젝트는 NestJS 기반의 이벤트/보상 관리 플랫폼으로, 실제 서비스에 적용 가능한 구조와 실무 패턴을 학습하기 위해 설계되었습니다. 이벤트 생성, 보상 정의, 유저 보상 요청, 관리자 및 감사자 확인 기능을 제공합니다.

- **MSA(Microservice Architecture)** 구조로 Gateway, Auth, Event 세 개의 서버로 분리
- **기술 스택**: Node.js 18, NestJS 최신, MongoDB, JWT 인증, Docker/Docker Compose, TypeScript
- **구성**: turborepo 기반 mono-repo, 공통 설정(global-util), DTO 타입(repo-types) 분리

---

## 디렉토리 구조 및 공통 설정

- **turborepo**를 활용해 각 서비스(Gateway, Auth, Event)를 개별 패키지로 관리
- **global-util**: tsconfig 등 공통 TypeScript 설정 및 유틸리티 코드 위치
- **repo-types**: 서비스 간 공유되는 DTO 및 타입 정의

---

## 서비스별 역할

| 서버명          | 주요 역할                                                         |
|----------------|-------------------------------------------------------------------|
| Gateway Server | 모든 API 요청 진입점, JWT 인증 및 역할 검사, 라우팅                |
| Auth Server    | 유저 등록/로그인/역할 관리, JWT 발급 및 검증                       |
| Event Server   | 이벤트/보상 등록 및 조회, 유저 보상 요청 처리, 지급 상태 관리       |

---

## 주요 기능

- **이벤트 등록/조회**: 운영자/관리자가 이벤트 생성, 조건/기간/상태 포함
- **보상 등록/조회**: 이벤트별 보상 정의(포인트, 아이템, 쿠폰 등), 수량 관리
- **유저 보상 요청**: 유저가 조건 충족 시 보상 요청, 중복 방지 및 상태 기록
- **보상 요청 내역 확인**: 유저별/전체 이력 조회, 역할별 접근 제어

---

## 인증 및 권한

- **JWT 기반 인증**: Auth Server에서 JWT 발급 및 검증
- **역할(Role) 기반 권한 제어**: USER, OPERATOR, AUDITOR, ADMIN

---

## 실행 방법
| 사전 local에 mongodb 설치 필요합니다 (시간 부족으로 세팅하지 못함)

1. 의존성 설치
   ```bash
   npm i && turbo dev
   ```
2. Docker Compose로 전체 서비스 실행
   ```bash
   docker compose up -d
   ```
    - 각 서비스는 Docker 컨테이너로 구동됩니다. (경로 문제로 미완입니다.)

---

## 구현 현황

- **Auth Server**: 유저 등록, 로그인, 역할 관리, JWT 발급까지 구현 완료
- **Event Server**: 미구현(향후 이벤트/보상 등록, 유저 보상 요청 기능 추가 예정)
- **공통 타입/설정**: global-util, repo-types로 분리 관리

---

## 참고 및 주의사항

- **passport 미사용**: 인증/권한 로직은 NestJS 기본 기능 또는 커스텀 미들웨어로 처리
- **환경 변수 미적용**: 현재 환경 변수 관리 미구현(보안 및 배포 환경 구성 시 주의 필요)

---

## 향후 계획

- Event Server 기능 구현(이벤트/보상 등록, 유저 보상 요청, 이력 조회 등)
- 테스트 코드 추가(서비스 간 책임 분리 테스트)
- 환경 변수 및 보안 설정 보완

