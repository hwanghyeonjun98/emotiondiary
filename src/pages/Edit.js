import {useNavigate, useSearchParams} from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  console.log(id);
  const mode = searchParams.get("mode");
  console.log(mode);

  return (
    <div>
      <h2>Edit</h2>
      <p>여기는 일기 수정입니다.</p>
      <button onClick={() => setSearchParams({who: "준현"})}>QS 바꾸기</button>
      <button onClick={() => navigate("/home")}>home</button>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </div>
  );
};

export default Edit;
