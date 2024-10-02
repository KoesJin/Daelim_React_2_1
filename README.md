# 202030408 김진석

🔥 수업 소스코드

https://github.com/hanbit/practical-next.js

2️⃣ [2주차](#2주차-강의-내용)

3️⃣ [3주차](#3주차-강의-내용)

4️⃣ [4주차](휴강)

5️⃣ [5주차](#5주차-강의-내용)

6️⃣ [6주차](#6주차-강의-내용)

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

# 6주차 강의 내용

## Page Router실습코드

-   page Router 이용해서 [] 과 [...] 사용 실습

-   blog 를 슬러그로 만들던가 , foo를 슬러그 또는 기본으로 사용해서 여러가지 코드 실습

```
202030408 김진석
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
            <h1>name : {name}</h1>
            <h1>pid : {pid}</h1>
        </div>
    );
}
```

## App Router 실습 코드

```
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

```
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

```
/foo/입력값/bar -> pagerouter와 다르게 foo/bar가 안됨
export default async function Bar(props) {
  202030408 김진석
    return (
        <div>
            <h1>App Router</h1>
            <h1>bar 1</h1>
        </div>
    );
}

```

```
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

```
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
        revalidate: 600 // 시간을 초 단위로 나타낸 값 (10분)
    };
}
202030408 김진석

function IndexPage(props) {
    return (
        <div>
            <Dashboard
                user={props.user}
                data={props.data}
            />
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

```
export async function getStaticProps() {
    const res = await fetch('https://api.github.com/repos/vercel/next.js');
    const repo = await res.json();
    return {
        props: { repo },
        revalidate: 60, // 60초마다 재검증
    };
}

202030408 김진석

export default function Chapter02_06({ repo }) {
    return (
        <div className={styles.center}>
            {repo.name}
        </div>
    );
}

```

## 예제

```

202030408 김진석

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

```
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

```
export async function getServerSideProps({ params }) {
    const { name } = params;
    return {
        props: {
            name,
        },
    };
}

function Greet(props) {
    return (
        <h1>Hello, {props.name}!</h1>
    );
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

```
202030408 김진석

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

# 하지만 ‼

-   설정을 바꿀일은 그렇게 많지 않다

-   꼭 수정해야 한다면 대부분 next.config.js 파일의 기본값을 변경 하는것으로 충분

-   이 파일을 root에 만들고 객체를 export하면 해당 내용은 Next.js의 기본 설정 값을 덮음

```
202030408 김진석

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

```
function IndexPage() {
  return <div>This is the index page.</div>;
}

export default IndexPage;

202030408 김진석

```

-   다음 코드는 페이지를 요청할 때마다 사용자 환영 문구를 표시

-   특정 사용자 정보를 가져온 다음 클라이언트에 전달해서 사용할 수 있도록 하고 있다

-   이 경우 미리 예약된 getServerSideProps() 함수를 사용

```
export async function getServerSideProps() {
  const userRequest = await fetch('https://example.com/api/user');
  const userData = await userRequest.json();

  return {
    props: {
      user: userData,
    },
  };
}
202030408 김진석

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

```
<body>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
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

```
import Head from 'next/head';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';

function Highlight({ code }) {
  hljs.registerLanguage('javascript', javascript);
  hljs.initHighlighting();

  202030408 김진석
  return (
    <>
      <Head>
        <link rel='stylesheet' href='/highlight.css' />
      </Head>
      <pre>
        <code className='js'>{code}</code>
      </pre>
    </>
  );
}

export default Highlight;

```

-   다음과 같이 React.useEffect와 React.useState를 함께 써서 특정 컴포넌트를 정확히 클라이언트에서만 렌더링하도록 지정할 수 있다

```
import { useEffect, useState } from 'react';
import Highlight from '../components/Highlight';

function UseEffectPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient && (
        <Highlight
          code={"console.log('Hello, world!')"}
          language='js'
        />
      )}
    </div>
  );
}
202030408 김진석

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

```
import dynamic from 'next/dynamic';

202030408 김진석

const Highlight = dynamic(
  () => import('../components/Highlight'),
  { ssr: false }
);

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

```
{
    202030408 김진석
    "presets":["next/babel"]
}
```

# ECMAScript 기능 중 파이프라인 연산자를 사용해 보자

-   기능을 사용하려면 바벨 플러그인 설치

-   그리고 .barbelrc 파일을 다음과 같이 수정

```
{
    202030408 김진석
    "presets":["next/babel"],
    "plugins":[
        [
        "@babel/plugin-proposal-pipeline-operator",
        {"proposal": "fsharp"}
        ]
    ]
}
```
