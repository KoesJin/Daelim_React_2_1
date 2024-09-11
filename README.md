# 202030408 김진석

🔥 수업 소스코드

https://github.com/hanbit/practical-next.js

2️⃣ [2주차](#2주차-강의-내용)

3️⃣ [3주차](#3차-강의-내용)

4️⃣ [4주차]()

5️⃣ [5주차]()

6️⃣ [6주차]

7️⃣ [7주차]()

8️⃣ [8주차]

9️⃣ [9주차]()

🔟 [10주차]()

1️⃣1️⃣ [11주차]

1️⃣2️⃣ [12주차]()

1️⃣3️⃣ [13주차]()

1️⃣4️⃣ [14주차]()

1️⃣5️⃣ [15주차]()

<hr>

# 3차 강의 내용

## 그 밖의 설정

-   개발 시 타입스크립트를 주 언어로 쓰고 싶다면 앞서 살펴본 것과 같은 방법으로 타입스크립트 전용 플러그인을 설치하고 , 설정을 바꾸자

-   웹팩은 특정 라이브러리, 페이지, 기능에 대해 컴파일된 코드를 전부 포함하는 번들을 만들어준다.

-   라이브러리와 여러 개의 컴포넌트로 구성된 페이지를 개발하면, 웹팩은 이것을 하나의 번들로 합쳐줌

-   만일 SASS나 LESS 같은 CSS 전처리기를 사용해서 개발하고 싶다면,웹팩설정을 수정해 주면 된다.

## SASS 와 SCSS차이 ?

-   sass가 +으로 정의 = 로 사용
-   scss가 @mixin으로 정의 include로 사용

```
    // SCSS 예시

.button {
color: blue;
&:hover {
color: red;
}
}
```

```
// Sass 예시
.button
  color: blue
  &:hover
    color: red
```

-   문법: SCSS는 CSS와 매우 유사한 문법을 사용하는 반면, Sass는 들여쓰기 기반의 간결한 문법을 사용

-   유연성: SCSS는 기존 CSS 사용자들에게 더 친숙할 수 있으며, Sass는 더 깔끔하고 간결한 스타일링이 가능

# 하지만

-   설정을 바꿀일은 그렇게 많지 않다

-   꼭 수정해야 한다면 대부분 next.config.js 파일의 기본값을 변경 하는것으로 충분

-   이 파일을 root에 만들고 객체를 export하면 해당 내용은 Next.js의 기본 설정 값을 덮음

```
module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.js/,
      use: [
        options.defaultLoaders.babel,
        // 이 부분의 내용은 예시이기 때문에
        // 실제로 사용하면 애플리케이션이 작동하지 않습니다.
        {
          loader: "my-custom-loader", // 사용할 로더 지정
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

    -   이것은 CRA가 설치 안되있어서 그럼
    -   이 경우에 CRA를 Global로 설치하면 됨

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

-   $npx create-next-app@latest

-   or

-   $npx create-next-app@12

-   Next 12 이전 버전의 프로젝트에 적용하려면 다음과 같이 업그레이드 해줘야 함

-   $npm install next@12

-   그리고 Babel을 설정했다면 설정 파일 (.babelrc또는 babel.config.js)를 삭제

<hr>

# 2주차 강의 내용

## Chocolatey (윈도우용 패키지 매니저)

    - 해당 내용은 윈도우 용이라 본인은 맥이라 brew 이용

## VsCode 다운

    - 이미 다운로드 완료

## 프로젝트 생성 방법

    - create-next-app을 이용하여 프로젝트생성. app-name 생략 가능

## page-router 생성

    - src 사용 x , app router 이용 x

## app-router 생성

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

# 타입 스크립트 지원

-   next.js 는 타입스크립트 지원

# 바벨과 웹팩 설정 커스터마이징

-   바벨이나 웹팩의 설정도 커스터 마이징 가능
-   바벨은 자바스크립트 트랜스컴파일러, 최신 자바스크립트 코드를 하위 호환성을 보장하는 스크립트 코드로 변환
-   하위 호환성이 보장되면 어떤 웹 브라우저에서든 자바스크립트 코드를 실행할 수 있다.
-   바벨을 사용하면 브라우저나 Node.js등에서 지원하지 않는 새롭고 훌륭한 기능을 현재의 환경에서도 실행 가능
-   Node.js에서 실행하면 오류가 나지만, 바벨을 사용하면 실행가능한 ECMAScript 코드로 바꿔줄 수 있음
-   바벨 설정을 커스터마이징 하려면 프로젝트 Root에 .barbelrc라는 파일을 생성하면 됨.
-   이 설정 파일을 비워 두면 오류가 발생하기 떄문에 다음 의. 내용 저장해야함

```
{
    "presets":["next/babel"]
}
```

# ECMAScript 기능 중 파이프라인 연산자를 사용해 보자

-   기능을 사용하려면 바벨 플러그인 설치

-   그리고 .barbelrc 파일을 다음과 같이 수정

```
{
    "presets":["next/babel"],
    "plugins":[
        [
        "@babel/plugin-proposal-pipeline-operator",
        {"proposal": "fsharp"}
        ]
    ]
}
```
