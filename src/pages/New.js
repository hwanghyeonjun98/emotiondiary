import {useEffect} from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  useEffect(() => {
    const titleElement = document.querySelector("title");
    titleElement.innerHTML = `오늘의 감정 일기장 - 일기 쓰기`;
  }, []);

  return <DiaryEditor />;
};

export default New;
