# Sticky Searcher

<p align="center"><img src="https://github.com/user-attachments/assets/b199caad-8c73-4398-9a93-b70f5f66d4c5" height="128px" width="128px"></p>

<p align="center"> "Sticky Searcher"는 구글에서 검색어를 입력하면 관련된 문구들이 자동으로 하이라이팅 표시되며,<br>
검색을 통해 얻고자 했던 정보들에 빠르게 도달할 수 있는 크롬 확장 프로그램입니다.</p>

# 링크

- [확장 프로그램 리드미](https://github.com/Sticky-Seacher/sticky-searcher-extension?tab=readme-ov-file#sticky-searcher) | [다운로드 바로가기](https://chromewebstore.google.com/detail/sticky-searcher/hgffglicdkekapoilckejhebgopacdld?hl=ko&utm_source=ext_sidebar) </br>
- [웹 사이트 리드미](https://github.com/Sticky-Seacher/sticky-searcher-website?tab=readme-ov-file#sticky-searcher) | [웹 사이트 바로가기](https://stickysearcher.site/)

# 목차

<!-- toc -->

- [1. 개발 배경](#1-%EA%B0%9C%EB%B0%9C-%EB%B0%B0%EA%B2%BD)
  - [내가 검색한 화면에서 원하는 정보를 빠르게 얻어갈 수는 없을까?](#%EB%82%B4%EA%B0%80-%EA%B2%80%EC%83%89%ED%95%9C-%ED%99%94%EB%A9%B4%EC%97%90%EC%84%9C-%EC%9B%90%ED%95%98%EB%8A%94-%EC%A0%95%EB%B3%B4%EB%A5%BC-%EB%B9%A0%EB%A5%B4%EA%B2%8C-%EC%96%BB%EC%96%B4%EA%B0%88-%EC%88%98%EB%8A%94-%EC%97%86%EC%9D%84%EA%B9%8C)
- [2. 기능 소개](#2-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C)
- [3. 기술 스택](#3-%EA%B8%B0%EC%88%A0-%EC%8A%A4%ED%83%9D)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [4. 개발 과정](#4-%EA%B0%9C%EB%B0%9C-%EA%B3%BC%EC%A0%95)
  - [확장 프로그램 핵심 구조](#%ED%99%95%EC%9E%A5-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-%ED%95%B5%EC%8B%AC-%EA%B5%AC%EC%A1%B0)
    - [확장 프로그램의 구성요소와 각 역할](#%ED%99%95%EC%9E%A5-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8%EC%9D%98-%EA%B5%AC%EC%84%B1%EC%9A%94%EC%86%8C%EC%99%80-%EA%B0%81-%EC%97%AD%ED%95%A0)
  - [웹페이지 내에 검색 키워드를 하이라이팅 하는 기능](#%EC%9B%B9%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%82%B4%EC%97%90-%EA%B2%80%EC%83%89-%ED%82%A4%EC%9B%8C%EB%93%9C%EB%A5%BC-%ED%95%98%EC%9D%B4%EB%9D%BC%EC%9D%B4%ED%8C%85-%ED%95%98%EB%8A%94-%EA%B8%B0%EB%8A%A5)
    - [onCompleted이벤트와 메시지 통신을 사용하여 시작 시점 제어하기](#oncompleted%EC%9D%B4%EB%B2%A4%ED%8A%B8%EC%99%80-%EB%A9%94%EC%8B%9C%EC%A7%80-%ED%86%B5%EC%8B%A0%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EC%8B%9C%EC%9E%91-%EC%8B%9C%EC%A0%90-%EC%A0%9C%EC%96%B4%ED%95%98%EA%B8%B0)
      - [SPA 페이지 대응을 위해 DOM이 형성된 시점 감지 필요성](#spa-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%8C%80%EC%9D%91%EC%9D%84-%EC%9C%84%ED%95%B4-dom%EC%9D%B4-%ED%98%95%EC%84%B1%EB%90%9C-%EC%8B%9C%EC%A0%90-%EA%B0%90%EC%A7%80-%ED%95%84%EC%9A%94%EC%84%B1)
      - [DOM이 형성된 시점 감지 방법 (onCompleted)](#dom%EC%9D%B4-%ED%98%95%EC%84%B1%EB%90%9C-%EC%8B%9C%EC%A0%90-%EA%B0%90%EC%A7%80-%EB%B0%A9%EB%B2%95-oncompleted)
      - [메시지 통신을 통해 하이라이팅 로직 시작](#%EB%A9%94%EC%8B%9C%EC%A7%80-%ED%86%B5%EC%8B%A0%EC%9D%84-%ED%86%B5%ED%95%B4-%ED%95%98%EC%9D%B4%EB%9D%BC%EC%9D%B4%ED%8C%85-%EB%A1%9C%EC%A7%81-%EC%8B%9C%EC%9E%91)
    - [NodeIterator로 DOM 트리를 탐색하여 필요한 텍스트만 필터링](#nodeiterator%EB%A1%9C-dom-%ED%8A%B8%EB%A6%AC%EB%A5%BC-%ED%83%90%EC%83%89%ED%95%98%EC%97%AC-%ED%95%84%EC%9A%94%ED%95%9C-%ED%85%8D%EC%8A%A4%ED%8A%B8%EB%A7%8C-%ED%95%84%ED%84%B0%EB%A7%81)
      - [DOM 트리 탐색 과정](#dom-%ED%8A%B8%EB%A6%AC-%ED%83%90%EC%83%89-%EA%B3%BC%EC%A0%95)
      - [NodeIterator를 사용하는 방법을 선정한 이유](#nodeiterator%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95%EC%9D%84-%EC%84%A0%EC%A0%95%ED%95%9C-%EC%9D%B4%EC%9C%A0)
    - [리프 요소를 재구성하여 하이라이팅 스타일 적용](#%EB%A6%AC%ED%94%84-%EC%9A%94%EC%86%8C%EB%A5%BC-%EC%9E%AC%EA%B5%AC%EC%84%B1%ED%95%98%EC%97%AC-%ED%95%98%EC%9D%B4%EB%9D%BC%EC%9D%B4%ED%8C%85-%EC%8A%A4%ED%83%80%EC%9D%BC-%EC%A0%81%EC%9A%A9)
      - [리프 요소에서 텍스트 분리와 삽입 과정](#%EB%A6%AC%ED%94%84-%EC%9A%94%EC%86%8C%EC%97%90%EC%84%9C-%ED%85%8D%EC%8A%A4%ED%8A%B8-%EB%B6%84%EB%A6%AC%EC%99%80-%EC%82%BD%EC%9E%85-%EA%B3%BC%EC%A0%95)
      - [예외 상황에 대응하기 위해 리프 요소 재 탐색](#%EC%98%88%EC%99%B8-%EC%83%81%ED%99%A9%EC%97%90-%EB%8C%80%EC%9D%91%ED%95%98%EA%B8%B0-%EC%9C%84%ED%95%B4-%EB%A6%AC%ED%94%84-%EC%9A%94%EC%86%8C-%EC%9E%AC-%ED%83%90%EC%83%89)
      - [기능 구현 안정화를 위해 jsbin과 debugger 활용](#%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84-%EC%95%88%EC%A0%95%ED%99%94%EB%A5%BC-%EC%9C%84%ED%95%B4-jsbin%EA%B3%BC-debugger-%ED%99%9C%EC%9A%A9)
  - [페이지간 검색 키워드 관련 핵심 단락 위치로 자동 스크롤 기능](#%ED%8E%98%EC%9D%B4%EC%A7%80%EA%B0%84-%EA%B2%80%EC%83%89-%ED%82%A4%EC%9B%8C%EB%93%9C-%EA%B4%80%EB%A0%A8-%ED%95%B5%EC%8B%AC-%EB%8B%A8%EB%9D%BD-%EC%9C%84%EC%B9%98%EB%A1%9C-%EC%9E%90%EB%8F%99-%EC%8A%A4%ED%81%AC%EB%A1%A4-%EA%B8%B0%EB%8A%A5)
    - [핵심 단락(description) 취득하여 새로운 구조체로 저장하기](#%ED%95%B5%EC%8B%AC-%EB%8B%A8%EB%9D%BDdescription-%EC%B7%A8%EB%93%9D%ED%95%98%EC%97%AC-%EC%83%88%EB%A1%9C%EC%9A%B4-%EA%B5%AC%EC%A1%B0%EC%B2%B4%EB%A1%9C-%EC%A0%80%EC%9E%A5%ED%95%98%EA%B8%B0)
      - [영역별로 작업을 분리할 필요성](#%EC%98%81%EC%97%AD%EB%B3%84%EB%A1%9C-%EC%9E%91%EC%97%85%EC%9D%84-%EB%B6%84%EB%A6%AC%ED%95%A0-%ED%95%84%EC%9A%94%EC%84%B1)
      - [데이터를 가공하고 새로운 구조제로 저장하기](#%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A5%BC-%EA%B0%80%EA%B3%B5%ED%95%98%EA%B3%A0-%EC%83%88%EB%A1%9C%EC%9A%B4-%EA%B5%AC%EC%A1%B0%EC%A0%9C%EB%A1%9C-%EC%A0%80%EC%9E%A5%ED%95%98%EA%B8%B0)
      - [chrome storage를 선택한 이유](#chrome-storage%EB%A5%BC-%EC%84%A0%ED%83%9D%ED%95%9C-%EC%9D%B4%EC%9C%A0)
    - [페이지간 자동 스크롤을 위해 리다이렉션 처리 설계](#%ED%8E%98%EC%9D%B4%EC%A7%80%EA%B0%84-%EC%9E%90%EB%8F%99-%EC%8A%A4%ED%81%AC%EB%A1%A4%EC%9D%84-%EC%9C%84%ED%95%B4-%EB%A6%AC%EB%8B%A4%EC%9D%B4%EB%A0%89%EC%85%98-%EC%B2%98%EB%A6%AC-%EC%84%A4%EA%B3%84)
      - [페이지 이동과 자동 스크롤을 동시에 처리하는 방법](#%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%9D%B4%EB%8F%99%EA%B3%BC-%EC%9E%90%EB%8F%99-%EC%8A%A4%ED%81%AC%EB%A1%A4%EC%9D%84-%EB%8F%99%EC%8B%9C%EC%97%90-%EC%B2%98%EB%A6%AC%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)
      - [text fragment 소개](#text-fragment-%EC%86%8C%EA%B0%9C)
      - [declarativeNetRequest를 활용한 리다이렉션 규칙 구성](#declarativenetrequest%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EB%A6%AC%EB%8B%A4%EC%9D%B4%EB%A0%89%EC%85%98-%EA%B7%9C%EC%B9%99-%EA%B5%AC%EC%84%B1)
  - [로그인 리다이렉션 오류 해결](#%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EB%A6%AC%EB%8B%A4%EC%9D%B4%EB%A0%89%EC%85%98-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0)
    - [인증 토큰(accessToken)이란?](#%EC%9D%B8%EC%A6%9D-%ED%86%A0%ED%81%B0accesstoken%EC%9D%B4%EB%9E%80)
    - [상황](#%EC%83%81%ED%99%A9)
    - [해결](#%ED%95%B4%EA%B2%B0)
    - [해결 전 코드](#%ED%95%B4%EA%B2%B0-%EC%A0%84-%EC%BD%94%EB%93%9C)
    - [해결 후 코드](#%ED%95%B4%EA%B2%B0-%ED%9B%84-%EC%BD%94%EB%93%9C)
  - [검색 히스토리 그룹화 드래그앤드롭 기능](#%EA%B2%80%EC%83%89-%ED%9E%88%EC%8A%A4%ED%86%A0%EB%A6%AC-%EA%B7%B8%EB%A3%B9%ED%99%94-%EB%93%9C%EB%9E%98%EA%B7%B8%EC%95%A4%EB%93%9C%EB%A1%AD-%EA%B8%B0%EB%8A%A5)
    - [마우스 이벤트 처리](#%EB%A7%88%EC%9A%B0%EC%8A%A4-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%B2%98%EB%A6%AC)
    - [마우스 이벤트 속성 draggable](#%EB%A7%88%EC%9A%B0%EC%8A%A4-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%86%8D%EC%84%B1-draggable)
    - [onDragEnter / onDragStart / dragPosition 속성이란?](#ondragenter--ondragstart--dragposition-%EC%86%8D%EC%84%B1%EC%9D%B4%EB%9E%80)
    - [드래그 앤 드롭에서 useRef() 사용하기](#%EB%93%9C%EB%9E%98%EA%B7%B8-%EC%95%A4-%EB%93%9C%EB%A1%AD%EC%97%90%EC%84%9C-useref-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
    - [상황](#%EC%83%81%ED%99%A9-1)
    - [해결](#%ED%95%B4%EA%B2%B0-1)
  - [사용자 식별을 위한 사용자 정보 데이터 변화 감지](#%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%8B%9D%EB%B3%84%EC%9D%84-%EC%9C%84%ED%95%9C-%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%A0%95%EB%B3%B4-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B3%80%ED%99%94-%EA%B0%90%EC%A7%80)
    - [상황](#%EC%83%81%ED%99%A9-2)
    - [해결](#%ED%95%B4%EA%B2%B0-2)
- [5. 팀원 소개](#5-%ED%8C%80%EC%9B%90-%EC%86%8C%EA%B0%9C)
- [6. 회고록](#6-%ED%9A%8C%EA%B3%A0%EB%A1%9D)
  - [이종석](#%EC%9D%B4%EC%A2%85%EC%84%9D)
  - [김소연](#%EA%B9%80%EC%86%8C%EC%97%B0)
  - [김연주](#%EA%B9%80%EC%97%B0%EC%A3%BC)

<!-- tocstop -->

# 1. 개발 배경

### 내가 검색한 화면에서 원하는 정보를 빠르게 얻어갈 수는 없을까?

우리는 검색창에 궁금했던 단어나 문장을 입력하고 원하는 정보를 빠르게 얻어 가길 원합니다.<br>
하지만 검색어를 입력 후 확인하고 싶었던 정보인 줄 알고 페이지를 클릭하면 정작 원했던 정보가 아닌<br>
불필요한 설명들이 존재하거나 정보를 찾기까지 수많은 스크롤을 해야 하는 불편함이 있었습니다.<br>

원했던 정보가 있는 위치로 자동으로 스크롤 시켜 사용자의 편의성을 개선하고자 했습니다.

그래서 저희는 검색어를 입력하자마자 해당 워딩이 자동 하이라이팅 처리가 된 후<br>
정보가 있는 링크를 클릭하면 해당 위치로 빠르게 이동시켜주는 프로젝트를 진행하게 되었습니다.

# 2. 기능 소개

| 이미지                                                                                     | 설명                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![image1](https://github.com/user-attachments/assets/f2b5fb18-100f-4a04-a4fe-60c708ae5223) | - 단어를 검색 시 검색한 단어에 하이라이트 효과가 제공됩니다. </br> - 웹사이트에 접속하면, 웹사이트 제목 아래에 위치한 설명 문단으로 바로 이동하여 하이라이트된 정보를 통해 원하는 내용을 빠르게 확인할 수 있습니다.                                                                                                                                                                                                                |
| ![image2](https://github.com/user-attachments/assets/87254561-03f3-4f2a-865e-2291185a739e) | - Start Seacher 버튼 클릭 시, 초기에 검색한 단어가 Keyword Group에 추가되며, 단어는 하이라이트가 적용됩니다. </br> - 확장 프로그램 내 검색창에 단어를 추가로 입력하여 여러 단어를 하이라이팅 할 수 있습니다. </br> - Keyword Group에 추가된 단어를 클릭 시, 하이라이트 효과를 추가하거나 제거할 수 있습니다.                                                                                                                       |
| ![image3](https://github.com/user-attachments/assets/5afc7c00-a357-4046-bf43-4e5633a399f2) | - 미 로그인 시, History 또는 History Page 버튼 클릭 시 로그인 페이지로 이동되며, 구글 계정을 통해 로그인이 가능합니다. </br> - History 버튼 클릭 시, 현재 보고있는 탭의 주소 및 검색한 단어(=history)를 저장할 수 있습니다. </br> - Lately History Group에는 최근 저장한 history를 확인할 수 있으며, 클릭 시 해당 주소로 이동할 수 있습니다. </br> History Page 버튼 클릭 시, 저장한 history를 관리할 수 있는 페이지로 이동합니다. |
| ![image4](https://github.com/user-attachments/assets/0f43ff3e-6794-4d70-b53b-bfea7557da99) | - Add Group 버튼을 클릭하여 새로운 그룹을 추가하고, Drag & Drop을 이용하여 저장한 history를 분류하여 관리할 수 있습니다.                                                                                                                                                                                                                                                                                                           |

# 3. 기술 스택

### Frontend

<div align="left">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
  <img src="https://img.shields.io/badge/TanStack Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" />
  <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/DaisyUI-1AD1A5?style=for-the-badge&logo=DaisyUI&logoColor=white">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white">
</div>

### Backend

<img src="https://img.shields.io/badge/Firebase-DD2C00?style=for-the-badge&logo=Firebase&logoColor=white">

# 4. 개발 과정

## 확장 프로그램 핵심 구조

| 확장 프로그램 구조도                                                                                      | 주요 영역                                                                                                 |
| --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| <img width="450" src="https://github.com/user-attachments/assets/eaa224a9-ed46-4b7a-96a3-ee6bb5c6c9c7" /> | <img width="450" src="https://github.com/user-attachments/assets/9a33c3ed-2f92-4623-9890-bc60e9599b66" /> |

크롬 익스텐션은 단일 스크립트가 아닌, **여러 영역이 역할을 분담하며 상호 통신하는 구조**로 되어 있습니다. 각각의 영역은 서로 다른 목적과 역할을 가지고 있고, Manifest 파일을 통해 유기적으로 연결됩니다.
크롬 익스텐션에서 사용자가 현재 보고 있는 웹페이지에 직접 개입하고, 화면을 조작하는 핵심 영역은 **Content Script**입니다. 이 스크립트는 브라우저가 로딩한 실제 웹페이지 내부에 삽입되어, **DOM 요소에 접근하거나 변경**할 수 있습니다.
본 프로젝트를 예로, 특정 키워드를 자동으로 하이라이팅하거나 버튼 클릭 시 페이지에 새로운 UI 요소를 삽입하는 등의 기능은 Content Script를 통해 구현됩니다. 웹페이지와 가장 밀접하게 상호작용하는 컴포넌트이기 때문에, 사용자 경험을 직접적으로 개선하거나 조작하고자 할 때 매우 중요한 역할을 합니다.

### 확장 프로그램의 구성요소와 각 역할

**1. Manifest(manifest.json)**

- 중요한 메타데이터를 기록하고, 리소스를 정의하고, 권한을 선언하고, 백그라운드와 페이지에서 실행할 파일을 식별하는 **설정 파일 역할**
- 어떤 스크립트를 언제, 어떤 조건에서 실행할지 등 제어할 수 있기 때문에 전체 익스텐션 구조의 뼈대 역할

**2. Content Script**

- 웹페이지에 직접 삽입되어 실행되는 JavaScript 코드
- DOM을 조작하거나, 페이지의 콘텐츠를 분석하고 변형하는 데 사용
- 다른 영역(예: Background, Side Panel)과 메시지를 주고받으며 역할 분담

**3. Service Worker(Background Script)**

- 브라우저의 백그라운드에서 실행되는 스크립트로, 이벤트 기반으로 동작
- 탭 관리, 알림 생성, 외부 API 호출, 스토리지 접근 등 **중앙 제어 역할**
- Content Script나 Popup 등 여러 컴포넌트 간 **메시지 허브 역할** 수행

**4. Side Panel**

- 사용자 인터페이스(UI)를 담당하는 영역
- 사용자의 입력을 받아 Background 또는 Content Script로 전달
- 키워드를 입력하면 → Background를 거쳐 → Content Script가 해당 키워드를 페이지에서 찾아 하이라이팅 수행

## 웹페이지 내에 검색 키워드를 하이라이팅 하는 기능

검색어 멀티 하이라이팅 기능은 사용자가 보고 있는 웹 페이지의 텍스트를 각 단어별로 시각적으로 분류해 강조 표시하는 기능입니다.<br>
• content script에서 페이지에 접근한 뒤, onCompleted 이벤트와 sendMessage를 활용해 작업 시작 시점을 제어<br>
• NodeIterator로 DOM 트리를 탐색하여 필요한 텍스트만 필터링<br>
• 텍스트 노드로 재구성하여 삽입하고 기존 텍스트 제거<br>
• 각 단어에 하이라이팅 스타일을 적용해 시각적 구분 제공<br>

보다 자세한 설명은 다음과 같습니다.

### onCompleted이벤트와 메시지 통신을 사용하여 시작 시점 제어하기

본론부터 밝히자면 사용자가 보고 있는 페이지의 DOM 형성이 완료되었을 때를 onCompleted를 사용해서 감지하여 DOM 트리 탐색을 시작했습니다. 그리고 그 타이밍을 sendMessage와 onMessage를 사용해 관리했습니다.

#### SPA 페이지 대응을 위해 DOM이 형성된 시점 감지 필요성

DOM 형성이 완료된 순간을 감지한 이유는 SPA인 페이지에 대응하기 위함이었습니다. DOM 형성 이전에 순수 html인 상황에 SPA 페이지에는 콘텐츠들이 포함되어 있지 않는 상황이 발생하기 때문입니다.

#### DOM이 형성된 시점 감지 방법 (onCompleted)

DOM이 형성된 시점은 service worker 영역에서 감지할 수 있습니다. 해당 영역에서 onCompleted 이벤트를 사용하면 됩니다. service worker 영역은 브라우저의 백그라운드에서 실행되는데, 탭을 닫거나 네비게이션에 접근 하는 등의 기능을 할 수 있습니다. onCompleted 이벤트는 chrome의 webnavigation의 메서드로 제공되며 이벤트 핸들러를 등록할 수 있습니다. 참조되는 모든 리소스를 포함해서 전체 페이지로드가 완료되면 실행됩니다.

#### 메시지 통신을 통해 하이라이팅 로직 시작

DOM 형성 완료를 감지하는 영역과 하이라이팅 로직을 담당하는 영역은 서로 다릅니다. 그러므로 두 영역 간에 하이라이팅 로직을 시작하라는 메시지 통신이 필요합니다. sendMessage와 onMessage를 사용했습니다.

| 메서드      | 설명                                                                                                                                                                                                                                                                                      |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sendMessage | - sendMessage는 메시지를 보내는 역할을 담당합니다. <br /> - service worker 영역(DOM 형성 완료를 감지하는 영역)에서 content script 영역(하이라이팅 로직을 담당하는 영역)으로 메시지를 보내야 합니다. <br /> - chrome의 tabs의 메서드로 제공되는 sendMessage를 사용했습니다.                |
| onMessage   | - onMessage는 메시지를 수신하는 역할을 담당합니다. <br /> - content script 입장에서는 메시지가 도달한 순간을 감지하는 onMessage 이벤트를 걸고 메시지들을 분간하는 과정이 필요합니다. <br /> - onMessage 이벤트는 chrome의 runtime의 메서드로 제공되며 이벤트 핸들러를 등록할 수 있습니다. |

### NodeIterator로 DOM 트리를 탐색하여 필요한 텍스트만 필터링

#### DOM 트리 탐색 과정

DOM 트리 탐색 방법으로 NodeIterator를 사용했습니다. document.createNodeIterator 함수를 사용하여 NodeIterator를 만든 다음 for 문 등을 이용해서 한 순회마다 다음 노드를 방문하면서 탐색했습니다. 그리고 순회 결과로 대상 텍스트가 포함된 리프 요소를 찾았습니다.

#### NodeIterator를 사용하는 방법을 선정한 이유

NodeIterator를 사용하게된 이유는 텍스트 노드인 콘텐츠를 찾을 수 있고, 해당 요소의 위치도 사용할 수 있었기 때문입니다. 루트 노드를 제공할 수 있고, 탐색 할 노드의 타입을 명시할 수 있고, 탐색을 이어갈 지 멈출지도 결정할 수 있습니다. 본 프로젝트에서는 루트 노트로 body 테그를 제공하고 텍스트 노드에만 방문하도록 필터링 했습니다. 다음 노드가 페이지 위에서 아래의 사용자 시각의 흐름이기 때문에 이해하기도 쉬웠습니다.

다음의 방법들은 고려했으나 선정하지 않았습니다.

| 후보                   | 선정하지 않은 이유                                                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| document.querySelector | - 콘텐츠를 찾을 수는 없고 이미 알고 있는 특정 요소를 찾는 메서드이기에 사용하기 어렵습니다.                                                                  |
| 이진 트리 알고리즘     | - 노드의 자식 갯수가 2개로 한정되어 있기에 사용하기 어렵습니다.                                                                                              |
| 순수 html              | - 전체 페이지의 테그들을 문자열로 받아서 텍스트를 발견하는 것도 추후 하이라이팅 작업 시 DOM 트리에서의 위치를 알고 있어야 하기 때문에 사용하기 어려웠습니다. |
| TreeWalker             | - NodeIterator 이후에 등작하고 유사한 기능을 제공하나, 저희 프로젝트에서는 다음 노드로만 가면 되었기에 복잡성을 줄이고자 NodeIterator를 사용했습니다.        |

### 리프 요소를 재구성하여 하이라이팅 스타일 적용

#### 리프 요소에서 텍스트 분리와 삽입 과정

DOM 트리 탐색 결과 얻게 된 리프 요소를 대상으로 다시 한 번 NodeIterator를 사용해 순회해야 합니다. 원하는 단어를 기준으로 split 한 후, 원하는 단어는 배경색이 지정된 요소화 해서 삽입하고 그 이외의 텍스트들은 텍스트 노드화 해서 삽입했습니다. 그 이후 기존 텍스트 콘텐츠 전문은 삭제 처리했습니다.

#### 예외 상황에 대응하기 위해 리프 요소 재 탐색

리프 요소로 범위를 좁힌 다음에 다시 NodeIteragtor를 사용한 이유는 다음과 같은 DOM 트리 구조에 대응하기 위함입니다. 상황 예시로 class라는 단어를 하이라이팅하고 싶은 상황을 가정하겠습니다.

```html
<article>
  class는 교육기관에서 사용하는 단위 입니다.
  <span class="class">class</span>
  반 또는 학급이라는 단위로 대체될 수도 있습니다.
  <textarea
    id="class"
    name="class"
    rows="5"
    cols="33"
  >
    class의 다른 의미를 찾아 제출하십시오.
  </textarea>
</article>
```

위의 article에 innerHTML을 사용한 다음에 class단어만 replace처리한다면 속성이 요소로 감싸지는 등 문법 위반 사례가 발생하기 쉬웠습니다. 그리고 textarea 요소와 같이 내부 콘텐츠에 다른 요소를 삽입할 수 없는 요소의 존재를 대응하기 어려워졌습니다.

그러므로 NodeIterator로 위의 article을 순회하면서 tagName이 input이나 textarea일 경우는 탐색에서 제외했습니다. 순수하게 텍스트 노드로 존재하는 class라는 단어만 요소로 만들었습니다.

#### 기능 구현 안정화를 위해 jsbin과 debugger 활용

예외 상황에 대응하는 과정에서 jsbin과 debugger의 효과를 채감할 수 있었습니다. jsbin으로 작은 단위의 DOM에서 우선 작은 기능 구현을 도전했습니다. 주로 단어가 전체 콘텐츠의 맨 앞에 있거나 맨 뒤에 있을 경우 등의 엣지케이스를 확인하는 데 좋았습니다. 그리고 MDN 사이트 등 본격적인 사이트에서 콘솔 탭을 열어 해당 함수를 적용시켜 보았고, debugger를 쓰면서 점진적으로 하나씩 하이라이트가 찍히는 모습과 해당하는 코드 로직을 따라가며 버그를 잡아 내니 문제 해결에 걸리는 시간을 단축할 수 있었습니다.

## 페이지간 검색 키워드 관련 핵심 단락 위치로 자동 스크롤 기능

페이지 간 description 자동 스크롤 기능은 구글 검색 페이지에서 링크당 단락을 표시해 줄 경우, 해당 링크를 누르면 해당 단락이 위치한 곳으로 자동으로 스크롤을 내려주는 기능입니다.

description은 다음 영역의 텍스트를 가리키는 용어로 팀 내에서 공통된 단어로 소통하기 위해 명명해서 사용하고 있습니다.

<img width="450" alt="description" src="https://github.com/user-attachments/assets/fa1b782f-031f-4b53-ad7a-ca4ec15abe9b" />

구글 검색페이지에 위치했을 때 chrome storage에 단락들을 미리 저장해 놓은 후, 페이지 이동 시 text fragments로 만들어 URL 끝에 추가해 리다이렉션을 시키는 방식으로 작업을 진행했습니다.

보다 자세한 설명은 다음과 같습니다.

### 핵심 단락(description) 취득하여 새로운 구조체로 저장하기

#### 영역별로 작업을 분리할 필요성

| 영역            | 역할                                                                                                                                               |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| service workers | - 현재 URL이 구글 검색 페이지인 지 확인하는 과정 <br /> - 네비게이션에 접근해야 하기 때문에 service workers 영역에서만 가능합니다.                 |
| content script  | - 구글 검색 결과 리스트 중 desciption 부분들만 정제하는 과정 <br /> - 웹 페이지의 DOM에 접근해야 하기 때문에 content script 영역에서만 가능합니다. |

#### 데이터를 가공하고 새로운 구조제로 저장하기

하나의 탭을 기준으로 주소를 키로하고 description을 값으로 하는 구조체를 만들어서 chrome storage에 저장했습니다. description 부분만 정제할 때는 날짜나 이미지 등의 불필요한 사항은 제거하고 한 문장만 취득했습니다. 그리고 해당 description이 속한 링크의 주소도 함께 취득했습니다.

하나의 탭을 기준으로 저장하는 이유는 chrome storage 저장 용량 관리를 효율적으로 진행하기 위함입니다. chrome storage 저장 용량은 기본 10MB입니다. 이는 unlimitedStorage 권한을 요청하여 늘릴 수 있으나, 용량을 효율적으로 사용하기 위해 구글 검색 페이지 탭을 닫을 경우 자동으로 삭제하도록 했습니다. chrome의 tabs의 onRemoved 이벤트를 사용해서 특정 고유한 id의 탭이 삭제되었을 경우를 알아차릴 수 있었습니다.

```text

tabId: Map {
  link1 => { description1, keywords1 },
  link2 => { description2, keywords2 },
}

```

#### chrome storage를 선택한 이유

chrome storage 크롬 익스텐션의 모든 영역에서 접근 가능한 클라이언트 측 저장공간입니다. 링크와 description들은 사용자가 해당 링크를 클릭하지 않을 수도 있어 쓰지 않을 수도 있는 임시 데이터이기 때문에 클라이언트 측에 저장하기로 했습니다. 그런데 local storage 등의 기존 Web Storage API는 service workers 영역에서 접근 할 수 없기 때문에 chrome storage를 사용했습니다.

### 페이지간 자동 스크롤을 위해 리다이렉션 처리 설계

#### 페이지 이동과 자동 스크롤을 동시에 처리하는 방법

규칙으로 선언해놓은 URL로 이동할려고 할 경우 text fragment가 적용된 URL로 리다이렉션 시켰습니다. 이를 위해 declarativeNetRequest를 사용해 리다이렉션 규칙들을 만들고 chrome storage와 동기화 시켰습니다.

#### text fragment 소개

text fragment는 웹 페이지의 특정 부분을 링크로 공유할 수 있도록 해줍니다. URL 끝에 `#:~:text=` 라는 접두사를 넣어 추가할 수 있습니다. 그 결과 접두사 뒤의 글자들이 있는 위치로 웹 페이치를 스크롤 시킬 수 있습니다. 다만 URL의 일부분인 만큼 encodeURIComponent를 사용하여 인코딩하는 과정을 거치는 것이 안전했습니다.

#### declarativeNetRequest를 활용한 리다이렉션 규칙 구성

declarativeNetRequest는 네트워크 요청을 수정하거나 차단할 수 있는 chrome API 입니다. 구글 검색 페이지에서 description을 취득할 때 함께 취득한 링크들에 대해서 리다이렉션 규칙들을 지정했습니다. 해당 URL과 동일한 네트워크 요청을 보낼 경우 text fragment가 추가된 URL로 요청이 리다이렉션 됩니다.

chrome stroage에 onChange 이벤트를 걸어 놓아 리다이렉트 규칙들을 동기화시켰습니다. chrome storage에 새로운 description과 링크들이 저장되면 리다이렉트 규칙들도 업데이트가 되며, chrome storage가 비워지면 리다이렉트 규칙도 비워집니다. 이는 chrome storage를 진실의 원천으로 삼아 관련된 로직들이 chrome storage에 반응하여 작동하도록 하기 위함이었습니다.

## 로그인 리다이렉션 오류 해결

### 인증 토큰(accessToken)이란?

- "로그인 인증을 위한 증명서" 같은 개념입니다.<br>
  우리가 로그인을 할 때 사용하는 비밀번호처럼 사용자가 제대로 로그인했는지 시스템이 확인할 수 있습니다.

### 상황

- 로그인을 성공하더라도 사용자의 이메일이나 인증 토큰이 제대로 설정되지 않으면, <br> 상태를 유지하지 못하고 다시 로그인 페이지로 돌아가는 상황입니다.

### 해결

- 사용자의 이메일 값을 가져와 조건을 주는 시도를 하려다 이메일 정보만 알면<br> 제 3자가 로그인을 할 수 있는 보안의 이슈가 있어 고유한 값인 인증 토큰을 갖고와서 조건을 걸어주었습니다.

### 해결 전 코드

```jsx
const ProtectedRoute = ({ element }) => {
  const { userId } = useUserId();

  if (!userId) {
    return <Navigate to="/login" />;
  } else {
    return <>{element}</>;
  }
};
```

### 해결 후 코드

```jsx
const ProtectedRoute = ({ element }) => {
  const { userId } = useUserId();
  const accessToken = localStorage.getItem("userAccessToken");

  if (userId || accessToken) {
    return <>{element}</>;
  }

  return (
    <Navigate
      to="/login"
      replace
    />
  );
};
```

## 검색 히스토리 그룹화 드래그앤드롭 기능

### 마우스 이벤트 처리

- `mousedown` (마우스 버튼 누름): 사용자가 요소를 드래그하거나 놓을 때 발생하는 여러 이벤트를 처리합니다.
- `mousemove` (마우스 이동): 요소로 드래그하는 동안 추적합니다.
- `mosueup` (마우스 버튼 떼기): 마우스를 놓을 때 발생하며, 드래그가 끝나는 시점을 추적합니다.

### 마우스 이벤트 속성 draggable

- draggable는 `true`인 값은 대표적으로 `<a>` 태그가 있고 반면에 `<span>`태그는 불가합니다.

### onDragEnter / onDragStart / dragPosition 속성이란?

| onDragStart                                                                                        | onDrop                                                                                                       | dragPosition                                                                                                |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| 드래그가 시작할 때 호출되는 함수이며, 드래그된 항목의 인덱스와 dragPosition 레퍼런스에 저장합니다. | 드래그된 항목이 드롭 영역에 놓일 때 호출되는 함수이며 드래그된 항목을 새로운 그룹에 추가하고 업데이트합니다. | useRef 훅을 사용하여 현재 드래그된 항목에 대한 정보를 추적하고, 드롭 시 그 값을 사용해 항목을 재배치합니다. |

### 드래그 앤 드롭에서 useRef() 사용하기

- 드래그 앤 드롭 기능에서 `useRef()`를 사용하는 이유는 드래그된 상태를 추적하고,
  끝날때까지 정보를 저장하기 위해 사용했습니다. 일반적으로는 드래그 이벤트는 여러 번 발생하는데,
  `useRef()`를 사용하면 리렌더링 없이 정보를 계속해서 추적할 수 있습니다.
- `dragPosition.current`: 드래그가 시작된 위치 (즉, 키워드의 그룹 인덱스와 키워드)를 저장합니다.

  ```jsx
  const startDrag = (historyGroupIndex, history) => {
    dragPosition.current = {
      historyGroupIndex: historyGroupIndex,
      history: history,
    };
  };
  ```

### 상황

- 2개의 그룹이 있다면 영역내에 드래그한 요소를 다른 박스로 옮길 때 삭제되거나 중복되어 추가되는 상황이 있었습니다.
  <img alt="Image" src="https://github.com/user-attachments/assets/fbb35a40-63e4-436d-9172-14e773ee40b1" />

### 해결

- 기존 그룹내에 리스트 요소들이 있다면 `index`가 중요하고<br>
  각 해당되는 리스트들의 고유한 `key`값을 주었더니 해결되었습니다.

  ```
     {historyGroups.map((historyGroup, historyGroupIndex) => (
        <KeywordGroup
          key={historyGroup.id}
          onDragStart={(history) => startDrag(historyGroupIndex, history)}
          //...
        />
      ))}
  ```

## 사용자 식별을 위한 사용자 정보 데이터 변화 감지

### 상황

1.  사용자 식별을 위해 사용자 localStorage에 이메일을 저장하여 사용하도록 기획
2.  로그인 이전에는 사용자 데이터가 존재하지 않고, 사용자가 로그인을 하더라도 아래의 코드로는 변화를 감지하지 않아
    storage에는 계속 “userEmail”의 value가 null로 저장되어 있어 사용자 식별이 불가함

```jsx
if (request.message === "Get user authentication") {
  localStorage.setItem("userEmail", request.emailData);
}
```

### 해결

1.  수동으로 이벤트를 강제시키는 window.dispatchEvent 사용(매개변수로 이벤트 객체를 받음)
2.  storage의 값이 변경될 때마다 발생하는 “storage”이벤트 객체를 매개변수로 전달하여 value의 변화를 감지

```jsx
if (request.message === "Get user authentication") {
  localStorage.setItem("userEmail", request.emailData);
  window.dispatchEvent(new Event("storage"));
}
```

# 5. 팀원 소개

- 이종석: jongsuk.dev@gmail.com

- 김소연: soyeon.software@gmail.com

- 김연주: mpnisck@gmail.com

# 6. 회고록

- ### 이종석

  “개발은 혼자하는 것이 아니다.”

  본 프로젝트를 진행하면서 가장 많이 느꼈던 점입니다. 사소한 부분부터 중대한 사안까지 모든 것을 회의를 통해 결정되고 진행을 해야한다는 점이 프로젝트 초반에 힘든 부분이었습니다. 의견을 조율해가는 과정에서 간혹 서로의 언성이 높아져 분위기가 냉랭해지기도 했지만, 각자 생각할 시간을 가지고 차분히 대화로 관계를 풀어가는 과정이 좋았습니다.

  더하여 프로젝트를 위해 팀원 모두가 잠을 줄여가며 진행했는데, 아무리 힘들더라도 팀 규칙을 지키기 위해 책임감을 가지고 맡은 바를 해낸 팀원들에게 감사했습니다. 이를 보며 자극되기도 하며, 서로 힘들 때 의지하고 서로에게 긍정적인 시너지를 주고 받을 수 있다는 점이 팀 프로젝트의 가장 큰 장점인 것 같습니다.

  팀 프로젝트를 통해 소속감과 책임감을 상기시킬 수 있는 좋은 기회가 되었습니다.

- ### 김소연

  팀 프로젝트를 진행하면서 좋은 팀원들을 만나 협업 능력을 기를 좋은 기회였습니다.<br>
  서로 중요하게 여기는 부분이 달랐기 때문에, 의견을 효율적으로 공유하는 데 노력을 쏟았습니다.

  어필하기 위한 근거는 예시 코드만 한 것이 없다는 것을 체감한 이후에는 실제로 jsbin으로 예시 코드를 작성해서 시연하기도 하고, 건강한 피드백을 주고받기 위해 서로를 믿고 각자 돌아가면서 솔직하게 느낀 점을 오픈하기도 했습니다. 또 모두의 생각을 통일시키기 위해 어휘와 핵심 기능을 확실히 동기화하는 작업도 중요하다는 것을 깨닫기도 했습니다.

  팀원들 모두의 장점이 잘 발휘되어서 프로젝트를 무사히 마무리할 수 있었던 것 같습니다. 배울 점이 많은 팀원들을 만나 많이 배웠고 팀플 기간동안 즐거웠습니다.

- ### 김연주

  팀 프로젝트를 처음 진행하면서 0부터 1까지의 선택의 연속이었습니다.<br>
  아이디어 선정부터 개발까지 개개인의 의견과 역량이 다르기에 중심을 잡고 나아간다는 것이 쉽지 않았습니다.

  그럼에도 불구하고 초반에는 의견 조율에서 어려움이 있었지만, 프로젝트가 진행됨에 따라 서로의 성향과 니즈를 이해하고 도와주며,<br>
  수많은 회의를 통해 타협점을 찾아 결론을 내게 되었습니다.<br>
  그리하여 후반부에는 팀워크가 잘 맞아 작업 속도도 향상되었고, 진정한 팀이 되었다고 느낄 수 있었습니다.

  3주간의 시간동안 육각형의 팀원분들과 함께 작업하게 되어 뜻깊었고 협업을 진행하며 의사소통의 중요성을 깨닫고 좋은 경험이 되었다고 생각합니다.
