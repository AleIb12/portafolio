import React, { useState, useReducer } from 'react';

// Componente ContactForm usando patrones de React Bits:
// - State Reducer Pattern
// - Custom Hooks
// - Controlled Inputs

// Reducer para manejar el estado del formulario
const formReducer = (state, action) => {
  switch (action.type) {
    case 'field':
      return {
        ...state,
        [action.field]: {
          value: action.value,
          error: action.error || ''
        }
      };
    case 'submit':
      return {
        ...state,
        isSubmitting: true
      };
    case 'success':
      return {
        ...state,
        isSubmitting: false,
        isSubmitted: true,
        nombre: { value: '', error: '' },
        email: { value: '', error: '' },
        mensaje: { value: '', error: '' }
      };
    case 'error':
      return {
        ...state,
        isSubmitting: false,
        submitError: action.error
      };
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

// Estado inicial
const initialState = {
  nombre: { value: '', error: '' },
  email: { value: '', error: '' },
  mensaje: { value: '', error: '' },
  isSubmitting: false,
  isSubmitted: false,
  submitError: ''
};

// Validaciones
const validate = {
  nombre: (value) => {
    if (!value.trim()) return 'El nombre es obligatorio';
    return '';
  },
  email: (value) => {
    if (!value.trim()) return 'El email es obligatorio';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'El formato de email no es válido';
    return '';
  },
  mensaje: (value) => {
    if (!value.trim()) return 'El mensaje es obligatorio';
    if (value.length < 10) return 'El mensaje debe tener al menos 10 caracteres';
    return '';
  }
};

// Custom hook para manejar el formulario
export const useContactForm = (onSubmitCallback) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    const error = validate[field](value);
    
    dispatch({
      type: 'field',
      field,
      value,
      error
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar todos los campos antes de enviar
    let hasErrors = false;
    for (const field in validate) {
      const error = validate[field](state[field].value);
      if (error) {
        dispatch({
          type: 'field',
          field,
          value: state[field].value,
          error
        });
        hasErrors = true;
      }
    }
    
    if (hasErrors) return;
    
    dispatch({ type: 'submit' });
    
    try {
      // Simulación de envío de datos
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (onSubmitCallback) {
        await onSubmitCallback({
          nombre: state.nombre.value,
          email: state.email.value,
          mensaje: state.mensaje.value
        });
      }
      dispatch({ type: 'success' });
    } catch (error) {
      dispatch({ 
        type: 'error', 
        error: error.message || 'Error al enviar el formulario' 
      });
    }
  };

  const resetForm = () => {
    dispatch({ type: 'reset' });
  };

  return {
    state,
    handleChange,
    handleSubmit,
    resetForm
  };
};

// Componente principal
const ContactForm = ({ onSubmit }) => {
  const { state, handleChange, handleSubmit, resetForm } = useContactForm(onSubmit);
  
  // Mostrar mensaje de éxito
  if (state.isSubmitted) {
    return (
      <div className="success-message">
        <h3>¡Gracias por tu mensaje!</h3>
        <p>Te responderé lo antes posible.</p>
        <button onClick={resetForm} className="btn btn-primary">
          Enviar otro mensaje
        </button>
      </div>
    );
  }
  
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input 
          type="text" 
          id="nombre" 
          className={`form-input ${state.nombre.error ? 'form-input-error' : ''}`}
          placeholder="Tu nombre" 
          value={state.nombre.value}
          onChange={handleChange('nombre')}
          disabled={state.isSubmitting}
        />
        {state.nombre.error && (
          <p className="error-text">{state.nombre.error}</p>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email</label>
        <input 
          type="email" 
          id="email" 
          className={`form-input ${state.email.error ? 'form-input-error' : ''}`}
          placeholder="tu@email.com" 
          value={state.email.value}
          onChange={handleChange('email')}
          disabled={state.isSubmitting}
        />
        {state.email.error && (
          <p className="error-text">{state.email.error}</p>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="mensaje" className="form-label">Mensaje</label>
        <textarea 
          id="mensaje" 
          rows="4" 
          className={`form-textarea ${state.mensaje.error ? 'form-textarea-error' : ''}`}
          placeholder="Tu mensaje..." 
          value={state.mensaje.value}
          onChange={handleChange('mensaje')}
          disabled={state.isSubmitting}
        ></textarea>
        {state.mensaje.error && (
          <p className="error-text">{state.mensaje.error}</p>
        )}
      </div>
      
      {state.submitError && (
        <div className="form-error">
          {state.submitError}
        </div>
      )}
      
      <button 
        type="submit" 
        className="btn btn-primary btn-full"
        disabled={state.isSubmitting}
      >
        {state.isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
      </button>
    </form>
  );
};

export default ContactForm;