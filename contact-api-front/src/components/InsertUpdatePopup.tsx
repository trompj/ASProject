// InsertUpdatePopup
// Justin Tromp
// Popup for both insert new contact and update a current contact. Which one displays depends on whether entity
// id being passed in is null or not.
// TODO: - Set form values with values already in data set and add additional validation in both back end and front end
//         as you can currently only make requests with all fields, which is intended, although it is not entirely
//         handled as desired.

import '../styles/InsertUpdatePopup.css';
import { Button, Form } from "react-bootstrap";
import * as React from "react";

// Starting form data
const initialFormData = Object.freeze({
    firstName: "",
    lastName: "",
    emailAddress: ""
});


// @ts-ignore
// TODO: - Fix ts lint issue and assign values
export const InsertUpdatePopup = ({ handleClose, show, id }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    // Insert new row into contacts table
    function insertRow(row: any) {
        // Set POST request for contacts and make request
        const postReqOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(row),
        };

        fetch('http://localhost:3000/api/contacts', postReqOptions)
            .then(res => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch(console.log);
    }

    // Insert new row into contacts table
    function updateRow(row: any) {
        // Set POST request for contacts and make request
        const postReqOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(row),
        };

        fetch(`http://localhost:3000/api/contacts/${id}`, postReqOptions)
            .then(res => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch(console.log);
    }

    // Use state and handle methods to keep track of form data upon submission
    const [formData, updateFormData] = React.useState(initialFormData);

    const handleChange = (event: any) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [event.target.name]: event.target.value.trim()
        });
    };

    const handleInsert = (event: any) => {
        insertRow(formData);
    };

    const handleUpdate = (event: any) => {
        updateRow(formData);
    };

    return (
        <div className={showHideClassName}>
                <section className="modal-main p-3">
                    <Form>
                        <Form.Group controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control name="firstName" type="text" placeholder="Bob" onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control name="lastName" type="text" placeholder="Smith" onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group controlId="emailAddress">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control name="emailAddress" type="email" placeholder="example@gmail.com" onChange={handleChange}/>
                        </Form.Group>

                        {/*Conditionally render button type depending on if this is an update or creation*/}
                        {id == null &&
                            <Button variant="primary" type="submit" onClick={handleInsert}>Submit</Button>
                        }
                        {id != null &&
                            <Button variant="primary" type="submit" onClick={handleUpdate}>Update</Button>
                        }

                        {/*TODO: - Closing popup causes entire table to refresh, this should be changed in future release.*/}
                        <Button className="ml-2" variant="primary" type="submit" onClick={() => {show = false}}>Close</Button>

                    </Form>
                </section>

        </div>
    );
};