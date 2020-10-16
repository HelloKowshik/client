import React, {useContext} from 'react';
import {Button, Nav, Navbar} from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom';
import {UserContext} from '../../App';

const NavBar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    return (
        <Navbar>
            <Navbar.Brand>
                <Link to="/">
                    <img style={{width:"202px", height: '60px'}} src="https://i.ibb.co/C1cQTyY/Group-1329.png" alt=""/>
                </Link>
            </Navbar.Brand>
            <Nav className="ml-auto">
                <Navbar.Brand><Link to="/home">Home</Link></Navbar.Brand>
                <Navbar.Brand><Link to="/event">My Events</Link></Navbar.Brand>
                {
                    loggedInUser.email? <Link to="/login">
                        <Button variant="primary" className="ml-2 mr-2" onClick={() => {
                            setLoggedInUser({})
                            history.push('/home');
                    }}>Log Out</Button>
                </Link> :<Nav.Link>Blog</Nav.Link>
                }
                {
                    loggedInUser.email ? <p className="ml-2 mt-2"><strong>{loggedInUser.name}</strong></p> : 
                    <>
                        <Link to="/login">
                            <Button variant="primary" className="ml-2 mr-2">Register</Button>
                        </Link>
                        <Link to="/admin">
                            <Button variant="dark" className="ml-2">Admin</Button>
                        </Link>
                    </>
                }
            </Nav>
        </Navbar>
    );
};

export default NavBar;