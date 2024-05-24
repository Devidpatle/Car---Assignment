import { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { updateCar } from '../service/carService';
// eslint-disable-next-line react/prop-types
const UpdateCar = ({ show, handleClose, car, onUpdate }) => {
    const [carData, setCarData] = useState({
        make: '',
        model: '',
        year: '',
        engine: {
            type: '',
            horsepower: ''
        },
        tyres: [
            { brand: '', pressure: '', position: 'front-left' },
            { brand: '', pressure: '', position: 'front-right' },
            { brand: '', pressure: '', position: 'rear-left' },
            { brand: '', pressure: '', position: 'rear-right' }
        ]
    });
    useEffect(() => {
        if (car) { setCarData(car); }
    }, [car]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [mainField, subField] = name.split('.');
        if (subField) {
            setCarData((prevData) => ({
                ...prevData,
                [mainField]: {
                    ...prevData[mainField],
                    [subField]: value
                }
            }));
        } else {
            setCarData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };
    const handleTyreChange = (index, field, value) => {
        const updatedTyres = carData.tyres.map((tyre, i) =>
            i === index ? { ...tyre, [field]: value } : tyre
        );
        setCarData((prevData) => ({
            ...prevData,
            tyres: updatedTyres
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateCar(carData.id, carData)
            .then((response) => {
                console.log('Car updated successfully:', response.data);
                handleClose();
                onUpdate();
            })
            .catch((error) => {
                console.error('Error updating car:', error);
            });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Car</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formMake">
                        <Form.Label>Make</Form.Label>
                        <Form.Control type="text" name="make" value={carData.make} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formModel">
                        <Form.Label>Model</Form.Label>
                        <Form.Control type="text" name="model" value={carData.model} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formYear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="number" name="year" value={carData.year} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formEngineType">
                        <Form.Label>Engine Type</Form.Label>
                        <Form.Control type="text" name="engine.type" value={carData.engine.type} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formEngineHorsepower">
                        <Form.Label>Engine Horsepower</Form.Label>
                        <Form.Control type="number" name="engine.horsepower" value={carData.engine.horsepower} onChange={handleChange} required />
                    </Form.Group>
                    {carData.tyres.map((tyre, index) => (
                        <div key={index}>
                            <h5 className="mt-3">Tyre {index + 1} ({tyre.position})</h5>
                            <Form.Group controlId={`formTyreBrand${index}`}>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control type="text" id={`tyreBrand${index}`} value={tyre.brand} onChange={(e) => handleTyreChange(index, 'brand', e.target.value)} required />
                            </Form.Group>
                            <Form.Group controlId={`formTyrePressure${index}`}>
                                <Form.Label>Pressure</Form.Label>
                                <Form.Control type="number" id={`tyrePressure${index}`} value={tyre.pressure} onChange={(e) => handleTyreChange(index, 'pressure', e.target.value)} required />
                            </Form.Group>
                            <Form.Group controlId={`formTyrePosition${index}`}>
                                <Form.Label>Position</Form.Label>
                                <Form.Control type="text" id={`tyrePosition${index}`} value={tyre.position} onChange={(e) => handleTyreChange(index, 'position', e.target.value)} required />
                            </Form.Group>
                        </div>
                    ))}
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Update Car
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
export default UpdateCar;
