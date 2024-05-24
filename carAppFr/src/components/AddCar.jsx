import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { addNewCar } from '../service/carService';

// eslint-disable-next-line react/prop-types
const AddCar = ({ show, handleClose }) => {
    const [carData, setCarData] = useState({
        make: '',
        model: '',
        year: '',
        engine: {
            type: '',
            horsepower: ''
        },
        tyres: []
    });

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

    const handleTyreChange = (e, index) => {
        const { name, value } = e.target;
        const updatedTyres = carData.tyres.map((tyre, i) =>
            i === index ? { ...tyre, [name]: value } : tyre
        );
        setCarData((prevData) => ({
            ...prevData,
            tyres: updatedTyres
        }));
    };

    const addTyre = () => {
        setCarData((prevData) => ({
            ...prevData,
            tyres: [...prevData.tyres, { brand: '', pressure: '', position: '' }]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting car data:', carData);
        addNewCar(carData)
            .then((response) => {
                console.log('Car added successfully:', response.data);
                setCarData({
                    make: '',
                    model: '',
                    year: '',
                    engine: {
                        type: '',
                        horsepower: ''
                    },
                    tyres: []
                });
                handleClose();
            })
            .catch((error) => {
                console.error('Error adding car:', error);
            });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Car</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formMake">
                        <Form.Label>Car Company Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="make"
                            value={carData.make}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formModel">
                        <Form.Label>Model</Form.Label>
                        <Form.Control
                            type="text"
                            name="model"
                            value={carData.model}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formYear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                            type="number"
                            name="year"
                            value={carData.year}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formEngineType">
                        <Form.Label>Engine Type</Form.Label>
                        <Form.Control
                            type="text"
                            name="engine.type"
                            value={carData.engine.type}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formEngineHorsepower">
                        <Form.Label>Engine Horsepower</Form.Label>
                        <Form.Control
                            type="number"
                            name="engine.horsepower"
                            value={carData.engine.horsepower}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {carData.tyres.map((tyre, index) => (
                        <div key={index}>
                            <h5 className="mt-3">Tyre {index + 1}</h5>
                            <Form.Group controlId={`formTyreBrand${index}`}>
                                <Form.Label>Brand</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="brand"
                                    value={tyre.brand}
                                    onChange={(e) => handleTyreChange(e, index)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId={`formTyrePressure${index}`}>
                                <Form.Label>Pressure</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="pressure"
                                    value={tyre.pressure}
                                    onChange={(e) => handleTyreChange(e, index)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId={`formTyrePosition${index}`}>
                                <Form.Label>Position</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="position"
                                    value={tyre.position}
                                    onChange={(e) => handleTyreChange(e, index)}
                                    required
                                />
                            </Form.Group>
                        </div>
                    ))}
                    <Button variant="secondary" onClick={addTyre} className="mb-3">
                        Add Tyre
                    </Button>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                            Add Car
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

export default AddCar;
