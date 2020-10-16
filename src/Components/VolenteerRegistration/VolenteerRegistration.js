import React, {useContext, useEffect, useState} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import {UserContext} from '../../App';
import NavBar from '../NavBar/NavBar';
import './VolenteerRegistration.css'

const VolenteerRegistration = () => {
    const {id} = useParams();
    let history = useHistory();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('https://limitless-forest-22410.herokuapp.com/organizations/'+id)
            .then(res => res.json())
            .then(data => {
                const newUser = {...user};
                newUser.photo = data.photo;
                newUser.organization = data.title;
                setUser(newUser);
            })
    }, [])

    const [user, setUser] = useState({
        name: loggedInUser.name,
        email: loggedInUser.email,
        photo: '',
        date: '',
        description: '',
        organization: ''
    })

    const handleBlur = (e) => {
        const newUser = {...user};
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
    }

    const handleSubmit = (e) => {
        fetch('https://limitless-forest-22410.herokuapp.com/addEvents', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
            .then(res => {
                if(res.status === 200){
                    alert('Registration successful!');
                    history.push('/event');
                }
            })

        e.preventDefault();
    }
    
    
    return (
        <>
            <div className="text-center mt-4">
                <NavBar />
            </div>
            <section className="register-section mt-5 mb-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="registerAsVolunteer">
                            <h2 className="text-center">Register as volunteer</h2>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <input className="form-control" onBlur={handleBlur} type="text" name="name" id="" placeholder="Full Name" defaultValue={loggedInUser.name} disabled/>
                                <br />
                                <input className="form-control" onBlur={handleBlur} type="email" name="email" id="" placeholder="Email" defaultValue={loggedInUser.email} disabled/>
                                <br />
                                <input className="form-control" onBlur={handleBlur} type="date" name="date" id="" required />
                                <br />
                                <input className="form-control" onBlur={handleBlur} type="text" name="description" id="" placeholder="Description" required />
                                <br />
                                <input className="form-control" onBlur={handleBlur} type="text" name="organization" id="" placeholder="Organization" defaultValue={user.organization} />
                                <br />
                                    <button type="submit" className="btn btn-primary mb-4">Registration</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default VolenteerRegistration;