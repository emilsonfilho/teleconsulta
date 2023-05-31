import React from 'react';
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
  value,
}) => {
  if (name === 'paciente_cpf' || name === 'paciente_telefone') {
    return (
      <Form.Group controlId={`form${name}`}>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      as={IMaskInput}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
      required={required}
      isInvalid={isInvalid}
      value={value}
      mask={mask}
    />
    {mask && (
      <Form.Text className="text-muted">
        Máscara: {mask}
      </Form.Text>
    )}
    {isInvalid && (
      <Form.Control.Feedback type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    )}
  </Form.Group>
  
    );
  }
    return (
    <Form.Group controlId={`form${name}`}>
  <Form.Label>{label}</Form.Label>
  <Form.Control
    type={type}
    name={name}
    placeholder={placeholder}
    onChange={handleChange}
    required={required}
    isInvalid={isInvalid}
  />
  {isInvalid && (
    <Form.Control.Feedback type="invalid">
      {errorMessage}
    </Form.Control.Feedback>
  )}
</Form.Group>

    )
  }
  

export default Input
