import React, { createRef } from 'react';
import { Form } from 'react-bootstrap';
import { IMaskInput } from 'react-imask';

interface InputProps {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  mask?: string;
  value?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  label,
  placeholder,
  handleChange,
  required,
  isInvalid,
  errorMessage,
  mask,
}) => {
  const inputRef = createRef<HTMLInputElement>()

  const handleAccept = (value: string) => {
    const event = new Event('input', { bubbles: true }) as unknown as React.ChangeEvent<HTMLInputElement>
    Object.defineProperty(event, 'target', {
      writable: false,
      value: { name, value }
    })
    handleChange(event)
  }
  
  return (
    <Form.Group controlId={`form${name}`}>
      <Form.Label>{label}</Form.Label>
      {mask ? (
        <Form.Control 
          as={IMaskInput}
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          isInvalid={isInvalid}
          onAccept={handleAccept}
          mask={mask}
          inputRef={inputRef}
        />
      ) : (
        <Form.Control
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          required={required}
          isInvalid={isInvalid}
          ref={inputRef}
        />
      )}
      {isInvalid && (
        <Form.Control.Feedback type='invalid'>
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  )
  
  
  
  }
  

export default Input
