# 202030408 김진석

🔥 수업 소스코드

https://github.com/hanbit/practical-next.js

2️⃣ [2주차](#2주차-강의-내용)

3️⃣ [3주차](#3주차-강의-내용)

4️⃣ [4주차](#4주차-보강-11월-29일-수업내용)

5️⃣ [5주차](#5주차-강의-내용)

6️⃣ [6주차](#6주차-강의-내용)

7️⃣ [7주차](#7주차-강의-내용)

8️⃣ [8주차](중간고사)

9️⃣ [9주차](#9주차-강의-내용)

🔟 [10주차](#10주차-강의-내용)

1️⃣1️⃣ [11주차](#11주차-강의-내용)

1️⃣2️⃣ [12주차](#12주차-강의-내용)

1️⃣3️⃣ [13주차](#13주차-강의-내용)

1️⃣4️⃣ [14주차](#14주차-강의내용)

1️⃣5️⃣ [15주차](기말고사)

<hr>

# 4주차 보강 (11월 29일 수업내용)

## 🌟 GitHub Pages 생성

-   이 저장소는 기본적인 GitHub Page로 이 곳에 정적 페이지를 올리고 서비스 운영을 할 수 있습니다
-   외부에서 \<ID\>.gihbug.io로 접속할 수 있습니다

## 🚀 깃허브 연동

## 🚀 깃허브 설정 추가

```bash
git config --global init.defaultbranch main
git config --local user.name gwang1234
git config --local user.email qoi11@naver.com
```

## 🌟 깃허브 주소 등록

```bash
git remote remove origin
git remote add origin https://키이름@github.com/아이디/foo.git
```

## 📌 주소등록 확인

```bash
git remote -v
```

## 📌 깃 푸시

```bash
git push -u origin main
```

## 📌 gh-pages 설치

```bash
npm i gh-pages
```

## 🧩 package.json 설정 변경

```jsx
{
  "homepage": "https://KoesJin.github.io/foo",
  "name": "foo",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d out"
  },

```

## 🌟 nextconfig.mjs 설정 변경

```jsx
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'out',
};
```

## 🧩 이미지, css 적용

```jsx
{
    "deploy": "touch out/.nojekyll && gh-pages -d out -b deploy -t true"
},
```

```jsx
const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'out',
    assetPrefix: isProd ? 'https://gwang1234.github.io/foo/' : undefined,
    images: {
        unoptimized: true,
    },
};
```

<hr>

# 14주차 강의내용

### Redux

## 🌟 장점

-   `명확한 상태 관리 구조`: 액션과 reducer를 통해 state dispatch 과정을 예측 가능하게 만들고, 코드의 가독성을 높입니다.
-   `미들웨어 지원`: redux-thunk, redux-saga와 같은 미들웨어를 사용해 비동기 로직을 쉽게 처리할 수 있습니다.
-   `디버깅 도구`: Redux DevTools를 통해 상태 변화 및 디버깅이 용이합니다

## 🌟 단점

-   `설정과 코드 복잡도`: Context API에 비해 설정이 복잡하며, boileplate 코드가 많이 필요합니다
-   `추가 라이브러리 필요`: Redux 자체가 외부 라이브러리이므로 설치 및 유지 관리가 필요합니다
-   `작은 애플리케이션에는 과한 설정`: 단순한 상태 관리가 필요한 작은 애플리케이션에서는 과도한 설정일 수 있습니다.

### redux 설치

```bash
npm install @reduxjs/toolkit
```

**🚀 Redux 코드 예시**

```jsx
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'counter',
    initialstate: {
        Value: 0,
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
    },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
```

```jsx
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/features/counter/counterSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});
```

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';

export function Counter() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>{count}</h1>
            <button
                onClick={() => {
                    dispatch(increment());
                }}
            >
                증가
            </button>
            <button
                onClick={() => {
                    dispatch(decrement());
                }}
            >
                감소
            </button>
        </div>
    );
}
```

```jsx
'use client';

import { Provider } from 'react-redux';
import { store } from './store';

export default function CounterProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
}
```

<hr>

# 13주차 강의 내용

## 🌟 Props 흐름과 Context API

React와 Next.js에서 데이터 흐름은 단방향으로 이루어지며,
이는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 Props를 통해 이루어집니다.

하지만 계층 구조가 복잡해질 경우 Props Drilling 문제가 발생할 수 있습니다.
이를 해결하기 위해 Context API 또는 Redux와 같은 전역 상태 관리 도구를 사용합니다.

### 🧩 Props 흐름의 이해

-   Next.js의 데이터 흐름은 단방향으로 이루어집니다.
-   데이터는 부모 → 자식 컴포넌트 방향으로 전달되며, Props Drilling 문제가 발생할 수 있습니다.

### 🌟 Props Drilling 문제점

    1.	중간 컴포넌트에 불필요한 props 전달.
    2.	타겟 컴포넌트로 props 전달 실패 시 원인 규명 어려움.
    3.	복잡한 계층 구조로 인해 코드 복잡성 증가.

### 🔧 해결 방법

-   Props를 전역으로 사용하여 문제를 해결할 수 있습니다.
-   Next.js에서는 Context API, Redux 등을 사용해 전역 상태 관리를 수행합니다.

### 📌 Context API 개요

-   Context API는 React의 상태 관리 도구로, 전역 데이터를 컴포넌트 계층 구조에 상관없이 공유할 수 있습니다.
-   사용 사례:
-   로그인 상태 관리
-   쇼핑카트 물품 수량 관리

**🚀 주요 개념**

-   createContext: Context 생성.
-   Provider: 데이터를 하위 컴포넌트에 전달.
-   useContext: 데이터를 간단히 사용.

### 📌 Consumer vs useContext

<img width="513" alt="스크린샷 2024-11-27 오후 12 52 14" src="https://github.com/user-attachments/assets/f7ee7ba2-4d0d-429d-9b6d-8d8b03c6067a">

### 🌟 Context API - use client

-   use client 지시문은 Next.js에서 클라이언트 전용 컴포넌트임을 명시하기 위해 사용됩니다.
-   서버 컴포넌트와 클라이언트 컴포넌트를 구분하여 효율적인 렌더링을 지원합니다.

### 🚀 디렉토리 구조

**주요 디렉토리**

-   app : Routing Page 관리
-   components : 공통 컴포넌트 관리
-   context : Context 컴포넌트 관리
-   features : 기능별 컴포넌트 관리
-   store : Redux store 설정 파일 관리
-   styles : 스타일 파일 관리

### 🌟 Components vs Features

<img width="513" alt="스크린샷 2024-11-27 오후 12 52 14" src="https://github.com/user-attachments/assets/4d02f15a-174e-4620-8e00-bdd37fde2b1d">

### 🔍 Redux

-   Slice: 특정 상태와 reducer 함수를 모아 관리.
-   Provider: 전역 상태를 공급하기 위해 사용.
-   전역 사용 시 layout 파일에 정의 가능.
-   클라이언트 전용이므로 별도 컴포넌트로 분리 권장.

### 🌟 Context API vs Redux

<img width="694" alt="스크린샷 2024-11-27 오후 12 57 49" src="https://github.com/user-attachments/assets/e96c1493-2136-4ca2-b8ca-b6e54827af98">

### 🚀 Redux의 단점

-   초기 설정이 복잡하며 학습 곡선이 높음.
-   작은 프로젝트에서는 사용하기 과도할 수 있음.
-   Boilerplate 코드가 많아질 수 있음.

## 🌟 다크모드 토글 예제 (Context API 활용)

```jsx
'use client';

import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => setDarkMode(!darkMode);

    return <ThemeContext.Provider value={{ darkMode, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

// Example Component
export const ThemeToggleButton = () => {
    const { darkMode, toggleTheme } = useTheme();

    return <button onClick={toggleTheme}>{darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</button>;
};
```

<hr>

# 12주차 강의 내용

## 07-1 UI 라이브러리

UI 라이브러리, 프레임워크, 유틸리티 기능이 **필수는 아니지만**,  
생산성을 높이고 UI의 **일관성**을 유지하는 데 큰 도움을 줄 수 있습니다.

이번 장에서는 아래의 3가지 프레임워크에 대해 간단히 알아보겠습니다.

---

### 📌 Chakra UI

-   **설명**: 손쉽게 접근성과 스타일링이 가능한 UI 라이브러리입니다.
-   **장점**: 컴포넌트 기반으로 생산성이 높으며, 스타일링이 직관적입니다.

### 📌 [TailwindCSS](https://tailwindcss.com)

-   **설명**: 유틸리티 클래스 기반의 CSS 프레임워크로, 빠르고 유연한 스타일링이 가능합니다.
-   **장점**: 클래스만으로 스타일을 지정해 코드 가독성이 높고, 커스터마이징이 용이합니다.

### 📌 Headless UI

-   **설명**: UI 로직만 제공하는 비주얼 프레임워크로, 스타일링을 커스터마이징 할 수 있습니다.
-   **장점**: 스타일링에 제한이 없어 유연하게 디자인을 적용할 수 있습니다.

---

## 07-2 Chakra UI

Chakra UI는 오픈소스 컴포넌트 라이브러리로, 모듈화가 잘 되어 있으며 **접근성**이 뛰어나고 보기 좋은 UI를 만드는데 유용합니다.

---

### 🌟 주요 특징

-   다양한 **내장 컴포넌트** 제공: 버튼, 모달, 입력 필드 등 여러 UI 요소를 손쉽게 사용할 수 있습니다.
-   **Dark Mode 및 Light Mode** 지원: 사용자 환경에 맞는 컬러 모드를 설정할 수 있습니다.
-   **`useColorMode` 훅** 지원: 현재 사용 중인 컬러 모드를 손쉽게 확인하고 변경할 수 있습니다.
-   **컴포넌트 조합** 기능: 기본 컴포넌트를 활용해 새로운 컴포넌트를 쉽게 만들 수 있습니다.
-   **타입스크립트** 기반: 개발자에게 안정성과 편리함을 제공합니다.

---

### 🚀 Chakra UI의 장점

-   React와 Next.js와의 높은 호환성으로 프론트엔드 개발에 최적화된 환경을 제공합니다.
-   **[Chakra UI 공식 사이트](https://chakra-ui.com/)**

## 07-3 Tailwind CSS

Tailwind CSS는 다른 프레임워크와 달리 **CSS 규칙만**을 제공하는 유틸리티 중심의 프레임워크입니다. 필요한 스타일링만을 제공하기 때문에 **디자인의 자유도**가 높습니다.

---

### 🌟 주요 특징

-   **CSS 규칙만 제공**: 자바스크립트 모듈이나 리액트 컴포넌트를 제공하지 않기 때문에 필요한 경우 직접 컴포넌트를 만들어 사용해야 합니다.
-   **유연한 디자인**: 변수값을 조정하여 개성 있는 디자인을 만들 수 있으며, 디자인에 대한 자유도가 매우 높습니다.
-   **다크 모드 및 라이트 모드 지원**: 손쉽게 다크 모드와 라이트 모드를 적용할 수 있습니다.
-   **빌드 최적화**: 빌드 시 사용하지 않는 클래스는 자동으로 제거되므로 최적화 수준이 높습니다.
-   **반응형 규칙 제공**: CSS 클래스 접두사를 통해 모바일, 데스크톱, 태블릿 등 다양한 화면 크기에 맞는 규칙을 설정할 수 있습니다.
    -   `sm(640px)`, `md(768px)`, `lg(1024px)`, `xl(1280px)`, `2xl(1536px)`

---

### 🚀 Tailwind CSS의 장점

-   프로젝트에 필요한 최소한의 스타일링만 추가할 수 있어 **성능이 최적화**됩니다.
-   디자인을 유연하게 구성할 수 있어 다양한 환경에서 적응형 디자인을 쉽게 구축할 수 있습니다.
-   **[Tailwind CSS 공식 사이트](https://tailwindcss.com/)**

## 07-4 Headless UI

Headless UI는 **TailwindCSS를 만든 Tailwind Labs 팀**의 무료 오픈소스 프로젝트입니다.

---

### 🌟 Headless UI의 필요성

-   **TailwindCSS**는 웹 컴포넌트 내부에서 사용할 수 있는 **CSS 클래스만** 제공합니다.
-   따라서 모달, 버튼 등 **동적 컴포넌트**를 만들려면 직접 자바스크립트 코드로 구현해야 합니다.
-   이러한 단점을 보완하기 위해 **Headless UI**가 탄생했습니다.

---

### 🧩 Headless UI의 특징

-   **CSS 클래스만 제공**하는 것이 아닌, 동작이 포함된 **동적 컴포넌트**를 제공합니다.
-   TailwindCSS와 **Headless UI**를 함께 설치하고 사용할 수 있으며,  
    공식 사이트에서는 **Headless UI만 설치**하는 것으로 안내되어 있으니 확인이 필요합니다.

---

### 🔗 참고 링크

-   **[Headless UI 공식 사이트](https://headlessui.com/)**

# 1. Project 생성

Tailwind 사용을 위해 프로젝트를 새로 생성합니다.

---

### 🌟 주요 설정 사항

-   **프로젝트 재설정**: 이미 생성된 프로젝트에 설정할 수도 있지만, 과정이 복잡하므로 새로 생성하는 것이 편리합니다.  
    _교재에도 설정 방법이 나와 있습니다._

-   **Next.js 14 버전 권장**: 프로젝트는 **Next.js 14** 버전으로 설정합니다.
-   **버전 호환성**: 현재 **15.0.2 버전**이 출시되었으나, Tailwind와의 호환성이 아직 완벽하지 않으므로 주의가 필요합니다.

---

### 🔧 프로젝트 생성 명령어

**기말고사에서도 14 버전으로 만들어아햠**

```bash
npx create-next-app@14
```

# 2. Tailwind CSS

Tailwind CSS 설정 및 사용 방법에 대해 단계별로 알아봅니다.

---

### 🌐 사이트 접근 및 설정

1. **구글 검색**: `tailwind`를 검색하여 공식 사이트에 접속합니다.
2. **홈 화면 확인**: Home 화면에서 Tailwind로 가능한 기능을 미리 확인할 수 있습니다.
3. **Get Started** 버튼 클릭: 설치 과정부터 설정 및 간단한 사용법을 확인할 수 있습니다.

---

### 📖 설치 및 초기 설정

4. **Framework Guides** 탭에서 Next.js 선택: Next.js 관련 설정 내용을 확인합니다.
    - 만약 프로젝트를 Tailwind를 사용하여 생성했다면, 이 과정은 생략 가능합니다.
5. **파일 생성**: `App/tailwind/page.js` 파일을 생성하고, 마지막에 `hello world!` 메시지를 출력하여 동작을 확인합니다.

---

### 🧩 컴포넌트 연습

6. 상단의 **Component 메뉴**를 클릭하여 제공되는 여러 컴포넌트를 연습해봅니다.

---

### 🔗 추가 참고 사이트

-   **Tailwind의 발전**: 처음에는 CSS 라이브러리로 시작했지만, 이제는 UI 라이브러리로도 확장되었습니다.
-   [Tailwind CSS 공식 사이트](https://tailwindcss.com/)와 [Tailwind UI 사이트](https://tailwindui.com/)

-   tailwind 실습코드

```jsx
//202030408 김진석
export default function Tailwind() {
    return (
        <>
            <div class="bg-white border-slate-100 dark:bg-slate-800 dark:border-slate-500 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
                <div class="flex items-center space-x-4">
                    <img
                        src="/full-stack-radio.png"
                        alt=""
                        width="88"
                        height="88"
                        class="flex-none rounded-lg bg-slate-100"
                        loading="lazy"
                    />
                    <div class="min-w-0 flex-auto space-y-1 font-semibold">
                        <p class="text-cyan-500 dark:text-cyan-400 text-sm leading-6">
                            <abbr title="Episode">Ep.</abbr> 128
                        </p>
                        <h2 class="text-slate-500 dark:text-slate-400 text-sm leading-6 truncate">
                            Scaling CSS at Heroku with Utility Classes
                        </h2>
                        <p class="text-slate-900 dark:text-slate-50 text-lg">Full Stack Radio</p>
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="relative">
                        <div class="bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                                class="bg-cyan-500 dark:bg-cyan-400 w-1/2 h-2"
                                role="progressbar"
                                aria-label="music progress"
                                aria-valuenow="1456"
                                aria-valuemin="0"
                                aria-valuemax="4550"
                            ></div>
                        </div>
                        <div class="ring-cyan-500 dark:ring-cyan-400 ring-2 absolute left-1/2 top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow">
                            <div class="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5"></div>
                        </div>
                    </div>
                    <div class="flex justify-between text-sm leading-6 font-medium tabular-nums">
                        <div class="text-cyan-500 dark:text-slate-100">24:16</div>
                        <div class="text-slate-500 dark:text-slate-400">75:50</div>
                    </div>
                </div>
            </div>
            <div class="bg-slate-50 text-slate-500 dark:bg-slate-600 dark:text-slate-200 rounded-b-xl flex items-center">
                <div class="flex-auto flex items-center justify-evenly">
                    <button type="button" aria-label="Add to favorites">
                        <svg width="24" height="24">
                            <path
                                d="M7 6.931C7 5.865 7.853 5 8.905 5h6.19C16.147 5 17 5.865 17 6.931V19l-5-4-5 4V6.931Z"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                    <button type="button" class="hidden sm:block lg:hidden xl:block" aria-label="Previous">
                        <svg width="24" height="24" fill="none">
                            <path
                                d="m10 12 8-6v12l-8-6Z"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M6 6v12"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                    <button type="button" aria-label="Rewind 10 seconds">
                        <svg width="24" height="24" fill="none">
                            <path
                                d="M6.492 16.95c2.861 2.733 7.5 2.733 10.362 0 2.861-2.734 2.861-7.166 0-9.9-2.862-2.733-7.501-2.733-10.362 0A7.096 7.096 0 0 0 5.5 8.226"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M5 5v3.111c0 .491.398.889.889.889H9"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                </div>
                <button
                    type="button"
                    class="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
                    aria-label="Pause"
                >
                    <svg width="30" height="32" fill="currentColor">
                        <rect x="6" y="4" width="4" height="24" rx="2" />
                        <rect x="20" y="4" width="4" height="24" rx="2" />
                    </svg>
                </button>
                <div class="flex-auto flex items-center justify-evenly">
                    <button type="button" aria-label="Skip 10 seconds">
                        <svg width="24" height="24" fill="none">
                            <path
                                d="M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M19 5v3.111c0 .491-.398.889-.889.889H15"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                    <button type="button" class="hidden sm:block lg:hidden xl:block" aria-label="Next">
                        <svg width="24" height="24" fill="none">
                            <path
                                d="M14 12 6 6v12l8-6Z"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M18 6v12"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </button>
                    <button
                        type="button"
                        class="rounded-lg text-xs leading-6 font-semibold px-2 ring-2 ring-inset ring-slate-500 text-slate-500 dark:text-slate-100 dark:ring-0 dark:bg-slate-500"
                    >
                        1x
                    </button>
                </div>
            </div>
            <h1 className="text-3xl font-bold underline mb-4">Tailwind Page</h1>
            <div className="space-y-4">
                <div className="w-96 bg-white shadow rounded p-4">w-96</div>
                <div className="w-80 bg-white shadow rounded p-4">w-80</div>
                <div className="w-72 bg-red-500 shadow rounded p-4">w-72</div> {/* 배경 색상을 빨간색으로 설정 */}
                <div className="w-64 bg-blue-500 shadow rounded p-4">w-64</div> {/* 배경 색상을 파란색으로 설정 */}
                <div className="w-56 bg-green-500 shadow rounded p-4">w-56</div> {/* 배경 색상을 초록색으로 설정 */}
                <div className="w-52 bg-yellow-500 shadow rounded p-4">w-52</div> {/* 배경 색상을 노란색으로 설정 */}
                <div className="w-48 bg-purple-500 shadow rounded p-4">w-48</div> {/* 배경 색상을 보라색으로 설정 */}
            </div>
        </>
    );
}
```

# 2. Tailwind CSS

Tailwind CSS를 사용할 때 주의해야 할 사항과 테스트 방법에 대해 알아봅니다.

---

### ⚠️ 주의 사항

-   **React 환경**: Tailwind는 React를 기준으로 하여, 바로 코드를 사용하면 오류가 발생할 수 있습니다.
-   **Test 코드 신뢰성**: 공식 사이트([tailwindcss.com](https://tailwindcss.com))에 있는 테스트 코드는 오류가 적습니다. 참고하여 사용하는 것이 좋습니다.

---

### 🔍 테스트 및 오류 해결

1. **공식 문서 참고**: [tailwindcss.com](https://tailwindcss.com)에서 제공하는 Doc을 참고하여 테스트를 진행합니다.
2. **img 태그 오류**: 테스트 과정에서 `img` 태그와 같은 몇 가지 요소는 추가 설정이 없으면 오류가 발생할 수 있습니다.
3. **class 속성 변경**: React에서는 `class` 대신 **`className`**을 사용해야 오류가 발생하지 않습니다.

---

# 3. Headless UI

Headless UI 사용 방법과 테스트 과정에 대해 단계별로 정리해 보았습니다.

---

### 🌐 사이트 접근 및 정보 확인

1. **구글 검색**: `headless ui`를 검색하여 공식 사이트에 접속합니다.
2. **Home 화면 확인**: Home 화면에서 **GitHub 아이콘**을 클릭하여 Headless UI의 일반적인 사항을 확인합니다.

---

### 📝 파일 생성 및 테스트

3. **파일 생성**: `App/headless/page.js` 파일을 생성합니다. (오타 주의: "haedless"가 아닌 "headless")
4. **Dropdown Menu 테스트**: Dropdown Menu 컴포넌트를 테스트하여 동작을 확인합니다.
5. **Button 테스트 및 Tailwind 클래스 수정**: Button 컴포넌트를 테스트하고 Tailwind CSS 클래스를 사용해 스타일을 조정해 봅니다.

---

-   실습 코드

```jsx
// 페이지 컴포넌트를 Client Component로 지정
'use client';

import { Switch } from '@headlessui/react';
import { useState } from 'react';

function Example() {
    const [enabled, setEnabled] = useState(false);

    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
                enabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
            <span className="sr-only">Enable notifications</span>
            <span
                className={`${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform bg-white rounded-full transition`}
            />
        </Switch>
    );
}

export default Example;
```

# 4. Chakra UI

Chakra UI를 설정하고 Next.js 프로젝트에서 사용하는 방법에 대해 알아봅니다.

---

### 🌐 사이트 접근 및 설정

1. **구글 검색**: `Chakra UI`를 검색하고 공식 사이트에 접속합니다.
2. **Start Building 클릭**: Home 화면에서 **Start Building** 버튼을 클릭하고 Next.js를 선택합니다.
3. **파일 생성**: `App/chakra/page.js` 파일을 생성합니다.

---

### 🛠 설치 및 설정

4. **Chakra UI 설치**: 사이트의 지시에 따라 Chakra UI를 설치합니다.
5. **Snippets 설치**: Snippets를 설치하면 `src/components/ui` 아래에 필요한 컴포넌트가 추가됩니다.
6. **Provider 설정**: `Layout`에 `provider`를 설정하여 Chakra UI의 Context를 구성합니다.
7. **tsconfig 설정 확인**: `tsconfig` 파일에서 설정을 확인하고, 필요한 설정이 누락되어 있으면 추가합니다.
8. **next.config.mjs 수정**: `next.config.mjs` 파일을 수정하여 Chakra UI가 Next.js에서 정상적으로 작동하도록 설정합니다.

---

### 🔍 컴포넌트 테스트

9. **Component 메뉴에서 테스트**: Component 메뉴에서 **Accordion** 컴포넌트를 선택하여 테스트해 봅니다.

---

이렇게 하면 Chakra UI와 Next.js의 설정을 마치고 다양한 컴포넌트를 쉽게 사용할 수 있습니다.

-   chakra - ui 실습코드 1

```jsx
import { Button } from '@/components/ui/button';
import { HStack } from '@chakra-ui/react';

export default function Demo() {
    return (
        <HStack>
            <Button>Click me</Button>
            <Button>Click me</Button>
        </HStack>
    );
}
```

-   chakra - ui 실습코드 2

```jsx
import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from '@/components/ui/accordion';

const Demo = () => {
    return (
        <AccordionRoot collapsible defaultValue={['b']}>
            {items.map((item, index) => (
                <AccordionItem key={index} value={item.value}>
                    <AccordionItemTrigger>{item.title}</AccordionItemTrigger>
                    <AccordionItemContent>{item.text}</AccordionItemContent>
                </AccordionItem>
            ))}
        </AccordionRoot>
    );
};

const items = [
    { value: 'a', title: 'First Item', text: 'Some value 1...' },
    { value: 'b', title: 'Second Item', text: 'Some value 2...' },
    { value: 'c', title: 'Third Item', text: 'Some value 3...' },
];

export default Demo;
```

-   chakra - ui 실습코드 3

```jsx
import { ClipboardIconButton, ClipboardRoot } from '@/components/ui/clipboard';

const Demo = () => {
    return (
        <ClipboardRoot value="https://chakra-ui.com">
            <ClipboardIconButton />
        </ClipboardRoot>
    );
};

export default Demo;
```

-   chakra - ui 실습코드 4

```
import { Badge, Stack } from '@chakra-ui/react';

const Demo = () => {
    return (
        <Stack direction="row">
            <Badge>Default</Badge>
            <Badge colorPalette="green">Success</Badge>
            <Badge colorPalette="red">Removed</Badge>
            <Badge colorPalette="purple">New</Badge>
        </Stack>
    );
};

export default Demo;
```

-   react icons 실습 코드

```jsx
import { Gi3dMeeple } from 'react-icons/gi';
import React from 'react';

const page = () => {
    return (
        <>
            <div>react icons pages</div>
            <Gi3dMeeple size={300} color="skyblue" />
        </>
    );
};

export default page;
```

<hr>

# 11주차 강의 내용

### 06. CSS와 내장 스타일링 메서드

### 6.1 Styled JSX

-   #### Styled JSX는 CSS-in-JS 라이브러리 입니다. 내장 모듈이기 때문에 설치가 필요 없습니다.
-   #### 즉, CSS속성 지정을 위해 자바스크립트를 사용할 수 있는 라이브러리 이다.

```jsx
'use client';

export default function CssEx() {
    return (
        <>
            <h1>CssEx Page</h1>
            <button className="button">버튼1</button>
            <style jsx>
                {`
                    .button {
                        background: green;
                        color: white;
                    }
                `}
            </style>
        </>
    );
}
```

### CSS-in-JS의 단점

-   #### IDE나 코드 편집기 등 개발 도구에 대한 지원이 부족하다.
-   #### 문법 하이라이팅, 자동 완성, 린트 기능을 제공하지 않는다.
-   #### 코드 내에서 CSS에 대한 의조성이 점점 커지기 때문에 앱 번들도 커지고 느려진다.
-   #### 서버에 미리 CSS를 생성해도 클라이언트에서 리액트 하이드레이션이 끝나면 CSS를 다시 생성해야 한다.

### 6.2 CSS Module

-   #### CSS-in-JS의 단점을 회피하ㅣ 위한 좋은 방법은 바로 CSS Module이다.

```jsx
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
    return (
        <>
            <h1 className={styles.main}>Home Page</h1>
            <h1 className={styles.title}>Home Page</h1>
        </>
    );
}
```

```css
.title {
    color: red;
}

.main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 6rem;
    min-height: 50vh;
}
```

#### composes

```css
.woo {
    color: green;
    background: red;
    display: flex;
    flex: 1;
}

.gie {
    composes: woo;
    color: yellow;
}
```

### 06-3 SASS

-   #### Next에서 기본으로 지원하는 전 처리기 입니다.
-   #### 단 패키지 설치가 필요하다. $ npm install sass
-   #### SASS 및 SCSS(Sassy CSS) 문법으로 CSS Moudule을 만들고 사용할 수 있다.

```css
$font-size: red;

.bar {
    color: $font-size;
}
```

<hr>

# 10주차 강의 내용

## 📄 4.2 데이터 불러오기

-   Next는 클라이언트와 서버 모두에서 데이터를 불러올 수 있습니다.
-   서버에서 데이터를 불러오는 두 가지 상황:

1. 정적 페이지를 만들 때 getStaticProps 함수를 사용하여, 빌드 시점에 데이터를 불러올 수 있습니다.
2. 서버가 페이지를 렌더링할 때 getServerSideProps를 통해 실행 도중 데이터를 불러올 수도 있습니다.

-   데이터베이스에서 데이터를 가져올 수도 있지만, 안전하지 않기 때문에 백엔드에서 처리하는 것을 권장합니다.
-   Next.js는 프론트엔드만 담당하는 것이 좋습니다.

## 🌐 서버가 데이터 불러오기

-   서버에서는 두 가지 방법으로 HTTP 요청을 만들고 처리할 수 있습니다.

1. Node의 내장 HTTP 라이브러리 사용

-   서드파티 HTTP 클라이언트와 비교했을 때 설정과 처리가 번거로울 수 있습니다. 2. HTTP 클라이언트 라이브러리 사용 (가장 유명한 것은 Axios)
-   Axios를 사용하는 이유

1. 클라이언트와 서버에서 동일한 코드로 사용할 수 있습니다.
2. npm 다운로드 횟수가 일주일에 약 1,700만 회로 매우 활발하게 사용됩니다.

## 🔐 서버에서 REST API 사용하기

-   REST API를 호출할 때는 public API를 호출할 것인지, private API를 호출할 것인지 확인이 필요합니다.
-   Public API: 인증이나 권한 없이 누구나 호출 가능
-   Private API: 호출 전 인증과 권한 검사 과정 필요
-   예를 들어, Google API 사용 시 OAuth 2.0을 사용해야 합니다. 이는 거의 산업 표준입니다.
-   기타 API들도 인증 및 권한 검증 과정이 있는지 반드시 확인해야 합니다.
-   97페이지부터 진행하는 프로젝트는 GitHub에 있는 저자의 코드와 비교하며 테스트하기를 권장합니다.

## 🚀 ssr-rest-api 프로젝트 (Page 97)

1. 새로운 Next 프로젝트 생성

```bash
  npx create-next-app ssr-rest-api
```

2. Axios 패키지 추가

```bash
  $ npm install axios
```

3. 프로젝트 개요

    - public API를 호출하여 사용자의 이름과 ID를 표시합니다.
    - 사용자의 이름을 클릭하면 세부 페이지로 이동하여 자세한 정보를 볼 수 있습니다.

4. 코드 수정

    - pages/index.js 파일을 page97의 코드처럼 수정합니다.
    - 코드 실행 시 에러가 발생할 수 있는데, 이는 아직 사용자 데이터를 불러오지 못했기 때문입니다.
    - getServerSideProps 함수를 사용하여 REST API를 호출하고, HomePage 컴포넌트에 데이터를 전달합니다.

5. REST API 호출 부분에 page98의 코드 추가

    - 이 코드를 통해 서버에 접속하며, 올바르게 설정되면 그림 1-4와 같은 렌더링 결과를 확인할 수 있습니다.

# 📘 REST API - 개요

-   REST (Representational State Transfer) 는 자원을 이름으로 구분하고, 자원의 상태를 통신을 통해 주고받는 방식을 의미합니다.

🔹 REST 구성 요소

1. HTTP URI (Uniform Resource Identifier)
   → 자원(Resource)을 식별하기 위한 통일된 자원 식별자입니다.
2. HTTP Method
   → POST, GET, PUT, DELETE, PATCH 등을 사용하여 자원에 CRUD 작업을 적용합니다.

🔹 CRUD란?

CRUD는 데이터 처리를 위한 기본적인 기능입니다.

-   Create : 데이터 생성 POST
-   Read : 데이터 조회 GET
-   Update : 데이터 수정 PUT, PATCH
-   Delete : 데이터 삭제 DELETE

    REST API란 REST의 규칙을 적용하여 설계된 API입니다.

## 2. Json Server

-   Backend가 개발되기 전이거나, 외부 API가 아직 결정되지 않았다면 Local 환경에 Json Server를 구축하여 Frontend 개발을 할 때 매우 유용한 Node 패키지입니다.

🔹 Json Server 설치

```bash
  $ npm i -g json-server
```

-   설치 완료 메시지:

```bash
 added 45 packages in 9s
 14 packages are looking for funding
 run `npm fund` for details
```

🔹 설치 확인 (버전 체크)

-   Json Server가 제대로 설치되었는지 버전을 확인합니다.

```bash
$ json-server --version
```

-   버전 예시:

```bash
1.0.0-beta.3

```

## 2. Json Server

-   Json-server는 다음 명령어로 실행합니다:

```bash
$ json-server ./data.json --port 3001
```

-   실행 결과 예시:

```bash
JSON Server started on PORT :3001
Press CTRL-C to stop
Watching ./data.json...

( ˘︹˘ )

Index:
http://localhost:3001/

Static files:
Serving ./public directory if it exists

Endpoints:
http://localhost:3001/token
http://localhost:3001/test
```

## 3. Axios 란?

-   Next.js에서 REST API를 다룰 때는 보통 Axios와 fetch 중 하나를 선택하는 경우가 많습니다.

-   아래는 두 가지 방법의 특징과 장단점을 비교한 내용입니다.

🟦 Axios

-   간편한 문법: 기본적으로 JSON 데이터를 자동 변환해주므로, res.data로 쉽게 접근할 수 있습니다.
-   HTTP 요청 취소: 요청을 취소할 수 있는 기능이 내장되어 있습니다.
-   요청 및 응답 인터셉터: 요청이나 응답을 가로채어 수정할 수 있는 기능이 있어, 인증 토큰 추가와 같은 작업이 간편합니다.
-   진보된 오류 처리: HTTP 오류 코드에 따라 에러를 더 쉽게 처리할 수 있습니다.

🟨 단점

-   추가 패키지 설치 필요: Axios는 외부 라이브러리이기 때문에 설치가 필요하며, 코드 크기가 약간 증가합니다. 그러나 큰 차이는 없습니다.

# 3. Axios 란?

🟩 Fetch API

-   내장 API: 브라우저에 내장되어 있어 별도의 설치가 필요 없습니다.
-   Promise 기반: 비동기 작업을 처리하는 데 익숙한 구조입니다.
-   스트림 처리: 데이터를 스트리밍으로 처리할 수 있어, 큰 파일을 다룰 때 유용합니다.

🟨 단점

-   JSON 변환 수동 처리: 응답을 JSON으로 변환할 때 res.json()을 호출해야 합니다.
-   에러 처리 복잡성: HTTP 오류 코드(예: 404, 500)에 대한 처리가 약간 더 복잡할 수 있습니다. 기본적으로 fetch는 네트워크 오류만을 reject합니다.

## 3. Axios 란?

📌 결론

-   복잡한 요청이나 에러 처리가 필요한 경우에는 Axios가 더 적합할 수 있습니다.
-   간단한 요청이나 내장된 기능만 활용하고 싶다면 fetch를 사용하는 것도 좋은 선택입니다.
-   어떤 것을 선택할지는 프로젝트의 요구 사항과 개발자의 선호도에 따라 다를 수 있습니다.

## 3. Axios 설치

-   axios를 설치하려면 다음 명령어를 사용합니다:

```bash
npm i axios
```

-   설치 완료 예시:

```bash
added 9 packages, and audited 322 packages in 2s

130 packages are looking for funding
run `npm fund` for details

found 0 vulnerabilities
```

## 3. Axios 사용하기

-   다음은 간단한 사용법 예제입니다.

```js
const res = await axios.get('https://api.example.com');
const products = res.data; // Axios에서 응답 본문의 데이터를 가져옴
```

-   위 코드에서 axios를 사용하여 객체를 생성하고 다시 데이터를 저장하고 있습니다. 왜 그럴까요?
-   다음은 Fetch API의 예시입니다. 비교해 보세요.

```js
fetch('https://api.example.com')
    .then((res) => res.json()) // fetch에서는 json()으로 데이터를 추출
    .then((data) => {
        console.log(data); // 여기에 실제 응답 데이터가 있음
    });
```

-   코드를 보면 2번째 라인에서 json() 함수를 사용하여 JSON 데이터를 추출하고 있습니다.
-   Axios에서 res 객체는 통신에 필요한 데이터까지도 포함하고 있습니다. 따라서 res.data를 이용하여 JSON 데이터만 추출하는 것입니다.

## 3. Axios 사용하기

-   axios.get()을 통해 받아온 응답 객체인 res는 단순히 JSON 데이터만 담고 있는 것이 아니라, HTTP 통신과 관련된 다양한 정보를 포함하고 있습니다.

## 🔍 응답 객체(res)의 주요 속성

-   res.status: HTTP 응답 상태 코드 (예) 200, 404, 500 등
-   res.headers: 서버로부터 받은 헤더 정보
-   res.config: 요청에 대한 설정 정보
-   res.statusText: 응답 상태에 대한 설명 (예) “OK”
-   res.data: 서버가 실제로 전송한 데이터
    👉 가장 중요한 응답 내용으로, 실제 JSON 데이터에 접근할 때 사용됩니다.

-   res.data는 서버가 전송한 실제 데이터에 접근하는 속성입니다. Axios를 통해 응답 데이터를 쉽게 가져올 수 있습니다.

## 3. Axios 사용하기

-   위 코드에서는 비동기 데이터 로딩과 상태 관리가 제대로 고려되지 않아 몇 가지 문제가 있을 수 있습니다.
-   특히, Next.js와 같은 리액트 기반 앱에서 비동기 데이터를 처리할 때 렌더링 주기에 맞춰 상태를 관리해야 합니다.

## 🔧 개선할 부분

1. useState와 useEffect 사용
    - 비동기 데이터를 가져오는 작업은 컴포넌트의 상태(state)로 관리하는 것이 일반적입니다. 현재 코드에서는 users 데이터가 비동기적으로 로드되는데, 이를 관리하기 위해 useState와 useEffect 훅이 필요합니다.
    - 데이터를 로드하기 전에 컴포넌트가 렌더링되기 때문에, users 변수가 초기에는 존재하지 않아 undefined 에러가 발생할 가능성이 있습니다.
2. Loading 상태 처리
    - 데이터를 불러오는 동안 사용자가 기다릴 수 있도록 로딩 상태를 추가하는 것이 좋습니다. 로딩 중에는 로딩 메시지나 스피너를 보여주는 것이 사용자 경험에 도움이 됩니다.

### 개선된 코드

```js
//kjs
'use client'; // 첫 줄에 추가하여 클라이언트 컴포넌트로 설정

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function RestApi() {
    // useState 이용
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 3001에 만들어 둔 json 값들 axios로 받아오기
                const res = await axios.get('http://localhost:3001/test');
                setUsers(res.data);
            } catch (error) {
                console.error('데이터 불러오기에 실패했습니다:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {/*값 불러오기*/}
            <h1>Axios로 불러온 데이터</h1>
            {users.length > 0 ? (
                users.map((user, id) => (
                    <div key={id}>
                        <h2>ID: {user.id}</h2>
                        <h3>이름: {user.name}</h3>
                        <p>타이틀: {user.title}</p>
                        <p>본문: {user.body}</p>
                    </div>
                ))
            ) : (
                <p>데이터를 불러오는 중입니다...</p>
            )}
        </div>
    );
}
```

### jsonPlaceHolder에서 가져오기

```js
'use client'; // Next.js에서 클라이언트 컴포넌트로 설정

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function RestApi() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null); // 에러 상태 추가

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://jsonplaceholder.typicode.com/users');
                setUsers(res.data); // 데이터를 상태에 저장
            } catch (error) {
                setError('데이터를 불러오는 데 실패했습니다.'); // 에러 메시지 설정
            } finally {
                setLoading(false); // 로딩 상태 해제
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>데이터를 불러오는 중입니다...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Axios로 불러온 JSONPlaceholder 데이터</h1>
            {users.map((user) => (
                <div key={user.id}>
                    <h2>ID: {user.id}</h2>
                    <h3>이름: {user.name}</h3>
                    <p>이메일: {user.email}</p>
                    <p>
                        주소: {user.address.street}, {user.address.city}
                    </p>
                    <p>경도 : {user.address.geo.lat}</p>
                </div>
            ))}
        </div>
    );
}
```

### jsonPlaceHolder 내용 에서 별도로 추가한 코드

```js
'use client'; // Next.js에서 클라이언트 컴포넌트로 설정

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function RestApi() {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [error, setError] = useState(null); // 에러 상태 추가

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, postsRes] = await Promise.all([
                    axios.get('https://jsonplaceholder.typicode.com/users'),
                    axios.get('https://jsonplaceholder.typicode.com/posts'),
                ]);

                setUsers(usersRes.data); // users 데이터를 상태에 저장
                setPosts(postsRes.data); // posts 데이터를 상태에 저장
            } catch (error) {
                setError('데이터를 불러오는 데 실패했습니다.'); // 에러 메시지 설정
            } finally {
                setLoading(false); // 로딩 상태 해제
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>데이터를 불러오는 중입니다...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Axios로 불러온 JSONPlaceholder 데이터</h1>
            {users.map((user) => (
                <div key={user.id}>
                    <h2>ID: {user.id}</h2>
                    <h3>이름: {user.name}</h3>
                    <p>이메일: {user.email}</p>
                    <p>
                        주소: {user.address.street}, {user.address.city}
                    </p>
                    <p>경도 : {user.address.geo.lat}</p>

                    <h3>Posts</h3>
                    {posts
                        .filter((post) => post.userId === user.id)
                        .map((post) => (
                            <div key={post.id} style={{ marginLeft: '20px' }}>
                                <h4>Post ID: {post.id}</h4>
                                <p>제목: {post.title}</p>
                                <p>내용: {post.body}</p>
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
}
```

<hr>

# 9주차 강의 내용

## 1. Static Resource

-   정적 자원 중 이미지 파일은 SEO에 많은 영향을 미침
-   다운로드 시간이 많이 걸리고, 렌더링 후에 레이아웃이 변경되는 등 UX에 영향을 미침
-   이것을 누적 레이아웃 이동(CLS: Cumulative Layout Shift)이라고 함
-   Image 컴포넌트를 사용하면 CLS 문제를 해결함
-   lazy loading: 이미지 로드 시점을 필요할 때까지 지연시키는 기술임
-   이미지 사이즈 최적화로 사이즈를 1/10 이하로 줄여 줌
-   Placeholder를 제공함

## 1. Image component - local

-   Image 컴포넌트를 사용하면 다양한 props를 전달할 수 있다

-   [주요 props]

    -   src = “ “
    -   width = { 500 }
    -   height = { 500 }
    -   alt = “ “
    -   Placeholder = “blue”
    -   외부 이미지는 blurDataURL=' ' 로 처리
    -   loading = “lazy”

## 1. Image component - local

    -	정적 자원은 기본적으로 public 디렉토리에 저장함
    -	정적 자원은 번들링 이후에도 변하지 않기 때문
    -	여러 종류의 정적 자원을 사용할 경우 public의 root에 각각 디렉토리를 만들어 사용
    -	Image도 마찬가지로 /public/images 디렉토리를 만들고 사용
    -	이미지를 불러오는 방법은 직접 불러오는 방법과 import하는 방법 2가지가 있다
    -	이미지의 경로는 /images/[이미지 이름.확장자]로 합니다. 이 때 public은 생략

```js
import Image from 'next/image'
202030408 김진석
export default function About() {
  return (
    <div>
      <h1>About</h1>
      <p>This is the About page</p>
      <Image src="/images/person.jpg" alt="person" width={300} height={500} />
    </div>
  )
}
```

## 1. Image component - local

-   fill은 화면에 꽉 차게 출력 - width, height와 함께 사용할 수 없다

```js
import Image from 'next/image';

export default function About() {
    return (
        <div>
            <Image src="/images/person.jpg" alt="person" layout="fill" />
        </div>
    );
}
```

-   responsive는 부모 요소의 크기에 따라서 이미지의 크기가 변함
-   width와 height는 반드시 작성해야 함

```js
import Image from 'next/image';

export default function About() {
    return (
        <div>
            <Image src="/images/person.jpg" alt="person" layout="responsive" width={300} height={500} />
        </div>
    );
}
```

-   실습코드

```js
20203048
import 하거나 직접 입력하거나 두가지 방법 사용

import React from 'react';
import Galxy1 from '/public/images/galxy1.jpg';
import Image from 'next/image';

const page = () => {
    return (
        <>
            <h1>About</h1>
            <h2> This is about Page</h2>
            <Image src={Galxy1} alt="galxy1" width={1720} height={1024} />
            <Image src="/images/galxy2.jpg" alt="galxy2" width={1720} height={1024} />
        </>
    );
};

export default page;

```

## 1. Image component - Remote

-   Pixabay와 같은 외부 이미지를 사용하려면 next.config.mjs에 URL을 추가해 줘야 함
-   만일 파일이 없다면 Project root에 추가해 주면 된다
-   파일의 초기 상태는 다음과 같다

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};

export default nextConfig;
```

-   nextConfig에 images를 추가합니다.
-   간단하게 domains만 등록해 줘도 되지만, 공식 사이트의 추천은 두 번째 코드와 같습니다.

```js
const nextConfig = {
    images: {
        domains: ['cdn.pixabay.com'],
    },
};

export default nextConfig;
```

```js
추천 코드
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
    ],
  },
};

export default nextConfig;
```

## 1. Image component - Remote

-   이미지를 출력하는 코드
-   서비스에 따라서 도메인은 차이가 날 수 있다
-   Pixabay의 경우 원하는 이미지를 우클릭 하고, ‘이미지 주소 복사’로 주소를 복사
-   나머지는 local image 사용법과 같다
-   이미지가 정상적으로 출력되면 다운로드 받아 이미지의 상태를 확인

```js
import Image from 'next/image';

export default function About() {
    return (
        <div>
            <Image
                src={'https://cdn.pixabay.com/photo/2023/03/14/23/55/darling-7853389_1280.jpg'}
                width={300}
                height={500}
            />
        </div>
    );
}
```

-   실습 코드

```js
import React from 'react';
import Galxy1 from '/public/images/galxy1.jpg';
import Image from 'next/image';
202030408;
const page = () => {
    return (
        <>
            <h1>About</h1>
            <h2> This is about Page</h2>
            <Image src={Galxy1} alt="galxy1" width={1720} height={1024} />
            <Image src="/images/galxy2.jpg" alt="galxy2" width={1720} height={1024} />
            {/* 외부 서버 이미지 출력 */}

            <Image
                src={'https://cdn.pixabay.com/photo/2016/08/04/14/04/space-1569133_1280.jpg'}
                width={1720}
                height={1024}
            />
        </>
    );
};

export default page;
```

## 처리되지 않은 런타임 에러 (Unhandled Runtime Error)

-   에러 메시지:

    • Hydration이 실패했습니다. 그 이유는 초기 UI가 서버에서 렌더링된 것과 일치하지 않기 때문입니다.

서버에서의 예상 HTML 구조:

```js
<div>
    <div>
        <h1></h1>
    </div>
</div>
```

## 04. 코드 구성과 데이터 불러오기

-   4장에서는 애플리케이션의 디렉터리 구조를 어떻게 구성하는지 알아보자
-   클라이언트와 서버에서 외부 REST API 및 GraphQL API를 사용하는 방법도 알아 보자
-   프로젝트를 시작할 때 애플리케이션의 확장과 복잡도 증가에 대비해야 함
-   4-1절에서는 애플리케이션 상태를 빠르고 간결하게 관리할 수 있는 코드 구성 방법을 알아보자

-   알아볼 내용은 다음과 같다

-   아토믹 디자인 원칙(Atomic Design Principles / Atomic Design Pattern)에 따른 컴포넌트 구성
-   유틸리티 구성
-   정적 자원 구성
-   스타일 파일 구성
-   lib 파일 구성
-   서버에서 REST API를 사용하는 방법
-   클라이언트에서 REST API를 사용하는 방법
-   클라이언트 및 서버에서 Apollo를 이용하여 GraphQL API를 사용하는 방법

## 4.1 디렉토리 구조 구성

-   Next.js에서는 특정 파일과 디렉토리가 지정된 위치에 있어야 함
    -   예: \_app.js나 \_document.js 파일, pages/와 public/
-   Node_modules/: Next.js 프로젝트의 의존성 패키지를 설치하는 디렉토리
-   pages/: 애플리케이션의 페이지 파일을 저장하고 라우팅 시스템을 관리
-   public/: 컴파일된 CSS 및 자바스크립트 파일, 이미지, 아이콘 등의 정적 자원 관리
-   styles/: 스타일링 포맷(CSS, SASS, LESS 등)과 관계없이 스타일링 모듈 관리
-   pages/ 디렉토리를 src/ 디렉토리 안으로 옮길 수 있다
-   **public/**과 **node_modules/**를 제외한 다른 디렉토리는 모두 **src/**로 옮길 수 있다

## 컴포넌트 구성

-   컴포넌트는 세 가지로 분류하고 각 컴포넌트와 관련된 스타일 및 테스트 파일을 같은 곳에 두어야 함

    -   mkdir components && cd components
    -   mkdir atoms
    -   mkdir molecules
    -   mkdir organisms
    -   mkdir templates

-   코드를 더 효율적으로 구성하기 위해 아토믹 디자인 원칙에 따라 디렉토리를 구성합니다.

-   atoms: 가장 기본적인 컴포넌트 관리.
    -   button, input, p와 같은 표준 HTML 요소를 감싸는 용도로 사용되는 컴포넌트
-   molecules: atom에 속한 컴포넌트 여러 개를 조합하여 복잡한 구조로 만든 컴포넌트 관리.
    -   input과 label을 합쳐서 만든 새로운 컴포넌트
-   organisms: molecules와 atoms를 섞어서 더 복잡하게 만든 컴포넌트 관리.
    -   footer나 carousel 컴포넌트
-   templates: 위의 모든 컴포넌트를 어떻게 배치할지 결정해서 사용자가 접근할 수 있는 페이지를 구성

## Button 컴포넌트 구성

-   Button 컴포넌트를 예로 들면 다음과 같이 최소한 세 개의 파일을 만들어야 한다
-   컴포넌트 파일, 스타일 파일, 테스트 파일
-   이렇게 컴포넌트를 구성하면 필요할 때 컴포넌트를 찾고 수정하기 쉽다

-   mkdir components/atoms/Button
-   cd components/atoms/Button
-   touch index.js
-   touch button.test.js
-   touch button.styled.js # 또는 style.module.css

## 유틸리티 구성

-   컴포넌트를 만들지 않는 코드 파일을 유틸리티 스크립트라고 한다
-   예를 들어 애플리케이션의 로그(log) 파일을 저장하는 코드가 있다면, 이것을 컴포넌트로 만들 필요가 있을까?
-   이렇게 렌더링에 필요한 컴포넌트가 아닌 기타 필요한 스크립트가 있다면, utilities/ 디렉토리에 별도로 관리하는 것이 좋다
-   그리고 각 유틸리티에 맞는 테스트 파일도 만든다

-   cd utilities/
-   touch time.js
-   touch localStorage.js
-   touch jwt.js
-   touch logs.js

-   touch time.test.js
-   touch localStorage.test.js
-   touch jwt.test.js
-   touch logs.test.js

## 정적 자원의 구성

-   정적 자원은 public/ 디렉토리에서 관리한다
-   일반적인 웹 애플리케이션에서는 다음과 같은 정적 자원을 사용함:
-   이미지
-   컴파일한 자바스크립트 파일
-   컴파일한 CSS 파일
-   아이콘 (favicon 및 웹 앱 아이콘)
-   manifest.json, robot.txt 등의 정적 파일
-   먼저 public/assets/ 디렉토리를 만들고 파일 유형별로 다시 디렉토리를 추가한다
-   그리고 이곳에 저장된 파일에 접근하고자 하면, public을 제외한 주소를 써주면 된다

-   cd public && mkdir assets
-   cd assets
-   mkdir js
-   mkdir css
-   mkdir icons
-   mkdir images

## 스타일 파일 구성

-   스타일 파일은 앱에서 어떤 스타일 관련 기술을 사용하는가에 따라 구성 방식이 달라집니다.
-   Emotion, styled-components, JSS와 같은 CSS-in-JS 프레임워크의 경우, 컴포넌트별로 스타일 파일을 만듭니다. 이렇게 하면 스타일 변경도 쉽습니다.
-   만일 컬러 팔레트, 테마, 미디어 쿼리와 같은 공통 스타일의 경우는 styles/ 디렉토리를 사용합니다.

## lib 파일 구성

-   lib 파일은 서드파티 라이브러리를 감싸는 스크립트를 말함
-   lib 파일은 특정 라이브러리에 특화된 것이다 예 : GraphQL
-   만일 GraphQL을 사용한다면, 클라이언트를 초기화하고, 질의문과 뮤테이션을 저장하는 등의 작업이 필요함
-   먼저 이러한 스크립트를 좀 더 모듈화하기 위해 프로젝트 root에 lib/graphql/ 디렉토리를 만든다
-   그리고 다음과 같이 구성하여 관리

```
next-js-app/
└── lib/
    └── graphql/
        ├── index.js
        ├── queries/
        │   ├── query1.js
        │   └── query2.js
        └── mutations/
            ├── mutation1.js
            └── mutation2.js
```

## 4.2 데이터 불러오기

-   Next.js는 클라이언트와 서버 모두에서 데이터를 불러올 수 있다
-   서버는 다음 두 가지 상황에서 데이터를 불러올 수 있다
    -   1. 정적 페이지를 만들 때 getStaticProps 함수를 사용해서, 빌드 시점에 데이터를 불러올 수 있다
    -   2.  서버가 페이지를 렌더링할 때 getServerSideProps를 통해, 실행 도중 데이터를 불러올 수도 있다
-   데이터 베이스에서 데이터를 가져올 수도 있지만 안전하지 않기 때문에 권장하지 않습니다. 데이터베이스의 접근은 백엔드에서 처리하는 것이 좋다
-   Next.js는 프런트엔드만 담당하는 것이 좋다

<hr>

# 7주차 강의 내용

## app router 슬러그 사용

-   foo 라는 파일을 슬러그로 사용하고싶을시 , 새로운 폴더를 만들고 그 안에 슬러그 폴더를 넣는다
-   단 root에 슬러그를 만들시에 1개 이상을 만들면 안됨 -> 어떤 슬러그를 사용할지 모르기 때문
    js

```js
export default function page(props) {
    console.log(props);
    return (
        <>
            <h1>foo: {props.params.foo}</h1>
            {/* <h1>foo[]: {props.params.foo[1]}</h1> */}
            <h1>id: {props.searchParams.id}</h1>
            <h1>name: {props.searchParams.name}</h1>
        </>
    );
}
```

# 1. Page Project Layout - \_app

-   \_app.jsx는 서버에 요청할 때 가장 먼저 실행되는 컴포넌트임
-   페이지에 적용할 공통 레이아웃을 선언하는 곳임
-   기본 코드는 다음과 같다

```js
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
```

-   Global CSS는 이곳에 추가
-   props 중 Component는 서버에 요청한 페이지
-   pageProps는 App.getInitialProps를 이용하여 prefetching된 데이터를 반환
-   데이터가 없다면 빈 객체({})를 반환
-   단, getStaticProps, getServerSideProps와 같은 Data Fetching methods는 동작하지 않는다

# 1. Page Project Layout - \_document

-   \_document.jsx는 \_app.jsx 다음에 실행됨
-   각 페이지에서 공통적으로 사용될 html, head, body 안에 들어갈 내용을 선언
-   onClick 같은 이벤트나 CSS는 이 곳에 선언하지 않는다
-   만일 로직이나 스타일이 필요하다면 \_app.jsx에 선언해야 함
-   기본 코드는 다음과 같다

```js
import { Html, Head, Main, NextScript } from "next/document";
202030408 김진석
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

# 1. Page Project Layout - \_document

-   다음은 수정한 예

```js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
return (
<Html lang="ko">
<Head>
{/_ 사용자 정의 메타 태그 _/}
<meta name="description" content="커스텀 설명입니다." />

        {/* 외부 스크립트 추가 */}
        <script src="..."></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>

);
202030408 김진석
}

```

# 2. App Project Layout - layout.jsx

-   layout.jsx는 app 디렉토리 아래에 위치한다
-   layout.jsx는 Page Project에서 사용하던 \_app.jsx와 \_document.jsx를 대체함
-   이 파일은 삭제해도 프로젝트를 실행하면 자동으로 다시 생겨난다
-   프로젝트를 생성할 때 생성된 기본 코드는 다음과 같다

```js
202030408 김진석
export const metadata = {
title: 'Next.js',
description: 'Generated by Next.js',
};

export default function RootLayout({ children }) {
return (

<html lang="en">
<body>{children}</body>
</html>
);
}
```

# 2. App Project Layout – meta data

-   metadata에서 모든 페이지에 적용할 meta data를 선언할 수 있다
-   title의 경우에는 각 페이지에 맞게 작성하는 것이 SEO에 좋다
-   이럴 때는 각각의 page.jsx에 다음 코드를 추가해 주면 된다
-   추가하지 않은 페이지는 layout.jsx에서 정의한 title이 적용됨

```js
export const metadata = {
  title: 'Hello, Next.js!',
};
만일 공통되는 title과 함께 각 페이지의 title을 추가하고 싶은 경우에는 layout.jsx의 title을 다음과 같이 추가해 줍니다.
javascript
코드 복사
export const metadata = {
  title: {
    default: 'Next.js',
    template: '%s | Next.js',
  },
  description: 'Generated by Next.js',
};
```

# 2. App Project Layout – meta data

```js
export const metadata = {
    title: {
        default: 'Next.js',
        template: '%s | Next.js',
    },
    description: 'Generated by Next.js',
};
```

-   각 페이지에 적용된 title이 없으면 default값이 적용됨
-   각 페이지에 적용된 title이 있으면 template값이 적용됨
-   %s에 각 페이지의 title이 삽입되며, 위치는 바뀌어도 됨

# 2. App Project Layout – RootLayout

-   Children prop은 각각의 page.jsx를 받아옴
-   html 태그에 옵션을 추가하거나 수정할 수 있다 예: lang="ko"
-   공통 레이아웃은 body 태그에 추가해 주면 됨
-   이때 children prop을 삭제하지 않도록 주의

```js
// KJS 김진석
export const metadata = {
    title: 'Next.js',
    description: 'Generated by Next.js',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
```

# 2. App Project Layout – RootLayout

-   Body에 header와 footer를 추가한 코드
-   이때 children prop을 삭제하지 않도록 주의
-   다음은 추가한 코드와 출력 화면의 예시

```js
export default function RootLayout({ children }) {
    return (
        <html lang="ko">
            <body>
                <header>
                    <h1>===Header===</h1>
                </header>
                <main>{children}</main>
                <footer>
                    <h2>---Footer---</h2>
                </footer>
            </body>
        </html>
    );
}
```

# 2. App Project Layout – RootLayout

-   만일 특정 페이지나, 페이지 그룹에 레이아웃을 추가하고 싶다면 해당 디렉토리에 layout.jsx 파일을 만들어 주면 됨
-   다음은 추가한 코드와 출력 화면의 예시

```js
export default function HelpLayout({ children }) {
    return (
        <div>
            <h2>*** sub layout ***</h2>
            {children}
        </div>
    );
}
```

# 2. App Project Layout – Link component

-   Link component를 이용해서 Navibar component를 만듦
-   /components/Navibar.jsx 파일을 만든 다음 코드를 추가

```js
import Link from 'next/link';
// KJS
export default function Navibar() {
    return (
        <nav>
            <Link href="/">HOME</Link>
            <Link href="/foo">Foo</Link>
            <Link href="/about">About</Link>
            <Link href="/help">Help</Link>
        </nav>
    );
}
```

# 3. Link vs. a vs. router.push

-   Link component를 이용해서 Navibar component를 만들어봄

-   a tag는 html 동기식으로 전체가 reload 되기 때문에, 외부 링크를 할 때 사용함

-   일반적으로 내부 링크 이동 시에는 사용하지 않는 것이 좋다

-   router.push는 빌드 후, 이동할 주소가 html 상에 노출되지 않기 때문에 SEO에 취약

-   Link 컴포넌트는 빌드 후, a tag로 자동 변환

-   a tag의 장점인 SEO 최적화, prefetch 가능, 우 클릭 기능 등을 갖는다

-   내부 페이지로의 이동할 때 이 방식을 사용해야 SPA 방식으로 전체 html 중 필요한 부분만 비동기식으로 리렌더링 됨

-   따라서 특별한 경우가 아니면 Link 컴포넌트 사용을 권장

# 1. Image component - local

-   정적 자원 중 이미지 파일은 SEO에 많은 영향을 미침

-   다운로드 시간이 많이 걸리고, 렌더링 후에 레이아웃이 변경되는 등 UX에 영향을 미침

-   이것을 누적 레이아웃 이동(CLS: Cumulative Layout Shift)이라고 함

-   Image 컴포넌트를 사용하면 CLS 문제를 해결

-   lazy loading: 이미지 로드 시점을 필요할 때까지 지연시키는 기술임

-   이미지 사이즈 최적화로 사이즈를 1/10으로 줄여 줌

-   Placeholder를 제공

# 1. Image component - local

-   WebP와 같은 최신 이미지 포맷 및 최신 포맷을 지원하지 않는 브라우저를 위해 png나 jpg와 같은 예전 이미지 포맷도 제공
-   Pixabay나 Unsplash와 같은 외부 이미지 서비스로 이미지를 제공할 수 있다

# 1. Image component - local

-   Image 컴포넌트를 사용하면 다양한 props를 전달할 수 있다
-   주요 props

-   src = " "
-   width = {500}
-   height = {500}
-   alt = " "
-   Placeholder = "blue"
-   외부 이미지는 blurDataURL=' '로 처리
-   loading = "lazy"
-   Props 참고

# 1. Image component - local

-   정적 자원은 기본적으로 public 디렉토리에 저장
-   정적 자원은 번들링 이후에도 변하지 않기 때문
-   여러 종류의 정적 자원을 사용할 경우 public의 root에 각각 디렉토리를 만들어 사용
-   이미지를 불러오는 방법은 직접 불러오는 방법과 import하는 방법 2가지가 있다
-   직접 불러올 때 경로는 /images/[이미지 이름.확장자]로 하면 됨

```js
import Image from 'next/image';
// Koes Jin
export default function About() {
    return (
        <div>
            <h1>About</h1>
            <p>This is the about page</p>
            <Image src="/images/person.jpg" alt="person" width={300} height={500} />
            <Image src="/images/woman.jpg" alt="woman" width={300} height={500} />
        </div>
    );
}
```

# 1. Image component - local

-   Import하는 방법은 다음 소스처럼 이미지를 import한 후에 이름만 사용하면 됨
-   Import 경로에는 /public을 반드시 넣어줘야 함
-   같은 이미지를 같은 페이지에서 여러 번 사용할 때 편리

```js
import Image from 'next/image';
import foo from '/public/images/person.jpg';
import bar from '/public/images/woman.jpg';

export default function About() {
    return (
        <div>
            <h1>About</h1>
            <p>This is the about page</p>
            <Image src={foo} alt="person" width={300} height={500} />
            <Image src={bar} alt="woman" width={300} height={500} />
        </div>
    );
}
```

<hr>

# 6주차 강의 내용

## Page Router실습코드

-   page Router 이용해서 [] 과 [...] 사용 실습

-   blog 를 슬러그로 만들던가 , foo를 슬러그 또는 기본으로 사용해서 여러가지 코드 실습

```js
// 202030408 김진석
import { useRouter } from 'next/router';

export default function Foo() {
    const router = useRouter(); // 함수 호출 필요
    const { foo, id, name, pid } = router.query;
    console.log({ foo, id, name, pid });

    return (
        <div>
            {/* foo가 배열인지 확인 후 접근 */}
            {foo && Array.isArray(foo) ? (
                <>
                    <h1>foo[0] : {foo[0]}</h1>
                    <h1>foo[1] : {foo[1]}</h1>
                    <h1>foo[2] : {foo[2]}</h1>
                </>
            ) : (
                <h1>foo is not an array or is undefined</h1>
            )}
            <h1>id : {id}</h1>
            <h1>name : {name}kjs</h1>
            <h1>pid : {pid}</h1>
        </div>
    );
}
```

## App Router 실습 코드

```js
/foo
export default async function Foo(props) {
    return (
        <div>
            <h1>App Router</h1>
            <h1>foo 1</h1>
        </div>
    );
}

```

```js
/foo/입력값 ([fooId 이기 떄문])
export default function FooId({ params, searchParams }) {
    return (
        <div>
            <h1>App Router</h1>
            <h1>
                foo {params.fooId} / {searchParams.contry}
            </h1>
        </div>
    );
}

```

```js
/foo/입력값/bar -> pagerouter와 다르게 foo/bar가 안됨
export default async function Bar(props) {
  // 202030408 김진석
    return (
        <div>
            <h1>App Router</h1>
            <h1>bar 1</h1>
        </div>
    );
}

```

```js
export default function page(props) {
    console.log(props);
    return (
        <>
            <h1>foo: {props.params.foo}</h1>
            {/* <h1>foo[]: {props.params.foo[1]}</h1> */}
            <h1>id: {props.searchParams.id}</h1>
            <h1>name: {props.searchParams.name}</h1>
        </>
    );
}
```

<hr>

# 5주차 강의 내용

-   SSG는 높은 확장성과 뛰어난 성능을 보이는 프론트엔드 애플리케이션을 만들고 싶을 때 가장 좋은 방법임

-   한 가지 문제점은 일단 웹 페이지를 만들고 나면 다음 배포 전까지 내용이 변하지 않는다

-   조금이라도 수정하려면 필요한 데이터를 가져와서 수정하고 다시 생성하는 과정을 반복해야 한다

-   이런 문제 때문에 나온 방법이 바로 **증분 정적 재생성(ISR: Incremental Static Regeneration)**이다

-   예를 들어 동적 콘텐츠를 제공하지만 해당 콘텐츠 데이터를 로딩하는 데 시간이 오래 걸린다면, SSG와 ISR을 함께 사용하여 문제를 해결할 수 있다

-   많은 양의 데이터를 필요로 하는 복잡한 대시보드를 만든다면, 데이터를 불러오기 위한 REST API 호출에 추가 소요된다

-   만일 데이터가 자주 변하지 않는다면 SSG와 ISR을 사용해서 데이터를 10분 동안 캐싱할 수 있다

```js
import fetch from 'isomorphic-unfetch';
import Dashboard from './components/Dashboard';

export async function getStaticProps() {
    const userReq = await fetch('/api/user');
    const userData = await userReq.json();

    const dashboardReq = await fetch('/api/dashboard');
    const dashboardData = await dashboardReq.json();

    return {
        props: {
            user: userData,
            data: dashboardData,
        },
        revalidate: 600, // 시간을 초 단위로 나타낸 값 (10분)
    };
}
// 202030408 김진석

function IndexPage(props) {
    return (
        <div>
            <Dashboard user={props.user} data={props.data} />
        </div>
    );
}

export default IndexPage;
```

-   Next.js 공식 문서의 getStaticProps 함수의 설명을 참고

https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props

-   revalidate는 다음 문서를 참고

https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration

## 예제

```js
export async function getStaticProps() {
    const res = await fetch('https://api.github.com/repos/vercel/next.js');
    const repo = await res.json();
    return {
        props: { repo },
        revalidate: 60, // 60초마다 재검증
    };
}

// 202030408 김진석

export default function Chapter02_06({ repo }) {
    return <div className={styles.center}>{repo.name}</div>;
}
```

## 예제

```js

// 202030408 김진석

export default async function Foo() {
    let data = await fetch('https://api.vercel.app/blog');
    let posts = await data.json();
    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    {post.id} : {post.title} : {post.}
                </li>
            ))}
        </ul>
    );
}

```

# 03. Next.js 기초와 내장 컴포넌트

-   Next는 서버사이드 렌더링 외에도 많은 내장 컴포넌트와 함수를 제공함

## [3장에서는 다음과 같은 내용을 학습하게 됨]

-   클라이언트와 서버에서의 라우팅 시스템 작동 방식
-   페이지 간 이동 최적화
-   Next.js가 정적 자원을 제공하는 방법
-   자동 이미지 최적화와 새로운 Image 컴포넌트를 사용한 이미지 제공 최적화 기법
-   컴포넌트에서 HTML 메타데이터를 처리하는 방법
-   \_app.js와 \_documents.js 파일 내용 및 커스터마이징 방법

# 3-1 라우팅 시스템

-   React의 클라이언트 라우팅: React Router, Reach Router 등은 클라이언트 측에서만 라우팅을 구현할 수 있다
-   Next.js 파일 시스템 기반 라우팅: Next.js는 파일 시스템을 기반으로 페이지와 라우팅을 관리함
-   라우팅 규칙: /pages 디렉터리 안의 .js, .jsx, .ts, .tsx 파일에서 export한 React 컴포넌트가 페이지로 사용된다
-   컨텐츠 분리: 블로그처럼 컨텐츠를 분리해야 할 경우, /pages 아래에 별도의 디렉터리를 생성하고 라우팅 규칙을 설정할 수 있다
-   계층적 구조 라우팅: /pages/posts와 같은 디렉터리 구조를 통해 계층적인 라우팅 규칙을 만들 수 있다
-   동적 라우팅: /pages/posts/[slug].js와 같이 파일명을 사용하여 동적 라우팅을 지원하며, 이는 동적 URL에 대응하는 JSX를 반환한다

```js
function Homepage() {
    return <div>This is the homepage</div>;
}

export default Homepage;
```

-   /pages/posts/ 디렉토리 내에 index.js만 간단하게 만들면 localhost:3000/posts로 접속이 가능
-   다만 동적인 라우팅 규칙을 만들려면 [slug].js 파일이 필요
-   [slug].js는 매개 변수로 사용되며 주소창에서 입력하는 값을 모두 받을 수 있다
-   동적 라우팅 규칙을 중첩할 수도 있다
-   접근 경로를 ~/posts/[date]/[slug]와 같이 만들 수 있다
-   [date] 디렉토리를 만들고 그 안에 [slug].js 파일을 저장하면 된다
-   [date]나 [slug]는 어떤 값이든 가질 수 있다
-   실제 앱에서는 경로 매개변수에 따라 서로 다른 동적 페이지를 렌더링하게 된다

# 페이지에서 경로 매개변수 사용하기 (page53)

-   경로 매개변수를 사용해서 동적 페이지를 쉽게 만들 수 있다
-   page/greet/[name].js 파일을 만들어 보자
-   내장 getServerSideProps 함수를 통해 URL에서 동적으로 [name] 변수 값을 가져온다
-   greet/Mitch 주소로 가면 'Hello, Mitch!'라는 문구가 렌더링 된다.

```js
export async function getServerSideProps({ params }) {
    const { name } = params;
    return {
        props: {
            name,
        },
    };
}

function Greet(props) {
    return <h1>Hello, {props.name}!</h1>;
}

export default Greet;
```

<hr>

# 3주차 강의 내용

## 그 밖의 설정

-   개발 시 타입스크립트를 주 언어로 쓰고 싶다면 앞서 살펴본 것과 같은 방법으로 타입스크립트 전용 플러그인을 설치하고 , 설정을 바꾸자

-   웹팩은 특정 라이브러리, 페이지, 기능에 대해 컴파일된 코드를 전부 포함하는 번들을 만들어준다.

-   라이브러리와 여러 개의 컴포넌트로 구성된 페이지를 개발하면, 웹팩은 이것을 하나의 번들로 합쳐줌

-   만일 SASS나 LESS 같은 CSS 전처리기를 사용해서 개발하고 싶다면,웹팩설정을 수정해 주면 된다.

## SASS 와 SCSS차이 ?

-   sass가 +으로 정의 = 로 사용
-   scss가 @mixin으로 정의 include로 사용

```css
/* // 202030408 김진석

// SCSS 예시 */

.button {
    color: blue;
    &:hover {
        color: red;
    }
}
```

```css
/* // Sass 예시 */
.button
  color: blue
  &:hover
    color: red
```

-   문법: SCSS는 CSS와 매우 유사한 문법을 사용하는 반면, Sass는 들여쓰기 기반의 간결한 문법을 사용

-   유연성: SCSS는 기존 CSS 사용자들에게 더 친숙할 수 있으며, Sass는 더 깔끔하고 간결한 스타일링이 가능

# 하지만 ‼

-   설정을 바꿀일은 그렇게 많지 않다

-   꼭 수정해야 한다면 대부분 next.config.js 파일의 기본값을 변경 하는것으로 충분

-   이 파일을 root에 만들고 객체를 export하면 해당 내용은 Next.js의 기본 설정 값을 덮음

```js
// 202030408 김진석

module.exports = {
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.js/,
            use: [
                options.defaultLoaders.babel,
                // 이 부분의 내용은 예시이기 때문에
                // 실제로 사용하면 애플리케이션이 작동하지 않습니다.
                {
                    loader: 'my-custom-loader', // 사용할 로더 지정
                    options: loaderOptions, // 로더의 옵션 지정
                },
            ],
        });
        return config;
    },
};
```

# 몇가지 일어날 수 있는 오류

-   처음 Next 프로젝트를 생성할 때 오류로 생성되지 않는 경우가 있음

    -   이것은 CRA가 설치 안되있어서 그럼 ⭐️
    -   이 경우에 CRA를 Global로 설치하면 됨 ⭐️⭐️

-   $npm i -g creat-react-app

-   프로젝트 생성

-   npx create-next-app@latest

-   Next.js 12 이후 babel을 지원 중지. 이제 SWC로 그 기능이 대체

    -   따라서 최신 환경에서 babel 설정하면 오류
    -   당연히 babel 제거하면 문제 없음

-   만일 SWC를 사용하고 싶다면 다음과 같이 12 혹은 최신 버전의 Next 프로젝트를 생성해 주면 자동으로 설정

-   npx create-next-app@12 or $npx create-next-app@latest

# Transplie은 어떻게 동작하나

-   Babel은 ECMAScript와 같은 자바스크립트 최신 버전이나 , TypeScipt를 이전 버전의 코드로
    변환시켜 주는 Transpile 도구

-   개발자가 작성한 코드 -> Parse -> Transform -> Generate -> 이전 버전의 코드

-   Babel의 parser는 자바스크립트를 컴퓨터가 이해할 수 있는 코드 구조인 Abstract SyntaxTree로
    변환해 주는 역할을 수행

-   Babel의 traverse모듈은 전체 트리 상태를 유지하며 노드 교체, 추가를 담당

-   genertor가 수정된 AST를 일반 코드로 변환해 주게 된다.

-   SWC도 Babel과 같은 자바스크립트 트랜스 컴파일러임

-   Next 12 이후 부터 Babel에서 SWC로 교체 되었다

-   SWC는 Rust로 작성되어 있어 Babel에 비해서 속도가 훨씬 빠름

# SWC를 프로젝트에 적용하려면

-   새로운 프로젝트에 적용하는 것은 다음 명령으로 프로젝트를 생성하면 바로 사용 가능

-   $npx create-next-app@latest ⭐️
-   or

-   $npx create-next-app@12 ⭐️

-   Next 12 이전 버전의 프로젝트에 적용하려면 다음과 같이 업그레이드 해줘야 함

-   $npm install next@12 ⭐️

-   그리고 Babel을 설정했다면 설정 파일 (.babelrc또는 babel.config.js)를 삭제

# 2. 렌더링 전략 ⭐️

-   렌더링 전략이란 웹 페이지 또는 웹 애플리케이션을 웹 브라우저에 제공하는 방법

-   정적인 페이지 제작에는 Gastby를 추천

-   서버 사이드 렌더링 전략을 원한다면 다른 프레임워크를 추천

-   그런데 Next.js에서는 이 모든 방법을 새로운 수준으로 제공

-   어떤 페이지는 빌드 시점에 정적으로 생성, 어떤 페이지는 실행과 동시에 생성

-   또한 특정 페이지에 대한 요청이 있을 때마다 페이지를 다시 생성 할 수도 있음

-   그리고 반드시 클라이언트에서 렌더링해야 할 컴포넌트도 지정할 수 있어서 개발이 쉬움

# 챕터 2 에서는 다음과 같은 내용을 다룸

-   서버 사이드 렌더링을 사용해서 각 요청별로 페이지를 동적으로 렌더링하는 법 ⭐️
-   특정 컴포넌트를 클라이언트에서만 렌더링하는 다양한 방법 ⭐️
-   빌드 시점에서 정적 페이지를 생성하는 방법 ⭐️
-   증분 정적 재생성으로 정적 페이지를 재 생성하는 방법 ⭐️

# 2-1 서버사이드 렌더링(SSR)

-   웹 페이지를 제공하는 가장 흔한 방법

-   APM을 이용하는 일반적인 웹 페이지 생성이라고 보면 됨

-   여기에 자바스크립트 코드가 적재되면 동적으로 페이지 내옹을 렌더링

-   Next.js도 이와 같이 동적으로 페이지를 렌더링 할 수 있음

-   그리고 여기에 스크립트 코드를 집어 넣어서 나중에 웹 페이지를 동적으로 처리 할 수 있는데
    이를 하이드레이션이라고 함

-   예를 들면 어떤 사람이 작성한 블로그 글을 한 페이지에 모아서 작성해야 한다면 SSR을 이용하는 것이 적당

-   서버 사이드 렌더링 -> 자바스크립트가 하이드레이션된 페이지를 전송 -> 클라이언트에서 DOM위에 각 스크립트
    코드를 하이드레이션 : 페이지 새로 고침 없이 사용자와 웹 페이지간 상호 작용을 가능하게 함.

-   리액트 하이드레이션 덕분에 이 상태에서 웹 앱은 싱글 페이지 애플리케이션(SPA) 처럼 작동할 수 있음

-   CSR과 SSR의 장점을 모두 가지는 것

-   특정 렌더링 전략만 사용한다고 가정하면 SSR이 CSR에 비해 여러가지 장점이 있음

# [SSR의 장점]

-   SEO(검색엔진 최적화)에 유리: 서버에서 미리 렌더링된 HTML을 전달하기 때문에, 검색 엔진 크롤러들이 해당 HTML을 바로 읽을 수 있고 이는 클라이언트사이드 렌더링(CSR)보다 SEO에 유리
    초기 로딩 속도가 빠름:

-   서버에서 완성된 HTML을 보내기 때문에, 사용자가 페이지를 처음 요청했을 때 빠르게 콘텐츠를 볼 수 있음. CSR에서는 JavaScript가 먼저 로드되고 실행된 후 콘텐츠가 표시되기 때문에 초기 로딩이 느릴 수 있다

-   느린 네트워크 환경에서 유리: 사용자의 브라우저가 저사양이거나 네트워크가 느릴 때, 서버에서 미리 렌더링된 페이지를 제공함으로써 사용자가 콘텐츠를 빠르게 접할 수 있음

# SSR이 최적의 렌더링 전략이 아닌 경우

-   클라이언트가 페이지를 요청할 때마다 페이지를 다시 렌더링할 수 있는 서버가 필요

-   다른 방식에 비해 SSR이 더 많은 자원을 소모하고, 더 많은 부하를 보이며 유지 보수 비용도 증가

-   페이지에 대한 요청을 처리하는 시간이 길어짐

-   페이지가 외부 API 또는 데이터 소스에 접근해야 한다면, 해당 페이지를 렌더링할 때마다 이를 다시 요청해야 함

-   페이지 간의 이동은 CSR에 비해 느리다

-   중요한 것은 Next.js가 기본적으로 빌드 시점에 정적으로 페이지를 만든다는 것

-   페이지에서 외부 API를 호출하거나 데이터베이스에 접근하는 등 동적 작업을 해야 한다면 해당하는 함수를 페이지에 export해야 한다

# 코드설명

-   이 페이지는 div 요소 안에 문자열만 표시

-   외부 API를 호출하지 않으며 항상 같은 문자열만 표시

```js
function IndexPage() {
    return <div>This is the index page.</div>;
}

export default IndexPage;

// 202030408 김진석
```

-   다음 코드는 페이지를 요청할 때마다 사용자 환영 문구를 표시

-   특정 사용자 정보를 가져온 다음 클라이언트에 전달해서 사용할 수 있도록 하고 있다

-   이 경우 미리 예약된 getServerSideProps() 함수를 사용

```js
export async function getServerSideProps() {
    const userRequest = await fetch('https://example.com/api/user');
    const userData = await userRequest.json();

    return {
        props: {
            user: userData,
        },
    };
}
// 202030408 김진석

function IndexPage(props) {
    return <div>Welcome Koes Jin, {props.user.name}!</div>;
}

export default IndexPage;
```

-   페이지에 대한 요청이 들어오면 서버가 REST API를 호출해서 필요한 사용자 정보를 가져옴

-   이 과정은 다음과 같은 세부 단계로 나눌 수 있다

-   getServerSideProps라는 비동기 함수를 export라고 함

    -   빌드 과정에서 Next.js는 이 함수를 export하는 모든 페이지를 찾아서 서버가 페이지 요청을 처리할 때 getServerSideProps 함수를 호출하도록 만듬

-   getServerSideProps 함수는 props라는 속성값을 갖는 객체를 반환

    -   이 props는 컴포넌트로 전달돼 서버와 클라이언트 모두가 props에 접근할 수 있게 됨
    -   fetch API는 서버에서 실행되기 때문에 별도의 폴리필을 끼워 넣을 필요는 없다

-   IndexPage 함수를 수정해서 props를 인자로 받는다
    -   이 props는 getServerSideProps 함수에서 반환한 props의 모든 내용을 갖고 있음

## Next.js 14부터는 하나의 API만 사용합니다. 오리엔테이션 때 설명

# 2.2 클라이너트 사이드 렌더링(SSR)

-   React 앱을 실행하면 렌더링 시작 전에 빈 화면이 한동안 유지됨
-   이는 서버에서 스크립트와 스타일만 포함된 HTML을 전송하기 때문
-   실제 렌더링은 클라이언트에서 이루어짐
-   CSR로 생성한 앱의 HTML을 보면 div 태그 하나 밖에 없다 그래서 빈 화면만 보임
-   빌드 과정에서 js와 css 파일을 HTML 페이지에 불러오도록 만들고, root div에 렌더링 함

```js
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">Koes Jin React2</div>
</body>
```

# CSR을 사용할 떄의 주요 이점

-   네이티브 앱처럼 느껴지는 웹 앱

    -   전체 자바스크립트 번들을 다운로드 한다는 것은 렌더링할 모든 페이지가 이미 브라우저에 다운로드 되어 있다는 뜻
    -   다른 페이지로 이동해도 서버에 요청할 필요 없이, 바로 페이지를 이동할 수 있다
    -   페이지를 바꾸기 위해 새로 고침 필요가 없다

-   쉬운 페이지 전환

    -   클라이언트에서의 내비게이션은 브라우저 화면을 새로 고칠 필요 없이 다른 페이지로의 이동을 가능하게 만듬
    -   페이지 간 전환에 멋진 효과를 넣을 수도 있습니다. 애니메이션을 방해할 요소가 없기 때문

-   지연된 로딩과 성능

    -   웹 앱은 최소로 필요한 HTML만 렌더링
    -   버튼을 누르면 나오는 모달도 실제 버튼이 눌렸을 때 동적으로 생성하게 됨

-   서버 부하 감소 - 서버리스 환경에서 웹 앱을 제공할 수도 있다

# 장점은 단점이 될 수도 있다

-   네트워크 속도가 느린 환경에서는 번들이 모두 다운로드 될 때까지 계속 빈 페이지를 보아야 함

-   검색 로봇에게도 그 내용은 빈 것으로 보임

-   번들을 모두 받을 때까지 검색 로봇이 기다리기는 하지만 성능 점수는 낮을 것

## React.useEffect Hook

-   최근 리액트는 함수형 컴포넌트 사용을 강조하면서 life cycle 함수 대신 Hook을 사용

-   함수형 컴포넌트 내에서 DOM 조작이나 데이터를 불러오기 같은 사이드 이펙트 기능을 구현할 때, useEffect 함수를 사용해서 컴포넌트가 마운트된 후 해당 기능을 실행하도록 만들 수 있다

# 코드 설명 (40~41P)

-   CSR인 React에서는 다음 코드가 문제없이 작동하지만 Next.js의 빌드 과정에서는 문제가 생김

-   Highlight.js 라이브러리가 document라는 전역 변수를 사용하는데, 이 변수는 Node.js에서 제공하지 않으며 오직 브라우저에서만 접근할 수 있기 때문

-   이 문제는 hljs 호출을 useEffect 훅으로 감싸서 해결할 수 있다

```js
import Head from 'next/head';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';

function Highlight({ code }) {
    hljs.registerLanguage('javascript', javascript);
    hljs.initHighlighting();

    // 202030408 김진석
    return (
        <>
            <Head>
                <link rel="stylesheet" href="/highlight.css" />
            </Head>
            <pre>
                <code className="js">{code}</code>
            </pre>
        </>
    );
}

export default Highlight;
```

-   다음과 같이 React.useEffect와 React.useState를 함께 써서 특정 컴포넌트를 정확히 클라이언트에서만 렌더링하도록 지정할 수 있다

```js
import { useEffect, useState } from 'react';
import Highlight from '../components/Highlight';

function UseEffectPage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return <div>{isClient && <Highlight code={"console.log('Hello, world!')"} language="js" />}</div>;
}
// 202030408 김진석

export default UseEffectPage;
```

# process.browser 변수

-   서버에서 렌더링할 때 브라우저 전용 API로 인한 문제를 다른 방법으로 해결할 수도 있다

-   process.browser 값에 따라서 스크립트와 컴포넌트를 조건별로 실행하는 것

-   이 변수는 Boolean 값으로, 코드를 클라이언트에서 실행하면 true, 서버에서 실행하면 false 값을 가짐

-   다음 코드를 실행하면 처음에는 "~ server-side"라고 표시되고, 리액트 하이드레이션이 끝나면 바로 "~ client-side"라는 문자열로 바뀜

-   43page code

-   하지만 process.browser에 대한 지원은 곧 중단될 예정 -> 중단됨

# 동적 컴포넌트 로딩 - dynamic

-   앞서 React.useEffect 훅을 사용하여 브라우저에서 코드를 실행하는 경우에만 컴포넌트를 렌더링해 보자

-   dynamic 함수로도 똑같이 동작하게 할 수 있다

-   다음 코드를 실행하면 Highlight 컴포넌트를 동적 임포트(dynamic import)로 불러온다

-   즉, ssr옵션으로 클라이언트에서만 코드를 실행한다고 명시하는 것이다

```js
import dynamic from 'next/dynamic';

// 202030408 김진석

const Highlight = dynamic(() => import('../components/Highlight'), { ssr: false });

import styles from '../styles/Home.module.css';

function DynamicPage() {
    return (
        <div className={styles.main}>
            <Highlight code={`console.log('Hello, world!')`} language="js" />
        </div>
    );
}

export default DynamicPage;
```

# 2.3 정적 사이트 생성(SSG: Static Site Generation)

-   SSG는 일부 또는 전체 페이지를 빌드 시점에 미리 렌더링 함
-   SSG는 SSR 및 CSR과 비교했을 때 다음과 같은 장점이 있다

## 1.쉬운 확장

-   정적 페이지는 단순 HTML 파일이므로 CDN을 통해 파일을 제공하거나, 캐시에 저장하기 쉽다

## 2.뛰어난 성능

-   빌드 시점에 HTML 페이지를 미리 렌더링하기 때문에 페이지를 요청해도 클라이언트나 서버가 무언가를 처리할 필요가 없다

## 3.더 안전한 API 요청

-   외부 API를 호출하거나, 데이터베이스에 접근하거나, 보호해야 할 데이터에 접근할 일이 없다
    필요한 모든 정보가 빌드 시점에 미리 페이지로 렌더링 되어 있기 때문

-   SSG는 높은 확장성과 뛰어난 성능을 보이는 프론트엔드 애플리케이션을 만들고 싶을 때 가장 좋은 방법

-   한 가지 문제점은 일단 웹 페이지를 만들고 나면 다음 배포 전까지 내용이 변하지 않는다는 것

-   조금이라도 수정하려면 필요한 데이터를 가져와서 수정하고 다시 생성하는 과정을 반복해야 함

-   이런 문제 때문에 나온 방법이 바로 **"증분 정적 재생성(ISR: Incremental Static Regeneration)"** 이다

-   예를 들어 동적 콘텐츠를 제공하지만 해당 콘텐츠 데이터를 로딩하는데 시간이 오래 걸린다면, SSG와 ISR을 함께 사용하여 문제를 해결할 수 있다

-   많은 양의 데이터를 필요로 하는 복잡한 대시보드를 만든다면, 데이터를 불러오기 위한 REST API 호출에 수 초가 소요된다

-   만일 데이터가 자주 변하지 않는다면 SSG와 ISR을 사용해서 데이터를 10분 동안 캐싱할 수 있다

# 코드 설명 (46~48P)

1. getStaticProps 함수를 사용

2. 빌드 과정에서 페이지를 렌더링할 때 이 함수를 호출해서 필요한 데이터 등을 가져오며, 다음 번 빌드 시점까지 더 이상 호출하지 않는다

3. 빌드 과정에서 페이지의 내용을 getStaticProps 함수가 반환한 객체의 값으로 채운다. 그리고 이 페이지는 빌드를 거쳐 정적 페이지로 만들어짐

4. 처음 10분간 해당 페이지를 요청하는 모든 사용자는 동일한 정적 페이지를 제공받는다

5. 10분이 지나고 해당 페이지에 대한 새로운 요청이 들어오면 Next.js는 이 페이지를 서버에서 다시 렌더링하고 getStaticProps 함수를 다시 호출함.
   다시 렌더링한 페이지는 이전 페이지를 덮어쓴다
6. 이후 10분간 동일한 페이지에 대한 모든 요청에 대해 새로 만든 정적 페이지를 제공

7. 만일 10분이 지난 후에 페이지에 대한 새로운 요청이 없다면 새로 빌드하지 않는다

<hr>

# 2주차 강의 내용

## Chocolatey (윈도우용 패키지 매니저)

    - 해당 내용은 윈도우 용이라 본인은 맥이라 brew 이용

## VsCode 다운

    - 이미 다운로드 완료

## 프로젝트 생성 방법

    - create-next-app을 이용하여 프로젝트생성. app-name 생략 가능

## page-router 생성 ⭐️

    - src 사용 x , app router 이용 x

## app-router 생성 ⭐️⭐️

    - src 사용 o , app router 이용 o

## 차이점

    - page-routing 방식은 pages 아래에 index.js와 다른 ~~~~.js 파일들이 라우팅함

    - app-routing 방식은 src/app 경로아래 있는 page.js가 라우팅함. 다른 폴더 만들고 그 안에 page.js써야 경로 설정 됨

# my-blog 생성

-   npx create-next-app --example blog-starter 이용해서 my-blog 프로젝트 생성

# 프로젝트 기본 구조

-   pages/ 디렉토리 안의 모든 js파일은 public 페이지가 된다.
-   pages/ 의 index.js파일을 복사해서 , about.js로 이름을 바꾸면 , 로컬으로 접속 가능

# Next.js 14의 프로젝트 기본 구조

-   프로젝트를 생성할때 /src 사용 여부를 선택 가능하지만 일반적으로 사용함.
-   14에서는 /public과 /src/app 디렉토리만 용도가 정해져 있다.

# 타입 스크립트 지원 ⭐️

-   next.js 는 타입스크립트 지원

# 바벨과 웹팩 설정 커스터마이징

-   바벨이나 웹팩의 설정도 커스터 마이징 가능

-   바벨은 자바스크립트 트랜스컴파일러, 최신 자바스크립트 코드를 하위 호환성을 보장하는 스크립트 코드로 변환

-   하위 호환성이 보장되면 어떤 웹 브라우저에서든 자바스크립트 코드를 실행할 수 있다.

-   바벨을 사용하면 브라우저나 Node.js등에서 지원하지 않는 새롭고 훌륭한 기능을 현재의 환경에서도 실행 가능

-   Node.js에서 실행하면 오류가 나지만, 바벨을 사용하면 실행가능한 ECMAScript 코드로 바꿔줄 수 있음

-   바벨 설정을 커스터마이징 하려면 프로젝트 Root에 .barbelrc라는 파일을 생성하면 됨.

-   이 설정 파일을 비워 두면 오류가 발생하기 떄문에 다음 의. 내용 저장해야함

```js
{
    // 202030408 김진석
    "presets":["next/babel"]
}
```

# ECMAScript 기능 중 파이프라인 연산자를 사용해 보자

-   기능을 사용하려면 바벨 플러그인 설치

-   그리고 .barbelrc 파일을 다음과 같이 수정

```js
{
    // 408 김진석
    "presets":["next/babel"],
    "plugins":[
        [
        "@babel/plugin-proposal-pipeline-operator",
        {"proposal": "fsharp"}
        ]
    ]
}
```
