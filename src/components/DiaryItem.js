import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ ID, CONTENT, EMOTION, CREATE_DATE }) => {
  const navigate = useNavigate();
  const strDate = new Date(parseInt(CREATE_DATE)).toLocaleDateString();

  const goDetail = () => {
    navigate(`/diary/${ID}`);
  };

  const goEdit = () => {
    navigate(`/edit/${ID}`);
  };

  return (
    <div className="DiaryItem">
      <div onClick={goDetail} className={["emotion_img_wrapper", `emotion_img_wrapper_${EMOTION}`].join(" ")}>
        <img src={process.env.PUBLIC_URL + `assets/emotion${EMOTION}.png`} alt="이모지 사진" />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{CONTENT.slice(0, 25)}</div>
      </div>
      <div onClick={goEdit} className="btn_wrapper">
        <MyButton text={"수정하기"} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
