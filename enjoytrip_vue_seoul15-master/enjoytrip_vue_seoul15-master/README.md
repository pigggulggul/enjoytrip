![header](https://capsule-render.vercel.app/api?type=waving&color=bae0f3&height=300&section=header&text=HanSooTrip✈&fontSize=80&fontAlign=60&fontAlignY=42)

**여행 계획(플랜)을 생성하고, 친구들과 공유해 함께 편집할 수 있는 웹 서비스**

## ⚒️ 화면 구성

### 메인 화면

- 홈페이지 메인 화면 입니다.
- 메인페이지 하단에서 실시간 트래픽을 백트래킹 알고리즘을 통해 분석하여 나이, 연령대 별 가장 인기있는 여행지를 보여줍니다.
![메인화면1](https://github.com/pigggulggul/enjoytrip/assets/141539089/d8683bb8-ac4e-41b4-ae9e-1edb0b11addf)
![메인화면2](https://github.com/pigggulggul/enjoytrip/assets/141539089/d7c0efd0-2e25-48d5-9b80-014922b79060)

### 회원관리

#### 로그인

- 로그인 페이지 입니다.
- 유효하지 않은 값이 입력되면 '아이디 혹은 비밀번호 확인 후 다시 로그인하세요'라는 경고창이 나타납니다.
![로그인](https://github.com/pigggulggul/enjoytrip/assets/141539089/7ec6f415-850b-4fc9-8817-0408e316cc58)

#### 회원가입 화면

- 회원가입 페이지 입니다.
- 조건에 맞지 않는 값을 입력했을 경우 가입이 되지 않습니다.
- 회원가입이 완료되면 로그인 페이지로 이동됩니다.
![회원가입](https://github.com/pigggulggul/enjoytrip/assets/141539089/cfe53630-2dce-4a58-a5ef-f9d05c98bcb9)

#### 회원 정보 조회 / 수정

- 마이페이지 화면입니다.
- 로그인 한 유저가 본인의 정보를 확인할 수 있습니다.
![마이페이지](https://github.com/pigggulggul/enjoytrip/assets/141539089/9054353a-d015-4ae7-9d39-8f67d2597518)
- 마이페이지에서 게시물 관련 메뉴를 클릭하면 사용자가 작성하거나 좋아요를 누른 게시물만 확인할 수 있습니다.

#### 회원 탈퇴

- 회원 탈퇴 클릭 시 비밀번호를 입력받습니다.
- 탈퇴하면 메인 세션이 지워지고 메인페이지로 이동합니다.
![회원탈퇴](https://github.com/pigggulggul/enjoytrip/assets/141539089/40a7137b-8eea-4c1e-860d-6d42cc859fd4)

### 관광지 조회 화면

- 관광지 조회 화면입니다.
- 지도에 관광지 위치에 마크가 찍히고 사진과 함께 설명이 출력됩니다.
![여행지검색1](https://github.com/pigggulggul/enjoytrip/assets/141539089/b60185a6-86a2-40ad-a5ae-dd71f3520ac7)
![여행지검색2](https://github.com/pigggulggul/enjoytrip/assets/141539089/0458e0ca-94bc-4dbc-8bb1-a53ae8bc7e38)
- 결과얻기 버튼을 클릭하면 왼쪽 사이트바가 나타나 목록을 확인할 수 있습니다.
![여행지검색세부](https://github.com/pigggulggul/enjoytrip/assets/141539089/38221bde-acb0-4f90-b335-a6c90676f154)

#### 여행계획

- 여행계획 페이지입니다.
- 사용자는 이 곳에서 계획을 만들고 관리 할 수 있습니다.
![여행계획1](https://github.com/pigggulggul/enjoytrip/assets/141539089/c4d3ab28-46af-4909-9cd5-3b5c796536b5)
- 자신만의 여행 경로를 만들고 경로에 따른 거리와 시간, 요금을 확인 할 수 있습니다.
![여행계획2](https://github.com/pigggulggul/enjoytrip/assets/141539089/49511d7c-fbf3-4117-b1f8-41532b9f59e3)
- 길찾기 기능을 통하여 실제로 얼마나 걸리는지 확인 할 수 있습니다.
![여행계획_길찾기](https://github.com/pigggulggul/enjoytrip/assets/141539089/e8caf760-e5dd-4c98-99ea-39f081d96444)

### 게시판 구현

#### 자유게시판

- 자유게시판을 클릭하면 자유게시판 목록이 출력됩니다.
- 관리자 권한이 없어도 모든 이용자가 게시글 작성, 읽기 권한이 있습니다.
- 이용자는 자신이 쓴 글에대한 게시글 수정, 삭제 권한이 있습니다.
- 관리자는 모든 글에대한 삭제 권한이 있습니다.
![게시판1](https://github.com/pigggulggul/enjoytrip/assets/141539089/45404a53-3c81-4e63-8ff2-a348a22b1023)
![게시판2](https://github.com/pigggulggul/enjoytrip/assets/141539089/4b348757-1d40-4ad4-86f3-e75e9bfd6d4c)
![게시판3](https://github.com/pigggulggul/enjoytrip/assets/141539089/f1280cfb-8c85-4d66-93c5-d0c7a18824b3)

---

# ⚒️ 역할 - 프론트엔드

- 모든 화면구성 및 사용 프론트 사용 기술 설계
- Attractions, Users, Board, Plans, MyTrips 컨트롤러에 대한 **API 작성**
- **JWT Token, Pinia**를 통하여 로그인부분 작성
- Home, Attractions, Users, Board, Plans 화면 디자인 및 구현

# ⚒️ 역할 - 백엔드

- SpringBoot 초기 세팅, Controller, Service, Mapper, DTO 클래스 설계
- MySQL 데이터베이스 테이블 설계 및 구축
- Attractions, Plans, Users, Mytrips, Board, File 컨트롤러에 대한 **API 및 MyBatis 쿼리 작성**
- **JWT Token**을 통한 사용자 인증 처리
- **Interceptor**를 통한 API 별 인가 처리

---

# ⚒️ 기술 스택

- SpringBoot
- MyBatis
- MySQL
- Swagger, Postman
- Vue
- Scss
- GitLab

---

# :chart_with_upwards_trend: ERD

![신의한수ERD](https://github.com/pigggulggul/enjoytrip/assets/141539089/696583db-b7f2-4f14-815c-5f6167f7bf09)

---

# :chart_with_upwards_trend: 클래스 다이어그램

![클래스다이어그램1](https://github.com/pigggulggul/enjoytrip/assets/141539089/b1d198b0-f2cd-48be-9835-27d7531dedee)
![클래스다이어그램2](https://github.com/pigggulggul/enjoytrip/assets/141539089/c3ef6c02-bc3e-4829-8b9f-07cf5ee7041e)

---

# :bookmark: 주요 컨트롤러

| 컨트롤러 이름     | 경로         | 설명                             |
| ----------------- | ------------ | -------------------------------- |
| 유저 컨트롤러     | /users       | 회원 정보 관리 및 로그인 처리    |
| 관광지 컨트롤러   | /attractions | 관광지 정보 및 검색 처리         |
| 플랜 컨트롤러     | /plans       | 여행 계획 관리                   |
| 여행경로 컨트롤러 | /mytrips     | 여행 계획 내 세부 여행 경로 관리 |
| 게시판 컨트롤러   | /board       | 게시판, 댓글, 좋아요 관리        |
| 파일 컨트롤러     | /file        | 사용자 프로필 사진 관리          |

---

# :page_facing_up: 전체 API 리스트

![스웨거1](https://github.com/pigggulggul/enjoytrip/assets/141539089/fb3b8f9c-0224-4f48-8889-ff3c3c7893a7)
![스웨거2](https://github.com/pigggulggul/enjoytrip/assets/141539089/1626a534-ccbb-49a2-b9cb-2fc515e81f7b)
![스웨거3](https://github.com/pigggulggul/enjoytrip/assets/141539089/dfd36890-6566-48ab-b660-c009ce89d13f)
![스웨거4](https://github.com/pigggulggul/enjoytrip/assets/141539089/3e4f259d-fbde-444e-9692-82da5c28d669)

# 📄 프로젝트 주소

### 프론트엔드

- https://lab.ssafy.com/qufvkdlej/enjoytrip_vue_seoul15

### 백엔드

- https://lab.ssafy.com/jhnote90/enjoytrip_framework_seoul15
