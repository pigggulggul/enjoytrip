![header](https://capsule-render.vercel.app/api?type=waving&color=bae0f3&height=300&section=header&text=HanSooTrip✈&fontSize=80&fontAlign=60&fontAlignY=42)

**여행 계획(플랜)을 생성하고, 친구들과 공유해 함께 편집할 수 있는 웹 서비스**

## ⚒️ 화면 구성

### 메인 화면

- 홈페이지 메인 화면 입니다.
- 메인페이지 하단에서 실시간 트래픽을 백트래킹 알고리즘을 통해 분석하여 나이, 연령대 별 가장 인기있는 여행지를 보여줍니다.
  ![메인화면1](/uploads/c03d5e4eab8a52e4e5e2386899a89a21/메인화면1.png)
  ![메인화면2](/uploads/5f3499a1b680300bc8fef71030ad81cb/메인화면2.png)

### 회원관리

#### 로그인

- 로그인 페이지 입니다.
- 유효하지 않은 값이 입력되면 '아이디 혹은 비밀번호 확인 후 다시 로그인하세요'라는 경고창이 나타납니다.
  ![로그인](/uploads/0b9772497b4162044d965bbff3dceba9/로그인.png)

#### 회원가입 화면

- 회원가입 페이지 입니다.
- 조건에 맞지 않는 값을 입력했을 경우 가입이 되지 않습니다.
- 회원가입이 완료되면 로그인 페이지로 이동됩니다.
  ![회원가입](/uploads/bd78d41f82172f2a231748550784f41c/회원가입.png)

#### 회원 정보 조회 / 수정

- 마이페이지 화면입니다.
- 로그인 한 유저가 본인의 정보를 확인할 수 있습니다.
  ![마이페이지](/uploads/01cfb32d2b794d0a31e4cd3b01a4c684/마이페이지.png)
- 마이페이지에서 게시물 관련 메뉴를 클릭하면 사용자가 작성하거나 좋아요를 누른 게시물만 확인할 수 있습니다.

#### 회원 탈퇴

- 회원 탈퇴 클릭 시 비밀번호를 입력받습니다.
- 탈퇴하면 메인 세션이 지워지고 메인페이지로 이동합니다.
  ![회원탈퇴](/uploads/b06ab37e5e5f9fc3d049b22599414353/회원탈퇴.PNG)

### 관광지 조회 화면

- 관광지 조회 화면입니다.
- 지도에 관광지 위치에 마크가 찍히고 사진과 함께 설명이 출력됩니다.
  ![여행지검색1](/uploads/c9aa58c5a920876260e0d1c1284d8488/여행지검색1.png)
  ![여행지검색2](/uploads/21164c275cc0e2fa3a60a4118bc6b7bf/여행지검색2.png)
- 결과얻기 버튼을 클릭하면 왼쪽 사이트바가 나타나 목록을 확인할 수 있습니다.
  ![여행지검색세부](/uploads/148ada402e0c3351abc18224e80edd1d/여행지검색세부.PNG)

#### 여행계획

- 여행계획 페이지입니다.
- 사용자는 이 곳에서 계획을 만들고 관리 할 수 있습니다.
  ![여행계획1](/uploads/d7bfbd05cbe873668b737b4d4e67d197/여행계획1.png)
- 자신만의 여행 경로를 만들고 경로에 따른 거리와 시간, 요금을 확인 할 수 있습니다.
  ![여행계획2](/uploads/3ac6d29f17ee86432d2f8f648d4211d7/여행계획2.png)
- 길찾기 기능을 통하여 실제로 얼마나 걸리는지 확인 할 수 있습니다.
  ![여행계획_길찾기](/uploads/300da464ebc0b5d0fa01415f632f0cee/여행계획_길찾기.PNG)

### 게시판 구현

#### 자유게시판

- 자유게시판을 클릭하면 자유게시판 목록이 출력됩니다.
- 관리자 권한이 없어도 모든 이용자가 게시글 작성, 읽기 권한이 있습니다.
- 이용자는 자신이 쓴 글에대한 게시글 수정, 삭제 권한이 있습니다.
- 관리자는 모든 글에대한 삭제 권한이 있습니다.
  ![게시판1](/uploads/ab12ad6c254720d3f0c3664e84329404/게시판1.png)
  ![게시판2](/uploads/6d9adbc6ab338f22d0a2d3bcf5b16dc8/게시판2.PNG)
  ![게시판3](/uploads/f449e8052f0b46e4d1f3f234e9e2a578/게시판3.PNG)

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

![신의한수ERD](/uploads/d7bec81352f424b6d652e4f5e87f03a2/신의한수ERD.PNG)

---

# :chart_with_upwards_trend: 클래스 다이어그램

![클래스다이어그램1](/uploads/eec05e1ccc8a61d755fbee8a400f6832/클래스다이어그램1.PNG)
![클래스다이어그램2](/uploads/4a0ce45ddd16158a465794c15c08ad4e/클래스다이어그램2.PNG)

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

![스웨거1](/uploads/075315d8e3e782c048b6f4a1df611ca9/스웨거1.PNG)
![스웨거2](/uploads/0735094cc1edb55b9146c940b469e45d/스웨거2.PNG)
![스웨거3](/uploads/8c2dfc9cb28df39fbada062b78a42c3a/스웨거3.PNG)
![스웨거4](/uploads/edfd93787d314dd823a267d147fe79c3/스웨거4.PNG)

# 📄 프로젝트 주소

### 프론트엔드

- https://lab.ssafy.com/qufvkdlej/enjoytrip_vue_seoul15

### 백엔드

- https://lab.ssafy.com/jhnote90/enjoytrip_framework_seoul15
