import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {DiaryStateContext} from "../App";
import {getStringDate} from "../util/date";
import {emotionList} from "../util/emotion";

import MyHeader from "../components/MyHeder";
import MyButton from "../components/MyButton";

const Diary = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState();

  useEffect(() => {
    const titleElement = document.querySelector("title");
    titleElement.innerHTML = `오늘의 감정 일기장 - ${id}일기`;
  }, [id]);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));

      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", {replace: true});
      }
    }
  }, [id, diaryList, navigate]);

  if (!data) {
    return <div className="Diary">로딩중입니다...</div>;
  } else {
    const curEmotionData = emotionList.find((it) => parseInt(it.emotion_id) === parseInt(data.emotion));

    return (
      <div className="Diary">
        <MyHeader
          headerText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />}
          rightChild={<MyButton text={"수정하기"} onClick={() => navigate(`/edit/${id}`)} />}
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div className={["diary_img_wrapper", `diary_img_wrapper_${curEmotionData.emotion_id}`].join(" ")}>
              <img src={curEmotionData.emotion_img} alt="curEmotionData.emotion_descript" />
              <span className="emotion_descript">{curEmotionData.emotion_descript}</span>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
