import './Settings.css';

import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NotificationManager } from "react-notifications";

import { useApi } from "../utilites/ApiProvider.tsx";
import { useSession } from "../utilites/Session.jsx";



const ChangePasswordView = () => {
    const api = useApi();
    const { isAuthenticated } = useSession();

    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [newName, setNewName] = useState("");

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleNewNameChange = (e) => {
        setNewName(e.target.value);
    }

    const handlePasswordConfirmationChange = (e) => {
        setPasswordConfirmation(e.target.value);
    };

    const onSubmit = () => {
        if (password !== passwordConfirmation) {
            NotificationManager.error("Password and Password Confirmation should match", "Password Error");
        } else if (password.length < 6) {
            NotificationManager.error("Password should have more then or equal 6 symbols", "Password Error");
        } else {
            api.put(`change_password/`, { 
                new_password: password
            }).then(NotificationManager.success("Password update was successful.", "Password Update"))
        }
    }

    const onNameSubmit = () => {
        if (newName.length < 2) {
            NotificationManager.error("Name should be atleast 2 charexter long", "New Username Error");
        } else {
            api.put(`change_name/`, { 
                new_name: newName
            }).then(NotificationManager.success("Name update was successful", "Name Update"))
        }
    }

    return (
        <>
            { isAuthenticated() && 
                <>
                    <div className='content-block mb-4 pb-4'>
                        <div className='table-header mb-1'>Change Username</div>
                        <div className='form-container col-12'>
                            <Form>
                                <div className='d-flex flex-md-row flex-column py-2 
                                                justify-content-center align-items-center '>
                                    <Form.Group className="col-xl-3 col-md-4 col-sm-6 col-8 mx-2 mx-xl-3"
                                                controlId="changeName">
                                        <Form.Control type="text" placeholder="New Name"
                                                      onChange={ handleNewNameChange }/>
                                    </Form.Group>

                                    <Button type="button" className='col-md-2 col-sm-3 col-4 mx-xl-3 mx-2'
                                            onClick={ onNameSubmit }>Change</Button>

                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className='content-block mb-4 pb-4'>
                        <div className='table-header mb-1'>Change password</div>
                        <div className='form-container col-12'>
                            <Form>
                                <div className='d-flex flex-md-row flex-column py-2 
                                                justify-content-center align-items-center '>
                                    <Form.Group className="col-xl-3 col-md-4 col-sm-6 col-8 mx-2 mx-xl-3"
                                                controlId="changePassword">
                                        <Form.Control type="password" placeholder="New password"
                                                      onChange={ handlePasswordChange }/>
                                    </Form.Group>

                                    <Form.Group className="col-xl-3 col-md-4 col-sm-6 col-8 mx-2 mx-xl-3 my-md-0 my-3 "
                                                controlId="changePasswordConfirmation">
                                        <Form.Control type="password" placeholder="Repeat new password"
                                                      onChange={ handlePasswordConfirmationChange }/>
                                    </Form.Group>

                                    <Button type="button" className='col-md-2 col-sm-3 col-4 mx-xl-3 mx-2'
                                            onClick={ onSubmit }>Change</Button>

                                </div>
                            </Form>
                        </div>
                    </div>
                </>
            }

            { !isAuthenticated() && 
                <div className="d-flex mt-5 justify-content-center">
                   <span className="no-data-found">No Data Found</span>
               </div>
            }

        </>
    )
};


class Settings extends React.Component {
    render() {
        return (
            <div className='container-fluid ps-lg-4 p-0'>
                <div className='content settings-template'>
                    <ChangePasswordView />
                </div>
            </div>
        )
    }
}
export default Settings;