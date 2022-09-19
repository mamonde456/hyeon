interface IProps {
  id: number | null;
}
const Contents = (props: IProps) => {
  return (
    <>
      {props.id === 0 ? (
        <>
          <p>
            Navitrip : 타국의 현지 상황이나 여행 경비, 위험 지역 등의 자세한
            정보를 실시간으로 알 수 있는 여행 플랫폼
          </p>
          <p>역할 : 기획, 디자인, 프론트엔드</p>
          <p>사용 기술 : html, css3, javascript, 그누보드</p>
          <p>프로젝트를 진행하며 경험한 부분</p>
          <p>전반적인 기획과 디자인 및 코딩의 과정</p>
          <p>마크업 구조의 중요성</p>
          <p>flex, grid 등의 css3 활용</p>
        </>
      ) : (
        <div>dd</div>
      )}
    </>
  );
};

export default Contents;
