import React, {useEffect, useState} from 'react';
import './Home.css';
import NavBar from '../NavBar/NavBar';
import {Button, Card, Form, FormControl} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Home = () => {
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        fetch('https://limitless-forest-22410.herokuapp.com/organizations')
        .then(res => res.json())
        .then(data => setOrganizations(data))
    }, [])

    return (
        <>
        <NavBar />

        <div className="topbar">
            <h1 className="text-center mb-4">I grow by helping people in need.</h1>
            <Form inline className="justify-content-center">
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-primary">Search</Button>
            </Form> 
        </div>

        <div className="container">
            <div className="row">
                {
                        organizations.map(work =>
                        <div key={work._id} className="col-md-3 col-sm-6 col-xs-12 mb-3">
                            <Link to={`/vregistration/${work._id}`}>
                            <Card style={{ width: '18rem'}}>
                            <Card.Img variant="top" src={work.photo} />
                            <Card.Body className='card-body'>
                              <Card.Title>{work.title}</Card.Title>
                            </Card.Body>
                          </Card> 
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
        </>
    );
};

export default Home;