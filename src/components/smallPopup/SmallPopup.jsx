import "./SmallPopup.css";

function SmallPopup({isOpen, data, handlePopUp}) {

  return (isOpen) ? (
    <div className="popup">
      <div className="popup-inner">
        {data}
        <button className="close-btn" onClick={() => handlePopUp(false, null)}>Close</button>
      </div>
    </div>
  ) : "";
}

export default SmallPopup;