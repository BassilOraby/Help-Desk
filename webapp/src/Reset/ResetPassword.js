import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import instance from '../axios.js'
import {useNavigate} from 'react-router-dom'

function ResetPassword(props) {
    const {token} = useParams()
    
    const initialValues = {
    password: '', 
    passwordConfirm: '',
    token: token
}

    const navigate = useNavigate()
    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormValues({...formValues, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormErrors(validateForm(formValues))
        setIsSubmit(true)
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            instance.put('/auth/new-password', formValues)
            .then(res => {
                alert(res.data.message)
            })
            .catch(err => {alert(err.response.data.error)
                setIsSubmit(false)
            })
        } else {
            setIsSubmit(false)
        }
    }, [formErrors])

    const validateForm = (values) => {
        const errors = {}

        if (!values.password) {
            errors.password =  "Password is required !"
        } else if (values.password.length < 4){
            errors.password = "Password must be more than 4 characters"
        } else if (values.password.length > 10){
            errors.password = "Password must not exceed 10 characters"
        }
        if (!values.passwordConfirm) {
            errors.passwordConfirm =  "Password Confirmation is required !"
        } else if (values.passwordConfirm !== values.password) {
            errors.passwordConfirm =  "Password Confirmation does not match !"
        }

        return errors
    }

    return (
        <div className="signUpp">
            <div class="login-clean">
        <form method="post" onSubmit={handleSubmit}>
            <div class="illustration">
                <h2 class="headerTxt">Reset Password</h2>
            </div>
            <div class="form-group"><input class="form-control-plaintext formStaticTxt" type="text" value="New Password" readonly=""/><input class="form-control" type="password" name="password" required="" placeholder="New Password" value={formValues.password} onChange={handleChange}/></div>
            <p style={{color: 'red'}}> { formErrors.password } </p>
            <div class="form-group"><input class="form-control-plaintext" type="text" value="Re-confirm password" readonly=""/><input class="form-control" type="password" name="passwordConfirm" required="" placeholder="Re-Confirm Password" value={formValues.passwordConfirm} onChange={handleChange}/></div>
            <p style={{color: 'red'}}> { formErrors.passwordConfirm } </p>
            <div class="form-group"><button class="btn btn-outline-primary btn-block signupBtn" type="submit">Confirm Reset</button></div>
        </form>
    </div>
        </div>
    )
}

export default ResetPassword