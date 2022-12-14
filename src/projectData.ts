export interface Idata {
  id: number;
  title: string;
  introText: string;
  Role: IRole[];
  use: IUse[];
  tabImg: ITab[];
  experience: IEx[];
}
interface IEx {
  text: string;
  url: string;
}

interface IUse {
  text: string;
}

interface IRole {
  id: number;
  text: string;
}

export interface ITab {
  id: number;
  icon: string;
  label: IArray[];
  imgurl: string;
}

interface IArray {
  text: string;
}

export interface IProject {
  id: number;
  title: string;
  work: string;
  etc: string;
  date: string;
  imgurl: string;
  pageUrl: string;
}

export const projectData = [
  {
    id: 3,
    title: "momentum clone coding",
    work: "front-end/back-end",
    etc: "react.js",
    date: "2022-11-01 ~ 2022-11-15",
    imgurl: "/assets/homepage_img_",
    pageUrl: "https://tomentum-clone-coding.netlify.app",
  },
  {
    id: 2,
    title: "portfolio",
    work: "design/front-end",
    etc: "react.js",
    date: "2022-09-02 ~",
    imgurl: "/assets/homepage_img_",
    pageUrl: "https://mamonde456.github.io/hyeon/",
  },
  {
    id: 1,
    title: "youtube clone coding",
    work: "front-end/back-end",
    etc: "",
    date: "2022-06-27 ~ 08-05",
    imgurl: "/assets/homepage_img_",
    pageUrl: "https://wetube-clone-coding.fly.dev",
  },
  {
    id: 0,
    title: "navitrip",
    work: "planning/design/front-end",
    etc: "반응형",
    date: "2020-12-01",
    imgurl: "/assets/homepage_img_",
    pageUrl: "http://mamonde456.dothome.co.kr/navitrip/",
  },
];

