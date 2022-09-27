지난 번에 구현했던 accordion 메뉴를 수정했다.

고치고 싶은 점으로 생각했던 부분을 구현하는데 성공.

li 내부에 contents를 넣고 li의 height을 조절하여 만드는 형식이었다. 다만, 이 경우에 내부 contents의 내용이 길어질 경우 코드가 보기 힘들 것 같아 따로 컴포넌트를 빼서 작성했다.

title을 담당할 div와 contents를 담당할 div로 컴포넌트 전체를 li로 감싼다.
click을 하면 li의 height값이 늘어나게 해야하는데, 문제는 클릭한 li만 조절하는 게 어려웠다.

다른 부분을 진행하면서 이렇게 구현하면 괜찮겠다 싶었던 방법이 selected를 주는 것.
리액트에서는 classList를 사용할 수 없으니 다른 방법으로 진행했다.

tab을 구현했을 때와 동일한 방법으로, map을 통한 item의 id와 useState에 담은 tab의 id가 동일한지 확인하고 className을 주는 방법. (click한 li = tab에 담긴 li / map으로 뿌리는 li )

클릭하면 state에 item을 담고 item의 id와 tab의 id가 동일하면 height이 늘어난다.
내부의 contents는 map을 사용하고 있어 동일한 내용이 작성되는 문제가 생기므로 props를 사용하여 데이터를 전달하고 관리했다.

이렇게 구현하니 원하는 방식으로 작동한다.
