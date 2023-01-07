import './MainNavbar.css';

import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';

import { useSession } from "../utilites/Session.jsx";

import { IHome, ISettings, ILogout, ILogin, IRegistration, ISearch } from "./Icons";
import { NotificationManager } from 'react-notifications';


const RegisterForm = () => {
    const { signup } = useSession();
    const emailRegex = /^\S+@\S+$/;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const handleNameChange = (e) => {
       setName(e.target.value);
    };

    const handleEmailChange = (e) => {
       setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
       setPassword(e.target.value);
    };

    const handlePasswordConfirmationChange = (e) => {
       setPasswordConfirmation(e.target.value);
    };

    const clearData = () =>{
       setName("");
       setEmail("");
       setPassword("");
       setPasswordConfirmation("");
    }
    
    const handleSubmit = () => {
        if (password !== passwordConfirmation) {
            NotificationManager.error("Password and Password Confirmation should match", "Password Error")
        } else if (password.length < 6) {
            NotificationManager.error("Password should have more then or equal 6 symbols", "Password Error")
        } else if(!email.match(emailRegex)){
            NotificationManager.error("Email should be like example@test.com", "Email Error")
        } else if(name.length < 2){
            NotificationManager.error("Name should have more then or equal 2 symbols", "Name Error")
        } else {
            signup({ name: name, email: email, password: password })
                .then(handleHide())
                .then(clearData())
                .then(NotificationManager.success("Registration Success", "Welcome"));
        }
    };

    const [showFlag, setShowFlag] = useState(false);

    const handleHide = () => setShowFlag(false);
    const handleShow = () => setShowFlag(true);

    return (
        <div className="popup-container">

            <Button className="nav-link" onClick={ handleShow }>
                <IRegistration width='24' height='24'/><span>Register</span>
            </Button>

            <Modal centered show={ showFlag } onHide={ handleHide }>
                <Form>
                    <Modal.Header closeButton closeVariant='white'>
                        <Modal.Title>Registration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formRegisterName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" 
                                value={ name } onChange={ handleNameChange }/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formRegisterEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Email" 
                                value={ email } onChange={ handleEmailChange }/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formRegisterPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" 
                                value={ password } onChange={ handlePasswordChange }/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formRegisterPasswordConfirmation">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Repeat Password" 
                                value={ passwordConfirmation } onChange={ handlePasswordConfirmationChange }/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className='d-flex justify-content-center'>
                        <Button className='popup-btn col-4 py-2' onClick={ handleSubmit }>
                            Sign Up
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </div>
   )
}


const LoginForm = () => {
   const { login } = useSession();
   const [password, setPassword] = useState("");
   const [email, setEmail] = useState("");
   const emailRegex = /^\S+@\S+$/;

   const handleEmailChange = (e) => {
       setEmail(e.target.value);
   };

   const handlePasswordChange = (e) => {
       setPassword(e.target.value);
   }

   const clearData = () =>{
       setEmail("")
       setPassword("")
   }

   const handleSubmit = () => {
       if (password.length < 0)
       {
           NotificationManager.error("Password must present", "Password Error")
       }
       else if(!email.match(emailRegex)){
           NotificationManager.error("Email should be like example@test.com", "Email Error")
       }
       else {
            login({ email: email, password: password })
                .then(handleHide())
                .then(clearData())
                .then(NotificationManager.success("Login Success", "Welcome"))
       }
   };

   const [showFlag, setShowFlag] = useState(false);

    const handleHide = () => setShowFlag(false);
    const handleShow = () => setShowFlag(true);

    return (
       <div className="popup-container">

            <Button className="nav-link" onClick={ handleShow }>
                <ILogin width='24' height='24'/><span>Log In</span>
            </Button>

            <Modal centered show={ showFlag } onHide={ handleHide }>
                <Form>
                    <Modal.Header closeButton closeVariant='white'>
                       <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       <Form.Group className="mb-3" controlId="formLoginEmail">
                           <Form.Label>Email address</Form.Label>
                           <Form.Control type="email" placeholder="Enter email" 
                                onChange={ handleEmailChange } />
                       </Form.Group>

                       <Form.Group className="mb-3" controlId="fromLoginPassword">
                           <Form.Label>Password</Form.Label>
                           <Form.Control type="password" placeholder="Password" 
                                onChange={ handlePasswordChange }/>
                       </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className='d-flex justify-content-center'>
                       <Button className='popup-btn col-4 py-2' onClick={ handleSubmit }>
                           Sign In
                       </Button>
                    </Modal.Footer>
                </Form>
            </Modal>    

        </div>
   )
}


const NavbarMenu = (props) => {
    const { isAuthenticated, logout } = useSession();

    return (
        <Navbar className="c-navbar d-flex align-items-start" variant="dark">
            <div className="d-flex flex-column ">

                <Link to='/' className='navbar-brand' onClick={ props.onClick }>UFlix</Link>

                <Nav className="d-flex flex-column" onClick={ props.onClick }>

                    <NavLink to='/home' className='nav-link d-flex align-items-center'>
                        <IHome width='24' height='24' /><span>Home</span>
                    </NavLink>

                    <NavLink to='/search' className='nav-link d-flex align-items-center'>
                        <ISearch width='24' height='24' /><span>Search</span>
                    </NavLink>

                    { isAuthenticated() &&
                        <NavLink to='/settings' className='nav-link d-flex align-items-center'>
                            <ISettings width='24' height='24' /><span>Settings</span>
                        </NavLink> 
                    }
                    
                    { isAuthenticated() &&
                        <Button className='nav-link d-flex align-items-center' 
                            type='button' onClick={ logout }>
                            <ILogout width='24' height='24' /><span>Log Out</span>
                        </Button>
                    }

                    { !isAuthenticated() &&
                        <div className='d-flex flex-column'>
                            <RegisterForm />
                            <LoginForm />
                        </div>
                    }
                    
                </Nav>

            </div>
        </Navbar>
    )
}


const Sidebar = () => {
    const [sidebarFlag, setSidebarFlag] = useState(false);
    const showSidebar = () => setSidebarFlag(true);
    const hideSidebar = () => setSidebarFlag(false);

    return (
        <div className={sidebarFlag ? "sidebar active" : "sidebar"}>
            <Button className="hamburger shadow-none d-flex flex-column justify-content-around" type="button"
                    onClick={ sidebarFlag ? hideSidebar : showSidebar }>
                <div></div>
            </Button>
            <div className='pt-3 ps-3'>
                <NavbarMenu onClick={ hideSidebar } />
            </div>
        </div>
    );
}


class MainNavbar extends React.Component {
    render() {
        return (
            <>
                <div className='d-lg-block d-none'>
                    <NavbarMenu />
                </div>

                <div className='d-lg-none d-block'>
                    <Sidebar />
                </div>
            </>
        )
    }
}

export default MainNavbar;