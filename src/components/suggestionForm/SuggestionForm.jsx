import React, { useState } from "react";
import './SuggestionForm.css'

function SuggestionForm({ employees, onSubmit, handlePopUp }) {
  // Hard-coded options inside the component
  const types = ["equipment", "exercise", "behavioural", "lifestyle"];
  const statuses = ["dismissed", "pending", "in_progress", "completed"];
  const priorities = ["low", "medium", "high"];

  const [formData, setFormData] = useState({
    employeeId: "",
    type: "",
    description: "",
    status: "",
    priority: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    // Optionally clear the form
    setFormData({
      employeeId: "",
      type: "",
      description: "",
      status: "",
      priority: "",
    });
    handlePopUp(false, null)
  };

  return (
    <form onSubmit={handleSubmit} className="suggestion-form">
      {/* Employee */}
      <label>
        Employee:
        <select
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          required
        >
          <option value="">Select employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
      </label>

      {/* Type */}
      <label>
        Type:
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select type</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t.slice(0,1).toUpperCase()+t.slice(1,t.length)}
            </option>
          ))}
        </select>
      </label>

      {/* Description */}
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </label>

      {/* Status */}
      <label>
        Status:
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="">Select status</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s.split('_').map(word => word.slice(0,1).toUpperCase()+word.slice(1,word.length)).join(' ')}
            </option>
          ))}
        </select>
      </label>

      {/* Priority */}
      <label>
        Priority:
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          required
        >
          <option value="">Select priority</option>
          {priorities.map((p) => (
            <option key={p} value={p}>
              {p.slice(0,1).toUpperCase()+p.slice(1,p.length)}
            </option>
          ))}
        </select>
      </label>

      {/* Notes */}
      <label>
        Notes:
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          required={false}
        />
      </label>

      <button type="submit">Create Suggestion</button>
    </form>
  );
}

export default SuggestionForm;