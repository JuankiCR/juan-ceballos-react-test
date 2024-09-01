import React, { useState } from 'react';
import general from '../pages/AllPages.module.scss';

interface InputProps {
  title: string;
  _id: string;
  type: string;
  placeholder: string;
  className: string;
  validations?: string[];
  confimationID?: string;
}

const Input: React.FC<InputProps>= ({ title, _id, type, placeholder, className, validations = [], confimationID }) => {
  const [error, setError] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const validateNotEmpty = (value: string) => {
    return value ? '' : '* Campo requerido.';
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? '' : '* Correo inválido.';
  }

  const validatePass = (password: string) => {
    const minMaxLength = /^[\s\S]{6,12}$/;
    const upper = /[A-Z]/;
    const lower = /[a-z]/;
    const number = /[0-9]/;
    const special = /[@$!%*?&]/;
    if (!upper.test(password)) return '* Debe tener al menos una mayúscula.';
    if (!lower.test(password)) return '* Debe tener al menos una minúscula.';
    if (!number.test(password)) return '* Debe tener al menos un número.';
    if (!minMaxLength.test(password)) return '* Debe tener entre 6 y 12 caracteres.';
    if (!special.test(password)) return '* Debe tener al menos un caracter especial.';
    return '';
  }

  const validateConfirmPass = (password: string, confirmPass: string) => {
    return password === confirmPass ? '' : '* Las contraseñas no coinciden.';
  }

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>, validations:string[], confimation?:string) => {
    if (validations) {
      for (let i = 0; i < validations.length; i++) {
        switch (validations[i]) {
          case 'notEmpty':
            setError( validateNotEmpty(e.target.value) );
            break;
          case 'email':
            setError( validateEmail(e.target.value) );
            break;
          case 'password':
            setError( validatePass(e.target.value) );
            break;
          case 'confirm-pass':
            const confimationValue = (document.getElementById(confimation!) as HTMLInputElement).value;
            setError( validateConfirmPass(e.target.value, confimationValue!) );
            break;
          default:
            break;
        }
      }
    }

    setValue(e.target.value);
  }

  switch (type) {
    case 'text':
      return (
        <div className={ className }>
          <label htmlFor={ _id }> { title } </label>
          <input
            id={ _id }
            type={ type }
            placeholder={ placeholder }
            value={ value }
            onChange={ (e) => handleChangeValue(e, validations) }
          />
          <p className={ error ? general['text-error'] : '' } > { error ? error : '' } </p>
        </div>
      );
    case 'password':
      if (confimationID) {
        return (
          <div className={ className }>
            <label htmlFor={ _id }> { title } </label>
            <input
              id={ _id }
              type={ type }
              placeholder={ placeholder }
              value={ value }
              onChange={ (e) => handleChangeValue(e, validations, confimationID) }
            />
            <p className={ error ? general['text-error'] : '' } > { error ? error : '' } </p>
          </div>
        );
      }

      return (
        <div className={ className }>
          <label htmlFor={ _id }> { title } </label>
          <input
            id={ _id }
            type={ type }
            placeholder={ placeholder }
            value={ value }
            onChange={ (e) => handleChangeValue(e, validations) }
          />
          <p className={ error ? general['text-error'] : '' } > { error ? error : '' } </p>
        </div>
      );
    default:
      return null;
  }
};

export default Input;
