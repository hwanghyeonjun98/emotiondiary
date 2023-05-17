import "./App.css";
import React, {useReducer, useRef} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

/// components
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeder";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) => (it.id === action.data.id ? {...action.id} : it));
      break;
    }
    default:
      return state;
  }

  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1",
    date: 1684287619611,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2",
    date: 1684287619616,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3",
    date: 1684287619617,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4",
    date: 1684287619618,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5",
    date: 1684287619619,
  },
  {
    id: 6,
    emotion: 6,
    content: "오늘의 일기 6",
    date: 1784287619619,
  },
];

const App = () => {
  const [data, dispatch] = useReducer(reducer, dummyData);

  const dataId = useRef(0);

  // create
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });

    dataId.current += 1;
  };

  // remove
  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", targetId});
  };

  //edit
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <BrowserRouter>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={(onCreate, onEdit, onRemove)}>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </BrowserRouter>
  );
};

export default App;
