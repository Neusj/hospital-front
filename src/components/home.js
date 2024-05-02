import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


const Home = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/getAll')
            .then(response => {
                //Para mostrar los últimos registros agregados
                const latestPatients = response.data.slice(-5);
                setPatients(latestPatients);
            })
            .catch(error => {
                console.error('Error al obtener datos de pacientes:', error);
            });
    }, []);

    return(
        <Container>
            <Row className="mt-5">
                <Col className="text-center">
                    <h1>Bienvenido al gestor de pacientes <br/> del Hospital Alerce</h1>
                </Col>
                <NavLink to={'/paciente/busquedaPersonalizada'}>
                    <strong className='text-primary btn'>Busqueda personalizada</strong>
                </NavLink>
            </Row>
            <Row className="mt-3">
                {patients.map(patient => (
                    <Col key={patient._id} xs={12} md={6} lg={4} className="d-flex align-items-stretch">
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
                                    </NavLink>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Home;
