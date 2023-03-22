import React from 'react'

function AccountSettings(props) {
    return (
        <div class="row" id="accountSection" style={{height:"69px"}}>
            <div class="col-lg-12">
                <i class="fa fa-star DP"></i><input class="form-control-plaintext" type="text" value={`@${props.userName}`} readOnly id="profileName"/>
            </div>
        </div>
    )
}

export default AccountSettings
