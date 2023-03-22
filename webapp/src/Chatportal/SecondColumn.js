import React from 'react'
import ChatArea from './ChatArea.js'
import ChatHeader from './ChatHeader.js'
import TypingArea from './TypingArea.js'

function SecondColumn() {
    return (
        <div class="col-4 col-sm-6 col-md-6 col-lg-6 col-xl-8 d-flex flex-column chatSection" style={{padding:"0px"}}>
            <ChatHeader />
            <ChatArea />
            <TypingArea />
        </div>
    )
}

export default SecondColumn
