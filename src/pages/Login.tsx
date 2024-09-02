import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import Layout from '../layouts/FullLayout';
import Input from '../components/Input';
import Image from '../components/Image';
import { AppContext } from '../context/AppContext';

import general from './AllPages.module.scss';
import styles from '../styles/Login.module.scss';

const Login: React.FC = () => {
  const [error, setError] = useState<{ login?: string, register?: string }>({});
  const [register, setRegister] = useState(false);

  const { loggedIn, setLoggedIn } = useContext(AppContext)!;
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate('/products');
    }
  }, [loggedIn, navigate]);

  const handleIsRegister = () => {
    setRegister(!register);
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const email = (document.getElementById('logEmail') as HTMLInputElement).value;
      const password = (document.getElementById('logPass') as HTMLInputElement).value;

      if ( !email || !password ){
        setError({ login: 'Campos incompletos.' });
        return;
      }

      const response = await fetch('https://api-services.rbduck.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: email,
          password: password
        }),
      });

      const data = await response.json();
      console.log(data);

      if ( response.ok ){
        setLoggedIn(true);
        setError({ login: '' });
        navigate('/products');
      }else{
        setError({ login: data.message });
      }

    } catch (error) {
      setError({ login: 'An error occurred. Please try again later.' });
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const email = (document.getElementById('regEmail') as HTMLInputElement).value;
      const password = (document.getElementById('regPass') as HTMLInputElement).value;
      const confirmPass = (document.getElementById('regConfirmPass') as HTMLInputElement).value;

      if ( !email || !password || !confirmPass ){
        setError({ register: 'Campos incompletos.' });
        return;
      }

      if ( password !== confirmPass ){
        setError({ register: 'Las contraseñas no coinciden.' });
        return;
      }

      const response = await fetch('https://api-services.rbduck.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: email,
          password: password,
          role: 'user'
        }),
      });

      const data = await response.json();
      console.log(data);

      if ( response.ok ){
        setLoggedIn(true);
        setError({ register: '' });
        navigate('/products');
      }
    } catch (error) {
      setError({ register: 'An error occurred. Please try again later.' });
    }
  }

  return (
    <Layout>
      <div className={ clsx(general['full-page-wrapper'], styles['login-main-wrapper']) }>
        <h1 className={ general.hidden }> Inicio de sesion react test Juan Carlos Ceballos </h1>
        <div className={ clsx(styles['form-card']) }>
          <div className={ register ? styles['collapsed'] : '' } >
            <h2>Iniciar Sesión</h2>
            <div className={ styles['input-wrapper'] } >
              <Input
                _id="logEmail"
                title="Correo Electrónico"
                type="text"
                placeholder="example@rbduck.com"
                className={ general['input-wrapper'] }
                validations={ ['notEmpty', 'email'] }
              />
              <Input
                _id="logPass"
                title="Contraseña"
                type="password"
                placeholder="********"
                className={ general['input-wrapper'] }
                validations={ ['notEmpty'] }
              />
              <p className={ error.login ? general['text-error'] : '' } > { error.login ? error.login : '' } </p>
            </div>
            <div className={ styles['button-wrapper'] }>
              <button className={ general['primary-button'] } onClick={ handleLogin }>
                Iniciar Sesión
              </button>

              <button className={ general['secondary-button'] } onClick={ handleIsRegister }>
                Registrar
              </button>
            </div>
          </div>
          
          <div>
            <Image
              src= { register ? '/assets/decorative/register.svg' : '/assets/decorative/login.svg' }
              alt="Imagen no encontrada"
              placeholderSrc= { register ? '/assets/decorative/register.svg' : '/assets/decorative/login.svg' }
              className={ clsx(general['image-w-medium']) }
            />
          </div>

          <div className={ !register ? styles['collapsed'] : '' } >
            <h2>Registrar</h2>
            <div className={ styles['input-wrapper'] } >
              <Input
                _id="regEmail"
                title="Correo Electrónico"
                type="text"
                placeholder="example@rbduck.com"
                className={ general['input-wrapper'] }
                validations={ ['notEmpty', 'email'] }
              />
              <Input
                _id="regPass"
                title="Contraseña"
                type="password"
                placeholder="********"
                className={ general['input-wrapper'] }
                validations={ ['notEmpty', 'password'] }
              />
              <Input
                _id="regConfirmPass"
                title="Confirmar Contraseña"
                type="password"
                placeholder="********"
                className={ general['input-wrapper'] }
                validations={ ['notEmpty', 'confirm-pass'] }
                confimationID="regPass"
              />
            </div>
            <p className={ error.register ? general['text-error'] : '' } > { error.register ? error.register : '' } </p>
            <div className={ styles['button-wrapper'] }>
              <button className={ general['primary-button'] } onClick={ handleRegister }>
                Registrarme!
              </button>

              <button className={ general['secondary-button'] } onClick={ handleIsRegister }>
                Cancelar
              </button>
            </div>
            
          </div>          
        </div>
      </div>
    </Layout>
  );
};

export default Login;
