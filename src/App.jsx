import { useState } from 'react'
import data_employees from './assets/data-employees.json'
import data_suggestions from './assets/data-suggestions.json'
import './App.css'
import Employee from './components/employee/Employee'
import Suggestion from './components/suggestion/Suggestion'
import SmallPopup from './components/smallPopup/SmallPopup';
import SuggestionForm from './components/suggestionForm/suggestionForm'

function App() {
  const [suggestionCount, setSuggestionCount] = useState(9)
  const [employees] = useState(data_employees)
  const [suggestions, setSuggestions] = useState(data_suggestions)
  const [filterSortSuggestions, setFilterSortSuggestions] = useState(data_suggestions)
  const [openNotes, setOpenNotes] = useState(false);
  const [notesData, setNotesData] = useState(null);
  const [filterBy, setFilterBy] = useState('none');
  const [sortBy, setSortBy] = useState('none');

  const handlePopUp = (open, data) => {
    setOpenNotes(open);
    setNotesData(data);
  }

  const handleFilterChange = (filter) => {
    setFilterBy(filter.target.value)
    setFilterSortSuggestions(HandleSortAndFilterAndSlice(suggestions, sortBy, filter.target.value))
  }

  const handleSortChange = (sort) => {
    setSortBy(sort.target.value)
    setFilterSortSuggestions(HandleSortAndFilterAndSlice(suggestions, sort.target.value, filterBy))
  }

  const HandleSortAndFilterAndSlice = (suggestions, sortBy, filterBy) => {
    let toFilterAndSort = [...suggestions]

    let filteredSuggestions
    // Filter here
    if (filterBy.includes('type')) {
      filteredSuggestions = toFilterAndSort.filter(sug => sug.type === filterBy.split("--")[1])
    } else if (filterBy.includes('priority')) {
      filteredSuggestions = toFilterAndSort.filter(sug => sug.priority === filterBy.split("--")[1])
    } else if (filterBy.includes('name')) {
      filteredSuggestions = toFilterAndSort.filter(sug => sug.employeeId === filterBy.split("--")[1])
    } else {
      filteredSuggestions = toFilterAndSort
    }

    // Sort here
    let sortedSuggestions
    const priorityOrder = ["low", "medium", "high"];
    switch (sortBy) {
      case 'type':
        sortedSuggestions = filteredSuggestions.sort((a, b) => a.type.localeCompare(b.type))
        break;
      case 'priorityLow':
        sortedSuggestions = filteredSuggestions.sort((a, b) => {
          return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
        });
        break;
      case 'priorityHigh':
        sortedSuggestions = filteredSuggestions.sort((a, b) => {
          return priorityOrder.indexOf(b.priority) - priorityOrder.indexOf(a.priority);
        });
        break;
      case 'none':
      default:
        sortedSuggestions = filteredSuggestions
        break;
    }

    return sortedSuggestions
  }

  const handleSubmit = (data) => {
    const timeCreated = new Date().toISOString().split('.')[0] + 'Z'
    const currentIds = employees.map(e => e.id)
    let newGeneratedId = crypto.randomUUID()
    while (currentIds.includes(newGeneratedId)) { // in no way sustainable in larger system
      newGeneratedId = crypto.randomUUID() //regenerate if code already exists, would be handled by database in real world
    }
    const newSuggestion = {
      id: newGeneratedId, 
      employeeId: data.employeeId,
      type: data.type,
      description:data.description,
      status: data.status,
      priority: data.priority,
      source: "admin",
      dateCreated: timeCreated,
      dateUpdated: timeCreated,
      notes: data.notes,
    }
    const addingSuggestion = [newSuggestion,...suggestions];
    setSuggestions(addingSuggestion)
    setFilterSortSuggestions(HandleSortAndFilterAndSlice(addingSuggestion, sortBy, filterBy))
  };

  return (
    <>
      <h1><u>Suggestions</u></h1>
      <div className='toolBar'>

        <div className='filterBy'>
          <p>Filter By: </p>
          <select className="select" value={filterBy} onChange={handleFilterChange}>
            <option key='none' value='none'>None</option>
            {[...new Set([...suggestions].map(item => item.type))].map((type, index) => (
              <option key={index} value={'type--'+type}>
                Type - {type.split('_').map(word => word.slice(0,1).toUpperCase()+word.slice(1,word.length)).join(' ')}
              </option>
            ))}

            {[...new Set([...suggestions].map(item => item.priority))].map((priority, index) => (
              <option key={index} value={'priority--'+priority}>
                Priority - {priority.split('_').map(word => word.slice(0,1).toUpperCase()+word.slice(1,word.length)).join(' ')}
              </option>
            ))}

            {[...employees].map((emp, index) => (
              <option key={index} value={'name--'+emp.id}>
                Name - {emp.name.split('_').map(word => word.slice(0,1).toUpperCase()+word.slice(1,word.length)).join(' ')}
              </option>
            ))}
          </select>
        </div>

        <div className='sortBy'>
          <p>Sort By: </p>
          <select className="select" value={sortBy} onChange={handleSortChange}>
            <option key='none' value='none'>None</option>
            <option key='type' value='type'>Type</option>
            <option key='priorityLow' value='priorityLow'>Priority, Low-High</option>
            <option key='priorityHigh' value='priorityHigh'>Priority, High-Low</option>
          </select>
        </div>

        <div className='createSug'><button onClick={() => handlePopUp(true, <SuggestionForm employees={employees} onSubmit={handleSubmit} handlePopUp={handlePopUp} />)}> Create Suggestion</button></div>

      </div>
      <div className='flexlist'>
        {filterSortSuggestions.slice(0,suggestionCount)
          .map(sug => (
            <Suggestion
              key={sug.id}
              suggestion={sug} 
              employee={employees.find(emp => emp.id === sug.employeeId)} 
              handlePopUp={handlePopUp}
            />
        ))}
      </div>
      {suggestionCount < filterSortSuggestions.length && <button className="seeMoreButton" onClick={() => setSuggestionCount(prev => prev+9)}>Load 9 more</button>}
      {suggestionCount >= filterSortSuggestions.length && suggestionCount != 9 && <button className="seeMoreButton" onClick={() => setSuggestionCount(9)}>Collapse to 9</button>}
      {filterSortSuggestions.length == 0 && <h3>No suggestions match filter.</h3>}

      <h1><u>Employees</u></h1>
      <div className='flexlist'>
        {employees.map(emp => (
          <Employee key={emp.id} employee={emp} />
        ))}
      </div>
      
      <SmallPopup key={"popup"} 
        isOpen={openNotes} 
        data={notesData}
        handlePopUp={handlePopUp}
      />
    </>
  )
}

export default App