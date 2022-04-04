import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import { useLinkedIn } from 'react-linkedin-login-oauth2';

import linkedInLogo from '../../assets/img/linkedin-logo-full.png';

import "./index.css";
import 'react-toastify/dist/ReactToastify.css';

export default function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    const LINKEDIN_AUTH_CODE = localStorage.getItem("LINKEDIN_AUTH_CODE");

    if (LINKEDIN_AUTH_CODE) {
      return navigate("/new-post");
    }
  }, [])

  const { linkedInLogin } = useLinkedIn({
    clientId: '867gtykwlge1z0',
    redirectUri: `http://localhost:3000/linkedin`,
    scope: 'r_liteprofile r_emailaddress w_member_social',
    onSuccess: async (code) => {      
      toast.success('Sucesso! Redirecionando...', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        progress: undefined,
        theme: 'colored'
      });

      localStorage.setItem('LINKEDIN_AUTH_CODE', code)

      setTimeout(() => {
        navigate('/new-post');
      }, [2000])
    },
    onError: (error) => {
      const LINKEDIN_AUTH_CODE = localStorage.getItem("LINKEDIN_AUTH_CODE");

      if (!LINKEDIN_AUTH_CODE) {
        toast.error(
          'Opa, algo deu errado: ' + error.errorMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            pauseOnHover: true,
            progress: undefined,
            theme: 'colored'            
          }
        );    
      }
    }
  });  

  return (
    <div className="container flex full-centered">
      <div className="auth-card">
        <img src={linkedInLogo} alt={"Logo do LinkedIn"} className="logo" />
        <p style={{ marginTop: '10px' }}>
          <strong>Olá, seja bem-vindo(a)!</strong>
        </p>

        <button className="auth-button" onClick={linkedInLogin}>
          Entrar com o LinkedIn
        </button>

        <ToastContainer />
      </div>     
    </div>
  )
}