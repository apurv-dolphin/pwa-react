import React, { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { Info } from 'react-feather';
import './information.css';

export default function Information(props) {
    const { item } = props;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleClick = () => {
        setShow(true);
    };
    return (
        <>
            <button onClick={handleClick}>
                <Info size={30} />
            </button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{item.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Img variant="top" src={item.small_image.url} />
                        <Card.Body>
                            <Card.Text>
                                <span>SKU : {item.sku}</span>
                                <span>Stock Details : {item.stock_status}</span>
                                <span>
                                    Price :{' '}
                                    {
                                        item.price_range.maximum_price
                                            .final_price.value
                                    }
                                    $
                                </span>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
