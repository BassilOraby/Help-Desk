import React from 'react'

function TypingArea() {
    return (
        <footer id="chatFooter">
            <div class="d-flex flex-column justify-content-center" id="uploadContainer">
                <i class="typcn typcn-upload" id="uploadIcon"></i>
            </div>
            <input type="text" placeholder="Type your message here and hit ENTER to send" id="typingArea"/>
            <button class="btn btn-primary" type="submit" id="sendBtn">Button</button>
        </footer>
    )
}

export default TypingArea
