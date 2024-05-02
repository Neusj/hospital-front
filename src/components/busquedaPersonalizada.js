import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const BusquedaPersonalizada = () => {
    const [filtroSexo, setFiltroSexo] = useState('');
    const [filtroFechaIngreso, setFiltroFechaIngreso] = useState('');
    const [filtroEnfermedad, setFiltroEnfermedad] = useState('');
    const [resultados, setResultados] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3000/getCustom`, {
                params: {
                    sexo: filtroSexo,
                    fechaIngreso: filtroFechaIngreso,
                    enfermedad: filtroEnfermedad
                }
            });
            setResultados(response.data);
        } catch (error) {
            console.error('Error al buscar pacientes:', error);
        }
    };

    return (
        <Container>
            <h1>Busqueda Personalizada</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="filtroSexo">
                    <Form.Label>Sexo:</Form.Label>
                    <Form.Control type="text" value={filtroSexo} onChange={(e) => setFiltroSexo(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="filtroFechaIngreso">
                    <Form.Label>Fecha de Ingreso:</Form.Label>
                    <Form.Control type="date" value={filtroFechaIngreso} onChange={(e) => setFiltroFechaIngreso(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="filtroEnfermedad">
                    <Form.Label>Enfermedad:</Form.Label>
                    <Form.Control type="text" value={filtroEnfermedad} onChange={(e) => setFiltroEnfermedad(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" className='mt-4'>
                    Buscar
                </Button>
            </Form>
            {resultados.length > 0 && (
                <div style={{ maxWidth: '400px', margin: '0 auto' }}> {/* Establece el ancho máximo y centra los elementos */}
                    <h2>Resultados de la Búsqueda:</h2>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {resultados.map((paciente) => (
                            <li key={paciente._id} style={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', padding: '10px' }}>
                                <p>Nombre: {paciente.nombre}</p>
                                <p>RUT: {paciente.rut}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Container>
    );
};

export default BusquedaPersonalizada;
