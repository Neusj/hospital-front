import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const DetallePaciente = ({ match }) => {
    const [patient, setPatient] = useState(null);
    const [rutaFoto, setRutaFoto] = useState('');
    const { id } = useParams();

    useEffect(() => {

        axios.get(`http://localhost:3000/getById/${id}`)
            .then(response => {
                setPatient(response.data.paciente);
                let photo = response.data.paciente.fotoPersonal.slice(46)
                setRutaFoto(`${photo}`);
            })
            .catch(error => {
                console.error('Error al obtener datos del paciente:', error);
            });
    }, [id]);

    if (!patient) {
        return <div>Cargando...</div>;
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col className="text-center">
                    <h1>Detalle del Paciente</h1>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col xs={12} md={6} lg={4} className="d-flex align-items-stretch">
                    <Card className="mb-3" style={{ backgroundColor: '#e6f7e6', width: '100%' }}>
                        <Card.Body>
                            <Card.Title>{patient.nombre}</Card.Title>
                            <Card.Text>
                                <img src={rutaFoto} alt="Foto Personal" style={{ maxWidth: '100px' }} /><br />
                                <strong>RUT:</strong> {patient.rut}<br />
                                <strong>Edad:</strong> {patient.edad}<br />
                                <strong>Sexo:</strong> {patient.sexo}<br />
                                <strong>Enfermedad:</strong> {patient.enfermedad}<br />
                                <strong>Fecha de Ingreso:</strong> {new Date(patient.fechaIngreso).toLocaleDateString()}<br />
                                <strong>Revisado:</strong> {patient.revisado ? 'Sí' : 'No'}<br />
                                <NavLink to={`/paciente/actualizar/${patient._id}`}>
                                    <strong className='text-success btn'>Actualizar</strong>
                                </NavLink><br/>
                                <NavLink to={`/paciente/eliminar/${patient._id}`}>
                                    <strong className='text-danger btn'>Eliminar</strong>
                                </NavLink>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default DetallePaciente;
