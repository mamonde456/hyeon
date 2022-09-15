import { useMatch } from "react-router-dom";

const WindowOpen = () => {
  const resumeMatch = useMatch("/resume");
  return <>{resumeMatch && <div></div>}</>;
};

export default WindowOpen;
