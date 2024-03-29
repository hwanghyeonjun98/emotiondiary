import { useContext, useEffect, useState } from "react";
import MyHeader from "../components/MyHeder";
import MyButton from "../components/MyButton";
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [currDate, setCurrDate] = useState(new Date());
  const headerText = `${currDate.getFullYear()}월 ${currDate.getMonth() + 1}월`;

  useEffect(() => {
    const titleElement = document.querySelector("title");
    titleElement.innerHTML = `오늘의 감정 일기장`;
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(currDate.getFullYear(), currDate.getMonth(), 1).getTime();
      const lastDay = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0, 23, 59, 59, 59).getTime();

      setData(diaryList.filter((it) => firstDay <= it.CREATE_DATE && it.CREATE_DATE <= lastDay));
    }
  }, [diaryList, currDate]);

  const decreaseMonth = () => {
    setCurrDate(new Date(currDate.getFullYear(), currDate.getMonth() - 1, currDate.getDate()));
  };

  const increaseMonth = () => {
    setCurrDate(new Date(currDate.getFullYear(), currDate.getMonth() + 1, currDate.getDate()));
  };

  return (
    <div>
      <MyHeader
        headerText={headerText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
