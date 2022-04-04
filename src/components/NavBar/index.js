/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import linkedInLogo from '../../assets/img/linkedin-logo-small.png'

import './index.css';

export default function NavBar() {

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return ( 
    <nav className="navbar">
      <img src={linkedInLogo} className="logo" alt={"Logo do LinkedIn"} />
      <div className="items">
        <ul>          
          <li>
            <button 
              title="Sair"
              className="logout-button" 
              onClick={handleLogout}
            >
              <ExitToAppIcon fontSize={"small"} />
            </button>
          </li>
        </ul>
      </div>
    </nav>   
  )
}