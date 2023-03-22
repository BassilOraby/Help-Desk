import React, { useState, useEffect } from 'react'
import instance from '../axios.js'
import jwt_decode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'

function SigninForm() {

    /*function handleCallbackResponse(res) {
        console.log("Encoded JWT ID token: " + res.credential)
        console.log(jwt_decode(res.credential))
      }
    
      useEffect(() => {
        // google global header for eslint
        google.accounts.id.initialize({
          client_id: "788964473567-tj0kaucvsqdb29rdv584mekdta1cqc4u.apps.googleusercontent.com",
          callback: handleCallbackResponse
        })
    
        google.accounts.id.renderButton(
          document.getElementById("social"),
          { width: "70px" }
        )
      }, [])*/

    const initialLoginValues = { 
        email: '', 
        password: '' 
    }

    const navigate = useNavigate()

    const [formValues, setFormValues] = useState(initialLoginValues)
    const [isLoginSubmit, setIsLoginSubmit] = useState(false)
    const [resetEmail, setResetEmail] = useState('')
    const [isResetSubmit, setIsResetSubmit] = useState(false)

    const handleLoginChange = (e) => {
        const {name, value} = e.target
        setFormValues({...formValues, [name]: value})
        console.log(formValues)
    }

    const handleResetChange = (e) => {
        const {value} = e.target
        setResetEmail(value)
        console.log(value)
    }

    const handleResetSubmit = (e) => {
        e.preventDefault()
        setIsResetSubmit(true)
    }

    const handleSignupClick = (e) => {
        e.preventDefault()
        navigate('/signup')
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        setIsLoginSubmit(true)
    }


    useEffect(() => {
        if (isLoginSubmit) {
            instance.post('/auth/login', formValues)
            .then(res => navigate('/chatportal', {state:{userName: res.data.userName}}))
            .catch(err => {alert(err.response.data.errorMessage)
            setIsLoginSubmit(false)
            })
        }
        if (isResetSubmit) {
            console.log(resetEmail)
            instance.post('/auth/reset-password', {email: resetEmail})
            .then(res => alert(res.data.message))
            .catch(err => {alert(err.response.data.error)})
            setIsResetSubmit(false)
        }
    }, [isLoginSubmit, isResetSubmit])

    return (
        <div className="signInForm">
            <div class="container">
        <div id="logreg-forms">
        <form class="form-signin" onSubmit={handleLoginSubmit}>
            <h1 class="h3 mb-3 font-weight-normal" style={{textAlign: 'center'}}> Sign in</h1>
            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" name="email" value={formValues.email} onChange={handleLoginChange} required="" autofocus=""/>
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" name="password" value={formValues.password} onChange={handleLoginChange} required=""/>
            
            <button class="btn btn-success btn-block" type="submit"><i class="fas fa-sign-in-alt"></i> Sign in</button>
            <a href="#" id="forgot_pswd">Forgot password?</a>
            <hr/>
            <p>Don't have an account!</p>
            <button class="btn btn-primary btn-block" type="button" id="btn-signup" onClick={handleSignupClick}><i class="fas fa-user-plus"></i> Sign up New Account</button>
        </form>

            <form action="/reset/password/" class="form-reset">
                <input type="email" id="resetEmail" class="form-control" placeholder="Email address" required="" autofocus="" value={resetEmail} onChange={handleResetChange} />
                <button class="btn btn-primary btn-block" type="submit" onClick={handleResetSubmit}>Reset Password</button>
                <a href="#" id="cancel_reset"><i class="fas fa-angle-left"></i> Back</a>
            </form>
            
            <form action="/signup/" class="form-signup">
                <div class="social-login">
                    <button class="btn facebook-btn social-btn" type="button"><span><i class="fab fa-facebook-f"></i> Sign up with Facebook</span> </button>
                </div>
                <div class="social-login">
                    <button class="btn google-btn social-btn" type="button"><span><i class="fab fa-google-plus-g"></i> Sign up with Google+</span> </button>
                </div>
                
                <p style={{textAlign: 'center'}}>OR</p>

                <input type="text" id="user-name" class="form-control" placeholder="Full name" required="" autofocus=""/>
                <input type="email" id="user-email" class="form-control" placeholder="Email address" required autofocus=""/>
                <input type="password" id="user-pass" class="form-control" placeholder="Password" required autofocus=""/>
                <input type="password" id="user-repeatpass" class="form-control" placeholder="Repeat Password" required autofocus=""/>

                <button class="btn btn-primary btn-block" type="submit"><i class="fas fa-user-plus"></i> Sign Up</button>
                <a href="#" id="cancel_signup"><i class="fas fa-angle-left"></i> Back</a>
            </form>
            <br/>
            
    </div>
    
</div>
        </div>
    )
}

export default SigninForm
