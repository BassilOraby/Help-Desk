import React from 'react'

function SubjectItem() {
    return (
        <div class="d-inline-flex flex-row align-items-center" id="subject"><i class="fa fa-star" id="subjectIcon"></i>
            <div id="subjectName">
                <h6 class="text-nowrap text-truncate text-capitalize d-inline" id="subjectliterlas" style={{fontFamily:"Alike, serif"}}>Physics</h6>
            </div>
        </div>
    )
}

export default SubjectItem
