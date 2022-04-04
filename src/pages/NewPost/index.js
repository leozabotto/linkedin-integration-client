import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from '../../components/NavBar';

import { 
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';

import { ToastContainer, toast } from 'react-toastify';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function NewPost() {

  const [message, setMessage] = useState('');
  const [visibility, setVisibility] = useState('PUBLIC');
  const [userURN, setUserURN] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const [userName, setUserName] = useState('');

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  async function getAccessToken(code) {
    setLoading(true);
    try {
      const token = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/access-token`, {
        code,
      });

      setAccessToken(token.data.access_token)
      localStorage.setItem('LINKEDIN_ACCESS_TOKEN', token.data.access_token)

      getUserInfo();    
    } catch (err) {
      console.log(err);
      toast.error(
        'Opa, algo deu errado: ' + err.response.data.message, {
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

  async function getUserInfo() {
    try {
      const userInfo = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user?accessToken=${localStorage.getItem('LINKEDIN_ACCESS_TOKEN')}`);

      localStorage.setItem('LINKEDIN_USER_FULLNAME', `${userInfo.data.firstName} ${userInfo.data.lastName}`);
      localStorage.setItem('LINKEDIN_USER_URN', userInfo.data.urn);

      setUserURN(userInfo.data.urn);
      setUserName(`${userInfo.data.firstName} ${userInfo.data.lastName}`);

      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(
        'Opa, algo deu errado: ' + err.response.data.message, {
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

  useEffect(() => {
    const LINKEDIN_AUTH_CODE = localStorage.getItem('LINKEDIN_AUTH_CODE')
    const LINKEDIN_ACCESS_TOKEN = localStorage.getItem('LINKEDIN_ACCESS_TOKEN')
    
    if (!LINKEDIN_AUTH_CODE) return navigate('/');

    if (!LINKEDIN_ACCESS_TOKEN) {
      getAccessToken(LINKEDIN_AUTH_CODE);
    } else {
      setAccessToken(LINKEDIN_ACCESS_TOKEN);    
    }
  }, []);


  async function handleSubmit() {
    try {
      setLoading(true);

      await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/share`, {
        accessToken,
        message,
        userUrn: userURN,
        visibility,
      });    

      toast.success(
        'Mensagem postada com sucesso!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          pauseOnHover: true,
          progress: undefined,
          theme: 'colored'            
        }
      );

      setMessage('');
      setLoading(false);
    } catch (err) {
      toast.error(
        'Opa, algo deu errado: ' + err.response.data.message, {
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

  return (
    <div className="container">
      <ToastContainer />
      <NavBar active="new-post" />
      <div className="flex full-centered column" style={{ height: '80%' }}>
        {loading
          ? <CircularProgress /> 
          : <>                                      
              <div className="user-name">
                <h1>Oi, {userName}!</h1>
              </div>
              <form action="" className="post-form">
                <div className="input-block">
                  <TextField 
                    id="userURN" 
                    name="userURN" 
                    value={userURN} 
                    label={"User URN"}
                    onChange={(e) => setUserURN(e.target.value)}
                    disabled
                    fullWidth             
                  />
                </div>

                <div className="input-block">
                  <TextField 
                    id="accessToken" 
                    name="accessToken" 
                    value={accessToken} 
                    label={"Access Token"}
                    onChange={(e) => setAccessToken(e.target.value)}
                    disabled
                    fullWidth
                  />
                </div>

                <div className="input-block">
                  <FormControl fullWidth>
                    <InputLabel id="visibility-label">Visibilidade</InputLabel>
                    <Select
                      labelId="visibility-label"
                      id="visibility"
                      value={visibility}
                      label="Visibilidade"
                      onChange={(e) => setVisibility(e.target.value)}
                    >
                      <MenuItem value={'PUBLIC'}>Pública</MenuItem>
                      <MenuItem value={'CONNECTIONS'}>Somente Conexões</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="input-block">
                  <TextField 
                    id="message" 
                    name="message" 
                    value={message} 
                    label={"Digite a mensagem aqui..."}
                    onChange={(e) => setMessage(e.target.value)}
                    multiline
                    fullWidth
                  />
                </div>

                <div className="input-block">
                  <button className="submit-button" onClick={() => handleSubmit()}>
                    Enviar
                  </button>
                </div>
              </form>   
            </>
          }     
        </div>
    </div>
  )
}