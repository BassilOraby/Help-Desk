import React from 'react'
import SubjectItem from './SubjectItem.js'

function SubjectSpec() {
    var Items = []
    for (let index = 0; index < 8; index++) {
        Items.push(<SubjectItem key={index} />);        
    }
    return (
        <div class="row" id="subjectSpecification">
            <div class="col-lg-12" id="col2">
                {Items}
            </div>
        </div>
    )
}

export default SubjectSpec
