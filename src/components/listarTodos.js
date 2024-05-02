import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const ListarTodos = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/getAll')
            .then(response => {
                setPatients(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos de pacientes:', error);
            });
    }, []);

    return (
        <Container>
            <Row className="mt-5">
                <Col className="text-center">
                    <h1>Pacientes del Hospital Alerce</h1>
                </Col>
                <NavLink to={'/paciente/busquedaPersonalizada'}>
                    <strong className='text-primary btn'>Busqueda personalizada</strong>
                </NavLink>
            </Row>
            <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                <Row className="mt-3">
                    {patients.map(patient => (
                        <Col key={patient._id} xs={12} md={6} lg={4} className="d-flex align-items-stretch">
                            <NavLink to={`/paciente/detalle/${patient._id}`} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                <Card className="mb-3" style={{ backgroundColor: '#e6f7e6', width: '100%' }}>
                                    <Card.Body>
                                        <Card.Title>{patient.nombre}</Card.Title>
                                        <Card.Text>
                                            <strong>RUT:</strong> {patient.rut}<br />
                                            <strong>Edad:</strong> {patient.edad}<br />
                                            <strong>Sexo:</strong> {patient.sexo}<br />
                                            <strong>Enfermedad:</strong> {patient.enfermedad}<br />
                                            <strong>Fecha de Ingreso:</strong> {new Date(patient.fechaIngreso).toLocaleDateString()}<br />
                                            <NavLink to={`/paciente/detalle/${patient._id}`}>
                                                <strong className='text-primary btn'>Ver más...</strong>
                                            </NavLink><br/>
                                            <NavLink to={`/paciente/actualizar/${patient._id}`}>
                                                <strong className='text-success btn'>Actualizar</strong>
                                            </NavLink><br/>
                                            <NavLink to={`/paciente/eliminar/${patient._id}`}>
                                                <strong className='text-danger btn'>Eliminar</strong>
                                            </NavLink>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </NavLink>
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>
    );
}

export default ListarTodos;
