wheel 이벤트 구현

project 설명란에 휠 이벤트로 진행하는 스크롤 형식의 페이지를 만들고 싶어 시작.

사용하는 것은 useRef , ReactScrollWheelHandler이다. 갖가지 많은 라이브러리를 검색하고 시도해보았지만 그나마 움직이도록 만든 게 저 두가지.

ReactScrollWheelHandler로 deltaY를 불러온다. onWheel 이벤트를 사용하면 deltaY 값을 가져올 수 있지만 구글링한 결과 값을 불러오는 것보다 함수 실행이 빠르다 하여, 라이브러리를 사용했다.

먼저, contents가 들어갈 wrapper와 화면을 담당할 screenBox를 만들고, 둘 다 ref.current로 불러온다.
typescript를 사용하기 때문에 useRef에 <HTMLDivElement> type 설정
(나중에 선언해야지 내버려뒀다가 scrollTo를 사용하지 못해서 꽤 고생했다. 무조건... type 설정 잊지 말자.)

ref.scrollTo()로 휠을 컨트롤 해준다.
left 좌표는 ref.scrollLeft + deltaY \* 5 로 휠을 움직일 때마다 스크롤이 움직이도록 했다.

생각보다 구글링을 해도 얻는 것이 없어 고생 좀 했다...
