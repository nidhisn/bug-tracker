import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Create from "./components/Create/Create";
import Dashboard from "./pages/Dashboard/Dashboard";
import Bugs from "./pages/Bugs/Bugs";
import Kanban from "./pages/Kanban/Kanban";
import Projects from "./pages/Projects/Projects";
import Settings from "./pages/Settings/Settings";
import Team from "./pages/Team/Team";
import "./App.css";

function App() {
  const [page, setPage] = useState("dashboard");
  const [createOpen, setCreateOpen] = useState(false);
  const [bugRefreshKey, setBugRefreshKey] = useState(0);

  let content;
  if (page === "bugs") {
    content = <Bugs onNewBug={() => setCreateOpen(true)} refreshKey={bugRefreshKey} />;
  } else if (page === "kanban") {
    content = <Kanban />;
  } else if (page === "projects") {
    content = <Projects />;
  } else if (page === "settings") {
    content = <Settings />;
  } else if (page === "team") {
    content = <Team />;
  } else {
    content = <Dashboard />;
  }

  return (
    <div className="App">
      <Sidebar currentPage={page} onChangePage={setPage} />
      <div className="App-main">
        <Header onChangePage={setPage} />
        {content}
      </div>
      <Create
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={() => setBugRefreshKey((key) => key + 1)}
      />
    </div>
  );
}

export default App;
