/*
import { Form } from "react-bootstrap";
import InputMask from "react-input-mask";
import { useState } from "react";

interface InputProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isInvalid?: boolean;
  errorMessage?: string;
  mask?: string;
}

interface InputMaskInputProps {
  value: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  placeholder,
  name,
  handleChange,
  isInvalid,
  errorMessage,
  mask,
}) => {
  const [value, setValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    handleChange(e);
  };

  if (mask) {
    return (
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{label}</Form.Label>
        <InputMask
          mask={mask}
          maskChar="_"
          value={value}
          onChange={handleInputChange}
        >
          {(inputProps: InputMaskInputProps) => (
            <Form.Control
              type={type}
              placeholder={placeholder}
              name={name}
              isInvalid={isInvalid}
              {...inputProps}
            />
          )}
        </InputMask>
        {errorMessage && (
          <Form.Control.Feedback type="invalid">
            {errorMessage}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    );
  } else {
    return (
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleInputChange}
          isInvalid={isInvalid}
        />
        {errorMessage && (
          <Form.Control.Feedback type="invalid">
            {errorMessage}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    );
  }
};

export default Input;*/

import React from 'react';
import { Form } from 'react-bootstrap';
import InputMask from "react-input-mask";

interface InputProps {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  mask?: string;
  errorMessage?: string;
}

interface InputMaskProps {
  value: string;
}

const Input: React.FC<InputProps> = ({ type, name, label, placeholder, handleChange, required, mask, errorMessage }) => {
  /*if (mask) {
    return (
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{label}</Form.Label>
        <InputMask mask={mask} maskChar="_" value="" onChange={handleChange}>
          {(inputProps: InputMaskProps) => (
            <Form.Control
              type={type}
              placeholder={placeholder}
              name={name}
              {...inputProps}
              required
            />
          )}
        </InputMask>
        {errorMessage && (
          <Form.Control.Feedback type="invalid">
            {errorMessage}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    );
  } else {
    return (
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={handleChange}
        />
        {errorMessage && (
          <Form.Control.Feedback type="invalid">
            {errorMessage}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    );
  }*/
  
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        required={required}
      />
      <Form.Control.Feedback type="invalid">
        Por favor, preencha este campo.
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default Input;
