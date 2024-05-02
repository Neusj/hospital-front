import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


const EditarPaciente = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        rut: '',
        nombre: '',
        edad: '',
        sexo: '',
        fotoPersonal: null,
        enfermedad: '',
        revisado: false // Nuevo campo para editar revisado
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/getById/${id}`)
            .then(response => {
                const patientData = response.data.paciente;
                setFormData({
                    rut: patientData.rut,
                    nombre: patientData.nombre,
                    edad: patientData.edad,
                    sexo: patientData.sexo,
                    fotoPersonal: patientData.fotoPersonal,
                    enfermedad: patientData.enfermedad,
                    revisado: patientData.revisado 
                });
            })
            .catch(error => {
                console.error('Error al obtener datos del paciente:', error);
            });
    }, [id]);

    const handleChange = e => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
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

            await axios.put(`http://localhost:3000/update/${id}`, formDataToSend);
            alert('Paciente actualizado exitosamente');
            setIsSubmitted(true);

        } catch (error) {
            console.error('Error al actualizar paciente:', error);
            alert('Error al actualizar paciente. Por favor, inténtalo de nuevo.');
        }
    };

    if (isSubmitted) {
        return <Navigate to={`/paciente/detalle/${id}`} />;
    }
    
    return (
        <Container>
            <h1>Editar Paciente</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="rut">
                    <Form.Label>RUT:</Form.Label>
                    <Form.Control type="text" name="rut" value={formData.rut} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="nombre">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="edad">
                    <Form.Label>Edad:</Form.Label>
                    <Form.Control type="number" name="edad" value={formData.edad} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="sexo">
                    <Form.Label>Sexo:</Form.Label>
                    <Form.Control as="select" name="sexo" value={formData.sexo} onChange={handleChange} required>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="fotoPersonal">
                    <Form.Label>Foto Personal:</Form.Label>
                    <Form.Control type="file" name="fotoPersonal" onChange={handleFileChange} />
                </Form.Group>
                <Form.Group controlId="enfermedad">
                    <Form.Label>Enfermedad:</Form.Label>
                    <Form.Control type="text" name="enfermedad" value={formData.enfermedad} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="revisado">
                    <Form.Check type="checkbox" label="Revisado" name="revisado" checked={formData.revisado} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Actualizar Paciente
                </Button>
            </Form>
        </Container>
    );
}

export default EditarPaciente;
