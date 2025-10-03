import React from "react";
import "./Employee.css"; // import the CSS file

function Employee({ employee }) {
  return (
    <div className={`employee-card ${employee.riskLevel}`}>
      <p><strong>{employee.name},</strong> {employee.department}</p>
      <p>{employee.riskLevel} risk</p>
    </div>
  );
}

export default Employee;