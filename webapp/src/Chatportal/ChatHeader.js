import React from 'react'

function ChatHeader() {
    return (
        <div class="d-flex flex-row justify-content-center align-items-center" id="chatHeader" style={{height:"70px"}}><i class="fa fa-star" id="userDP"></i>
            <h3 id="userName" style={{marginBottom:"0px"}}>Heading</h3>
        </div>
    )
}

export default ChatHeader
