import React from 'react'
import AccountSettings from './AccountSettings.js'
import SubjectSpec from './SubjectSpec.js'

function FirstColumn(props) {
    return (
        <div class="col-4 col-sm-3 col-md-3 col-lg-3 col-xl-2 subjectSection">
            <AccountSettings userName={props.userName}/>
            <SubjectSpec />
        </div>
    )
}

export default FirstColumn
