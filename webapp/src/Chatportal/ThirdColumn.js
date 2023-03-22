import React from 'react'
import Teacher from './Teacher.js'

function ThirdColumn() {
    var elements = []
    for (let index = 0; index < 20; index++) {
        elements.push(<Teacher key={index} />);
        }
    return (
        <div class="col-4 col-sm-3 col-md-3 col-lg-3 col-xl-2 teacherSection" style={{padding:"0px"}}>
            {elements}
        </div>
    )
}

export default ThirdColumn
