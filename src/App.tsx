import React, { useState } from "react";
import { MultiSelect } from "./components";
import { Items } from "./components/multiSelect/MultiSelect";
import "./assets/styles/global.scss";

const initialOptions: Items = [
  "Education",
  "Science",
  "Art",
  "Sport",
  "Games",
  "Health",
];

function App() {
  const [selected, setSelected] = useState<Items>([]);

  // const optionsChangeHandle: (items: Items) => void = (items) => {
  //You can access the new options list to save that in the DB or ...
  // };

  return (
    <div className="container">
      <MultiSelect
        selected={selected}
        setSelected={setSelected}
        options={initialOptions}
        // onOptionsChange={optionsChangeHandle}
      />
    </div>
  );
}

export default App;
