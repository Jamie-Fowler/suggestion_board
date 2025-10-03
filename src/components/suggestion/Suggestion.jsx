import { useState } from 'react'
import "./Suggestion.css";
import Employee from '../employee/Employee';

function Suggestion({ suggestion, employee, handlePopUp }) {

  const [status, setStatus] = useState(suggestion.status);
  const statuses = ["dismissed", "pending", "in_progress", "completed"];

  const handleStatusChange = (e) => {
    setStatus(e.target.value)
    suggestion.status = e.target.value
  }

  return (
    <div className="suggestion-card">
      <div className={`priority ${suggestion.priority}`}>{suggestion.priority} priority</div>

      <div className="padding">
        <div className="header">
          <h3 className="type">{suggestion.type}</h3>
          <select className="status" value={status} onChange={handleStatusChange}>
            {statuses.map((opt, index) => (
              <option key={index} value={opt}>
                {opt.split('_').map(word => word.slice(0,1).toUpperCase()+word.slice(1,word.length)).join(' ')}
              </option>
            ))}
          </select>
        </div>
        <p className="description">{suggestion.description}, by <b>{suggestion.source}</b></p>
        <div className="footer">
          <button className="bottomButton" onClick={() => handlePopUp(true, <Employee employee={employee}/>)}>{employee.name}</button>
          {suggestion.notes !== "" && <button className="bottomButton" onClick={() => handlePopUp(true, <div>{suggestion.notes}</div>)}>See notes</button>}
        </div>
      </div>
    </div>
  );
}

export default Suggestion;