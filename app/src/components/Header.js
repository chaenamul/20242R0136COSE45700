import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div style={{
      backgroundColor: 'lightgrey',
      padding: '20px',
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <div onClick={() => navigate('/main')} style={{ margin: '0px', cursor: 'pointer' }}>
          Main
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>

      </div>
    </div>
  );
}

export default Header;
