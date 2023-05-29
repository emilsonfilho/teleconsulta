import { Form } from "react-bootstrap";

interface InputProps {
    label: string;
    name: string;
    type: string;
    placeholder: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({label,  type, placeholder, name, handleChange}) => {
    return (
        <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} placeholder={placeholder} name={name} onChange={handleChange} />
        </Form.Group>
    )
}

export default Input;