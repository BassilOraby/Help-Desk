import React, {useState, useEffect} from 'react'
import instance from '../axios.js'
import {useNavigate} from 'react-router-dom'

function SignUp(props) {
    const initialValues = {
    userName: '', 
    email: '', 
    password: '', 
    passwordConfirm: '', 
    schoolName: '', 
    mobileNumber: '', 
    birthDate: ''}

    const navigate = useNavigate()

    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormValues({...formValues, [name]: value})
        console.log(formValues)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormErrors(validateForm(formValues))
        setIsSubmit(true)
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            instance.post('/auth/signup', formValues)
            .then(res => navigate('/chatportal', {state:{userName: res.data.userName}}))
            .catch(err => {alert(err.response.data.errorMessage)
                setIsSubmit(false)
            })
        } else {
            setIsSubmit(false)
        }
    }, [formErrors])

    const validateForm = (values) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
        const schoolRegex = /^[A-Za-z\s]*$/
        const isNum = /^\d+$/
        if (!values.userName) {
            errors.userName = "Username is Required !"
        }
        if (!values.email) {
            errors.email =  "Email is required !"
        } else if (!regex.test(values.email)){
            errors.email = "This is not a valid Email !"
        }
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
        if (!values.schoolName) {
            errors.schoolName =  "School Name is required !"
        } else if (!schoolRegex.test(values.schoolName)) {
            errors.schoolName = "Please enter school name in english letters only"
        }
        if (!values.mobileNumber) {
            errors.mobileNumber =  "Mobile Number is required !"
        } else if (!isNum.test(values.mobileNumber)) {
            errors.mobileNumber = "Please enter a correct mobile number"
        }
        if (!values.birthDate) {
            errors.birthDate =  "Birth Date is required !"
        }

        return errors
    }

    return (
        <div className="signUpp">
            <div class="login-clean">
        <form method="post" onSubmit={handleSubmit}>
            <h2 class="sr-only">Login Form</h2>
            <div class="illustration">
                <h2 class="headerTxt">Sign Up</h2>
            </div>
            <div class="form-group"><input class="form-control-plaintext formStaticTxt" type="text" value="Username" readonly=""/><input class="form-control" type="text" name="userName" required="" placeholder="Username" value={formValues.userName} onChange={handleChange}/></div>
            <p style={{color: 'red'}}> { formErrors.userName } </p>
            <div class="form-group"><input class="form-control-plaintext formStaticTxt" type="text" value="E-mail" readonly=""/><input class="form-control" type="email" name="email" required="" placeholder="Email" value={formValues.email} onChange={handleChange}/></div>
            <p style={{color: 'red'}}> { formErrors.email } </p>
            <div class="form-group"><input class="form-control-plaintext" type="text" value="Password" readonly=""/><input class="form-control" type="password" name="password" required="" placeholder="Password" value={formValues.password} onChange={handleChange}/></div>
            <p style={{color: 'red'}}> { formErrors.password } </p>
            <div class="form-group"><input class="form-control-plaintext" type="text" value="Re-confirm password" readonly=""/><input class="form-control" type="password" name="passwordConfirm" required="" placeholder="Password" value={formValues.passwordConfirm} onChange={handleChange}/></div>
            <p style={{color: 'red'}}> { formErrors.passwordConfirm } </p>
            <div class="form-group"><input class="form-control-plaintext" type="text" value="Major (الشعبة)" readonly=""/>
                <div class="dropdown drpdown_parent"><button class="btn btn-primary btn-block dropdown-toggle drpdown_signup" data-toggle="dropdown" aria-expanded="false" type="button">Dropdown </button>
                    <div class="dropdown-menu" role="menu"><a class="dropdown-item" role="presentation" href="google.com">First Item</a><a class="dropdown-item" role="presentation" href="google.com">Second Item</a><a class="dropdown-item" role="presentation" href="google.com">Third Item</a></div>
                </div>
            </div>
            <div class="form-group"><input class="form-control-plaintext" type="text" value="School" readonly=""/><input class="form-control" type="text" name="schoolName" required="" placeholder="School" value={formValues.schoolName} onChange={handleChange}/></div>
            <p style={{color: 'red'}}> { formErrors.schoolName } </p>
            <div class="form-group"><input class="form-control-plaintext" type="text" value="Mobile Number" readonly=""/><input class="form-control" type="tel" name="mobileNumber" required="" placeholder="Mobile Number" value={formValues.mobileNumber} onChange={handleChange}/></div>
            <p style={{color: 'red'}}> { formErrors.mobileNumber } </p>
            <div class="form-group"><input class="form-control-plaintext" type="text" value="Birth date" readonly=""/><input class="form-control" type="date" name="birthDate" required="" value={formValues.birthDate} onChange={handleChange}/></div>
            <p style={{color: 'red'}}> { formErrors.birthDate } </p>
            <div class="form-group"><button class="btn btn-outline-primary btn-block signupBtn" type="submit">Sign Up</button></div>
        </form>
    </div>
        </div>
    )
}

export default SignUp
