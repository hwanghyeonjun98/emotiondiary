import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  {
    value: "all",
    name: "모두",
  },
  {
    value: "good",
    name: "좋은 감정만",
  },
  {
    value: "bad",
    name: "나쁜 감정만",
  },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    const filterCallback = (item) => {
      if (filter === "good") {
        return parseInt(item.EMOTION) <= 3;
      } else {
        return parseInt(item.EMOTION) > 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.CREATE_DATE) - parseInt(a.CREATE_DATE);
      } else {
        return parseInt(a.CREATE_DATE) - parseInt(b.CREATE_DATE);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filteredList = filter === "all" ? copyList : copyList.filter((it) => filterCallback(it));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
          <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
        </div>
        <div className="right_col">
          <MyButton text={"새 일기 쓰기"} type={"positive"} onClick={() => navigate("/new")} />
        </div>
      </div>
      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.ID} {...it} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
