import {useParams} from "react-router-dom";

const Diary = () => {
  const {id} = useParams();

  return (
    <div>
      <h2>Diary</h2>
      <p>여기는 일기입니다.</p>
    </div>
  );
};

export default Diary;