export const contentsData = [
  {
    id: 0,
    title: "navitrip",
    introText:
      "타국의 현지 상황이나 여행 경비, 위험 지역 등의 자세한 정보를 실시간으로 알 수 있는 여행 플랫폼",
    Role: [
      { id: 0, text: "Planning" },
      { id: 1, text: "design" },
      { id: 2, text: "front-end" },
    ],
    use: [
      { text: "html" },
      { text: "css3" },
      { text: "javascript" },
      { text: "gnuboard" },
    ],
    tabImg: [
      {
        id: 0,
        icon: "html",
        label: [
          {
            text: "비주얼 이미지는 화면을 꽉 채우기 위해 visual_inner 가 아닌 visual_wrap 에 위치해있다.",
          },
          {
            text: "비주얼 이미지가 슬라이드 되면, 동시에 비행기 애니메이션도 재시작해야하기 때문에, 각각의 li 안에 애니메이션 요소를 넣었다.",
          },
        ],
        imgurl: "/assets/visual_markup.jpg",
      },
      {
        id: 1,
        icon: "css3",
        label: [
          {
            text: "자바스크립트에서 li 하나하나를 컨트롤하기 위해 absolute 속성을 이용하여서 서로 겹쳐놓았다.",
          },
          {
            text: "mobile 버전에서는 flex, grid를 사용하여 레이아웃을 구성했다.",
          },
        ],
        imgurl: "/assets/visual_css.jpg",
      },
      {
        id: 2,
        icon: "javascript",
        label: [
          {
            text: "도트와 이미지를 함께 돌리기때문에, 도트의 순번을 this로 구해준다. 클릭한 요소의 전요소가 없을 때까지 selectedIndex를 +해주고, 값을 return시킨다.",
          },
          {
            text: "visualLi의 현재 위치에서 -visualWidth만큼 left로 이동하고, opacity를 0으로 설정해 페이드아웃시켜준다. ",
          },
          {
            text: "다음 올 visualLi를 visualWidth로 이동시켜 나올 준비를 세팅한다.",
          },
          {
            text: "gsap.set이 끝나면 애니메이션으로 좌표를 원래 위치로 변경해준다.",
          },
          {
            text: "도트는 dot[dotNum]으로 대입하여 슬라이드와 함께 돌아갈 수 있게 해준다. 또한 css에서 기획을 끝내고 classList로 활성화/비활성화 해준다.",
          },
        ],
        imgurl: "/assets/visual_javascript.jpg",
      },
    ],

    experience: [
      { text: "전반적인 기획과 디자인 및 코딩의 과정", url: "" },
      { text: "마크업 구조의 중요성", url: "" },
      { text: "flex, grid 등의 css3 활용", url: "" },
      {
        text: "javascript로 slide animation 및 scroll animation 구현",
        url: "",
      },
    ],
  },
  {
    id: 1,
    title: "youtube clone coding",
    introText: "youtube를 똑같이 구현해본 웹사이트",
    Role: [
      { id: 1, text: "design" },
      { id: 2, text: "front-end" },
      { id: 2, text: "back-end" },
      { id: 3, text: "deploy" },
    ],
    use: [
      { text: "pug" },
      { text: "ES6" },
      { text: "node.js" },
      { text: "MongoDB" },
    ],
    tabImg: [
      {
        id: 0,
        icon: "pug",
        label: [
          {
            text: "pug 엔진을 사용하여 마크업.",
          },
          {
            text: "pug의 mixins을 이용해 video의 array를 home에 렌더링한다.",
          },
        ],
        imgurl: "/assets/visual_pug.jpg",
      },
      {
        id: 2,
        icon: "javascript",
        label: [
          {
            text: "pug에서 data를 저장하여 javascript로 끌어온다.",
          },
          {
            text: "comments API를 미리 node에서 설정해놓고, fetch를 통해 comment의 내용을 전달한다.",
          },
          {
            text: "생성한 comment의 작성 시간, 작성자 등의 세부 내용을 받아와 javascript에서 새로운 element를 생성한다.",
          },
        ],
        imgurl: "/assets/visual_javascript_1.jpg",
      },
      {
        id: 3,
        icon: "NodeJS",
        label: [
          {
            text: "fetch로 가져온 comment의 내용을 가지고 새로운 Comment를 생성한다.",
          },
          {
            text: "작성자 이름, 작성자 아이디, 내용 등 필요한 항목을 작성한다.",
          },
          {
            text: "생성한 Comment를 response로 보내준다.",
          },
        ],
        imgurl: "/assets/visual_node.jpg",
      },
    ],
    experience: [
      {
        text: "MongoDB를 활용하여 로그인/로그아웃 구현",
        url: "https://velog.io/@mamonde456/NodeJS-MongoDB를-활용하여-로그인로그아웃-구현하기",
      },
      {
        text: "github 로그인 구현",
        url: "https://velog.io/@mamonde456/GitHub로-로그인-구현하기",
      },
      {
        text: "MongoDB를 활용하여 비디오 검색 기능 구현",
        url: "https://velog.io/@mamonde456/NodeJS-MongoDB를-활용하여-검색-기능-구현",
      },
      {
        text: "MongoDB를 활용하여 비디오/코멘트 업로드 구현",
        url: "https://velog.io/@mamonde456/NodeJS-MongoDB를-활용하여-댓글-업로드-구현",
      },
      {
        text: "youtube-clone-coding 회고록",
        url: "https://velog.io/@mamonde456/youtube-clone-coding을-하면서-힘들었던-점",
      },
    ],
  },
  {
    id: 2,
    title: "portfolio website",
    introText:
      "처음 만들었던 포토폴리오 웹사이트를 리액트로 리메이크 해보았습니다.",
    Role: [
      { id: 1, text: "design" },
      { id: 2, text: "front-end" },
    ],
    use: [
      { text: "react" },
      { text: "typescript" },
      { text: "styled-components" },
      { text: "framer-motion" },
      { text: "recoil" },
    ],
    tabImg: [
      {
        id: 4,
        icon: "react",
        label: [
          {
            text: "useEffect로 윈도우의 사이즈를 실시간으로 가져와 state에 저장한다.",
          },
          {
            text: "useState로 상태관리를 이용해 조건 렌더링한다.",
          },
        ],
        imgurl: "/assets/visual_react.jpg",
      },
      {
        id: 5,
        icon: "typescript",
        label: [
          {
            text: "interface를 정의하여 사용한다.",
          },
          {
            text: "interface를 export해서 다른 파일에서도 사용할 수 있도록 한다.",
          },
        ],
        imgurl: "/assets/visual_typescript.jpg",
      },

      {
        id: 5,
        icon: "styled-components",
        label: [
          {
            text: "props를 사용하여 변수를 css 전달한다.",
          },
          {
            text: "sass 사용으로 className을 통한 개별 css를 적용해줄 수 있다. (인라인 방식으로도 사용)",
          },
        ],
        imgurl: "/assets/visual_styled.jpg",
      },
      {
        id: 5,
        icon: "framer-motion",
        label: [
          {
            text: "애니메이션을 실행할 컴포넌트는 <motion.div>로 적어준다. styled-components의 경우, styled(motion.div)로 사용한다.",
          },
          {
            text: "AnimatePresence 안에 animation을 실행할 컴포넌트를 넣어준다.",
          },
          {
            text: "variants를 선언하고 커스텀해주어 애니메이션 실행한다.",
          },
        ],
        imgurl: "/assets/visual_framer.jpg",
      },
      {
        id: 5,
        icon: "recoil",
        label: [
          {
            text: "useState와 유사하지만 전역에서 변수를 사용하기 위해 recoil atom을 사용한다.",
          },
          {
            text: "사용할 atom의 key와 default를 선언해준다.",
          },
          {
            text: "값을 불러와 사용할 때는 useRecoilValue, 값을 가져오고 변경할 때는 useSetRecoilState를 사용한다.",
          },
        ],
        imgurl: "/assets/visual_recoil.jpg",
      },
    ],
    experience: [
      {
        text: "react-horizontal-scrolling-menu를 이용한 horizontal scrolling menu 구현",
        url: "https://velog.io/@mamonde456/React-horizontal-scroling-menu-구현하기",
      },
      {
        text: "react-scroll-wheel-handler을 이용한 horizontal scrolling 페이지 구현",
        url: "https://velog.io/@mamonde456/React-horizontal-scrolling-페이지-구현하기",
      },
      {
        text: "react로 accordion menu 구현",
        url: "https://velog.io/@mamonde456/React-accordion-menu-만들기-2",
      },
      {
        text: "frame motion을 이용한 tab menu",
        url: "https://velog.io/@mamonde456/React-tab-menu-구현하기",
      },
      {
        text: "portfolio 웹사이트 만들면서 힘들었던 점",
        url: "https://velog.io/@mamonde456/portfolio-웹사이트-만들면서-힘들었던-점",
      },
    ],
  },
  {
    id: 3,
    title: "momentum clone coding",
    introText:
      "chrome 확장 프로그램 momentum을 react로 clone coding 해보았습니다.",
    Role: [
      { id: 2, text: "front-end" },
      { id: 3, text: "back-end" },
      { id: 3, text: "deploy" },
    ],
    use: [
      { text: "react" },
      { text: "typescript" },
      { text: "styled-components" },
      { text: "framer-motion" },
      { text: "recoil" },
    ],
    tabImg: [
      {
        id: 4,
        icon: "react",
        label: [
          {
            text: "자바스크립트로는 이미 만들어본 경험이 있어서 리액트로 만들어 보자 생각했고, api를 사용하려고 계획했기 때문에 리액트 쿼리의 도움을 받고자 리액트를 선택하였습니다. ",
          },
        ],
        imgurl: "/assets/.jpg",
      },
    ],
    experience: [
      {
        text: "spotify login으로 playlist 가져오기",
        url: "https://velog.io/@mamonde456/spotify-login으로-playlist-가져오기",
      },
      {
        text: "momentum clone coding 을 하면서 느낀 점",
        url: "https://velog.io/@mamonde456/REACT-momentum-clone-coding-회고록",
      },
    ],
  },
];
