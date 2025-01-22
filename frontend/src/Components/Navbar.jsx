import React, { useEffect } from 'react';
import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const naviagte=useNavigate();
  useEffect(() => {
    initMDB({ Dropdown, Collapse });
  }, []);

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#180039' }}>
      <div style={{ display: 'flex', alignItems: 'center',cursor:'pointer'}}>
          <img
            src={logo}
            height='100 px' 
            onClick={()=>{naviagte("/")}}
          />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
  <div  onClick={()=>{naviagte("/connectdoc")}}>
    <span style={{ color: '#C7AE6A', fontFamily: 'Arial' ,cursor:'pointer' }}>Connect2Doc</span>
  </div>

  <div style={{ marginLeft: '100px' }} onClick={()=>{naviagte("/discussions")}}> {/* Add margin here */}
    <span style={{ color: '#C7AE6A', fontFamily: 'Arial',cursor:'pointer'  }}>Discussions</span>
  </div>
</div>

      <div style={{marginLeft:'200px'}}>
      <div style={{ color: '#C7AE6A', fontFamily: 'Arial',marginRight:'20px',cursor:'pointer' }} onClick={()=>{naviagte("/logout")}}>Logout</div>
      </div>
      
    </nav>
  );
};

export default Navbar;
