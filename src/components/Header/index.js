import styles from './Header.module.css'
import Mascote from 'assets/mascote.png';
import React, { useState, useEffect } from 'react';
import { IconButton, Typography } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from "react-router-dom";

function Header() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        var token = localStorage.getItem('token')
        var payload = decodeJWT(token);
        setEmail(payload.email)
        setName(payload.name)
        setSurname(payload.surname)
    }, []);

    const decodeJWT = (token) => {
        const parts = token.split('.');
      
        if (parts.length !== 3) {
          throw new Error('JWT inválido');
        }
      
        const payload = parts[1];
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = atob(base64);
        
        return JSON.parse(jsonPayload);
      };
    const exit = async (e) => {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        navigate("/");
    };


    return (
        <div className={`${styles.headerDiv}`} >
            <div>
                <img
                    src={Mascote}
                    alt="Imagem do Mascote"
                    style={{ width: 'auto', height: '100%' }}
                />
            </div>
            <div className={`${styles.nameDiv}`}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Gestão de Tarefas
                </Typography>
            </div>
            <div className={`${styles.nameDiv}`} >
                <Typography variant="h7" component="h6" marginRight={2} textAlign={"center"}>
                    Olá, {name} {surname} <br></br>
                    {email}
                </Typography>

                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={exit}
                >
                    <ExitToAppIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default Header;