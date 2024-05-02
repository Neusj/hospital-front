import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

const AgregarPaciente = () => {
    const [formData, setFormData] = useState({
        rut: '',
        nombre: '',
        edad: '',
        sexo: '',
        fotoPersonal: null,
        enfermedad: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = e => {
        setFormData({ ...formData, fotoPersonal: e.target.files[0] });
    };

    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });
            await axios.post('http://localhost:3000/add', formDataToSend);
            alert('Registro de paciente exitoso');
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error al agregar paciente:', error);
            alert('Error al agregar paciente. Por favor, inténtalo de nuevo.');
        }
    };

    if (isSubmitted) {
        return <Navigate to="/" />;
    }

    return (
        <Container>
            <h1 className="text-center">Agregar Nuevo Paciente</h1>
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="rut">
                        <Form.Label>RUT:</Form.Label>
                        <Form.Control type="text" name="rut" value={formData.rut} onChange={handleChange} required className="form-control-sm" />
                    </Form.Group>
                    <Form.Group controlId="nombre">
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className="form-control-sm" />
                    </Form.Group>
                    <Form.Group controlId="edad">
                        <Form.Label>Edad:</Form.Label>
                        <Form.Control type="number" name="edad" value={formData.edad} onChange={handleChange} required className="form-control-sm" />
                    </Form.Group>
                    <Form.Group controlId="sexo">
                        <Form.Label>Sexo:</Form.Label>
                        <Form.Control as="select" name="sexo" value={formData.sexo} onChange={handleChange} required className="form-control-sm">
                            <option value="">Seleccionar</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="fotoPersonal">
                        <Form.Label>Foto Personal:</Form.Label>
                        <Form.Control type="file" name="fotoPersonal" onChange={handleFileChange} required className="form-control-sm" />
                    </Form.Group>
                    <Form.Group controlId="enfermedad">
                        <Form.Label>Enfermedad:</Form.Label>
                        <Form.Control type="text" name="enfermedad" value={formData.enfermedad} onChange={handleChange} required className="form-control-sm" />
                    </Form.Group>
                    <div className="d-flex justify-content-center mt-4">
                        <Button variant="primary" type="submit" style={{ minWidth: '150px' }}>
                            Agregar Paciente
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
}

export default AgregarPaciente