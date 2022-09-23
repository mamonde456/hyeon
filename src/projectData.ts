export interface Idata {
  icon: string;
  label: IArray[];
  imgUrl: string;
}

interface IArray {
  text: string;
}

export const data = [
  {
    icon: "html",
    label: [
      {
        text: "비주얼 이미지는 화면을 꽉 채우기 위해 visual_inner 가 아닌 visual_wrap 에 위치해있다.",
      },
      {
        text: "비주얼 이미지가 슬라이드 되면, 동시에 비행기 애니메이션도 재시작해야하기 때문에, 각각의 li 안에 애니메이션 요소를 넣었다.",
      },
    ],
    imgUrl: "/assets/visual_markup.jpg",
  },
  {
    icon: "css3",
    label: [
      {
        text: "자바스크립트에서 li 하나하나를 컨트롤하기 위해 absolute 속성을 이용하여서 서로 겹쳐놓았다.",
      },
      { text: "mobile 버전에서는 flex, grid를 사용하여 레이아웃을 구성했다." },
    ],
    imgUrl: "/assets/visual_css.jpg",
  },
  {
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
    imgUrl: "/assets/visual_javascript.jpg",
  },
];
