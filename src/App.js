import { useEffect, useState } from "react";

function App() {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    fetch(
      "https://opensheet.elk.sh/1Ud2vm97__ZEqmTQvdYzCOTNj3kGgjoxzJsZucSALThQ/Bugs",
    )
      .then((response) => response.json())
      .then((data) => setBugs(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bug Tracker</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Bug ID</th>
            <th>Title</th>
            <th>Module</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Reported By</th>
          </tr>
        </thead>

        <tbody>
          {bugs.map((bug, index) => (
            <tr key={index}>
              <td>{bug.Bug_ID}</td>
              <td>{bug.Title}</td>
              <td>{bug.Module}</td>
              <td>{bug.Priority}</td>
              <td>{bug.Status}</td>
              <td>{bug.Assigned_To}</td>
              <td>{bug.Reported_By}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
