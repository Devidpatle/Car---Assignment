import { useState, useEffect } from 'react';
import { getAllCars, deleteCar } from '../service/carService';
import Button from 'react-bootstrap/Button';
import AddCar from './AddCar';
import UpdateCar from './UpdateCar'; // Import the UpdateCar component
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import icons from react-icons
import './CarList.css'; // Import custom CSS file for additional styling

const CarList = () => {
    // State for storing the list of cars
    const [cars, setCars] = useState([]);
    // State for controlling the visibility of the add car modal
    const [showModal, setShowModal] = useState(false);
    // State for controlling the visibility of the update car modal
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    // State for storing the selected car to be updated
    const [selectedCar, setSelectedCar] = useState(null);

    // Fetch the list of cars from the API when the component mounts or when the cars state changes
    useEffect(() => {
        getAllCars()
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error('Error fetching cars:', error);
            });
    }, []);

    // Handle the deletion of a car by its ID
    const handleDelete = (id) => {
        deleteCar(id)
            .then(() => {
                setCars(prevCars => prevCars.filter(car => car.id !== id));
            })
            .catch(error => {
                console.error('Error deleting car:', error);
            });
    };

    // Show the add car modal
    const handleShowModal = () => setShowModal(true);
    // Close the add car modal
    const handleCloseModal = () => setShowModal(false);

    // Show the update car modal and set the selected car
    const handleShowUpdateModal = (car) => {
        setSelectedCar(car);
        setShowUpdateModal(true);
    };
    // Close the update car modal
    const handleCloseUpdateModal = () => {
        setSelectedCar(null);
        setShowUpdateModal(false);
    };

    return (
        <Container>
            {/* Header and Add New Car Button */}
            <h1 className="my-4">Car List</h1>
            <Button variant="primary" onClick={handleShowModal} className="mb-4">
                Add New Car
            </Button>

            {/* Add Car Modal */}
            <AddCar show={showModal} handleClose={handleCloseModal} />

            {/* Update Car Modal */}
            {selectedCar && (
                <UpdateCar
                    show={showUpdateModal}
                    handleClose={handleCloseUpdateModal}
                    car={selectedCar}
                    onUpdate={() => {
                        // Reload cars data after updating
                        getAllCars()
                            .then(response => {
                                setCars(response.data);
                            })
                            .catch(error => {
                                console.error('Error fetching cars:', error);
                            });
                    }}
                />
            )}

            {/* Car List in a Grid Layout */}
            <Row>
                {Array.isArray(cars) && cars.map(car => (
                    <Col key={car.id} sm={12} md={6} lg={4} className="mb-4">
                        <Card className="h-100" style={{ backgroundColor: 'rgba(238, 238, 238, 0.87)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                            <Card.Body>
                                <Card.Title className="text-primary">{car.make} {car.model}</Card.Title>
                                <Card.Text>
                                    <strong>Model Year:</strong> {car.year} <br />
                                    <strong>Engine Details:</strong> {car.engine ? `${car.engine.type} (${car.engine.horsepower} HP)` : '-'} <br />
                                    <strong>Tyres Details:</strong>
                                    <ul>
                                        {car.tyres && car.tyres.map(tyre => (
                                            <li key={tyre.id}>
                                                {tyre.position}: (Brand: {tyre.brand}) (Pressure: {tyre.pressure} PSI)
                                            </li>
                                        ))}
                                    </ul>
                                </Card.Text>
                                {/* Action Buttons */}
                                <div className="d-flex justify-content-end">
                                    <Button variant="primary" href={`/cars/${car.id}`} className="mr-3 d-flex align-items-center justify-content-center">
                                        <FaEye /> {/* View Icon */}
                                    </Button>
                                    <Button variant="secondary" onClick={() => handleShowUpdateModal(car)} className="mr-3 d-flex align-items-center justify-content-center">
                                        <FaEdit /> {/* Edit Icon */}
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(car.id)} className="mr-3 d-flex align-items-center justify-content-center">
                                        <FaTrashAlt /> {/* Delete Icon */}
                                    </Button>
                                    </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CarList;

                               
