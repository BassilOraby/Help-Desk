import React from 'react'
import Jumbotron from './Jumbotron.js'
import SigninForm from './SigninForm.js'

function MainBody() {
    return (
        <div className="MainBody">
            <div class="row mainRow">
                <div class="col-6 hpCol">
                    <Jumbotron />
                </div>
                <div class="col-6 hpCol">
                    <SigninForm />
                </div>
            </div>
        </div>
    )
}

export default MainBody
