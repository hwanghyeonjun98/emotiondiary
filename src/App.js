import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

/// components
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeder";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader
          headerText={"App"}
          leftChild={<MyButton text={"왼쪽 버튼"} onClick={() => alert("왼쪽 클릭")} />}
          rightChild={<MyButton text={"오른쪽 버튼"} onClick={() => alert("오른쪽 클릭")} />}
        />
        <MyButton text={"버튼"} type="negative" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
