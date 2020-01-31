import React, { useState, useEffect } from 'react';
import './form.styles.css';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


function UserForm ({values, errors, touched, status}) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status]);

    return (
    <div>
        <h1>User Onboarding</h1>
        <Form>

        <Field type='text' name='name' placeholder='Name' className='textInput'/>
        {touched.name && errors.name && <p className='error'>{errors.name}</p>}
        
        <Field type='email' name='email' placeholder='Email' className='textInput'/>
        {touched.email && errors.email && <p className='error'>{errors.email}</p>}

        <Field type='password' name='password' placeholder='Password' className='textInput'/>
        {touched.password && errors.password && <p className='error'>{errors.password}</p>}
 
        <label className="checkbox-container">
            <Field type="checkbox" name="terms" /><br></br>I accept the <span>Terms of Service.</span>
            {touched.terms && errors.terms && <p className='error'>{errors.terms}</p>}
        
        </label>

        <button type="submit">Submit</button>
        </Form>
        {users.map(users => (
            <div key={users.id}>
                <h3>{users.name}</h3>
                    <li>email: {users.email}</li>
                    <li>password {users.password}</li>
                    <li>terms {users.terms}</li>
            </div>
        ))}
        
    </div>
    );
};        
    export const FormikUserForm = withFormik({
        mapPropsToValues({name, email, password, terms}) {
            return {
                name: name || "",
                email: email || "",
                password: password || "",
                terms: terms || false
            }
        },
        
    validationSchema: Yup.object().shape({
        name: Yup.string().min(3,'Name must be at least 3 characters.').required('Name is required.'),
        email: Yup.string().email('Email must be valid.').required('Email is required.'),
        password: Yup.string().min(8,'Password must be at least 8 characters.').required('Password is required.'),
        terms: Yup.boolean().required().oneOf([true], 'Terms is required')
    }),

    handleSubmit(values, {props, setStatus, resetForm }) {
        console.log(props)
        axios
            .post("https://reqres.in/api/users/", values)
            .then(response => {
                setStatus(response.data);
                console.log(response.data);
                resetForm();
            })
            .catch(error => console.log(error.response));
    }
}  
)(UserForm);
