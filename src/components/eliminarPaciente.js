import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


const EliminarPaciente = () => {
    const { id } = useParams();
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleDelete = () => {
        axios.delete(`http://localhost:3000/delete/${id}`)
            .then(response => {
                console.log('Paciente eliminado exitosamente:', response.data);
                setIsSubmitted(true);
            })
            .catch(error => {
                console.error('Error al eliminar paciente:', error);
            });
    };

    if (isSubmitted) {
        return <Navigate to="/paciente/listar" />;
    }


    return (
        <Container>
            <h1>Eliminar Paciente</h1>
            <Button variant="danger" onClick={handleShow}>Eliminar Paciente</Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar este paciente?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default EliminarPaciente;
