import { useState } from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import Create from "./Components/Create/Create";
import Dashboard from "./pages/Dashboard/Dashboard";
import Bugs from "./pages/Bugs/Bugs";
import MyBugs from "./pages/MyBugs/MyBugs";
import "./App.css";

function App() {
  const [page, setPage] = useState("dashboard");
  const [createOpen, setCreateOpen] = useState(false);

  let content;
  if (page === "bugs") {
    content = <Bugs />;
  } else if (page === "my-bugs") {
    content = <MyBugs />;
  } else {
    content = <Dashboard />;
  }

  return (
    <div className="App">
      <Sidebar currentPage={page} onChangePage={setPage} />
      <div className="App-main">
        <Header onOpenCreate={() => setCreateOpen(true)} />
        {content}
      </div>
      <Create open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}

export default App;
