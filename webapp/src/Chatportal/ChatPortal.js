import React from "react"
import { useLocation } from "react-router-dom"
import FirstColumn from './FirstColumn.js'
import SecondColumn from "./SecondColumn.js"
import ThirdColumn from "./ThirdColumn.js"

function ChatPortal() {
    const location = useLocation()
    return(
        <div className='chat-portal'>
            <div className="mainPage">
                 <div class="container-fluid" id="chatPortal">
                    <div class="row" id="sectionsContainer">
                        <FirstColumn userName={location.state == null ? "Annonymous" : location.state.userName}/>
                        <SecondColumn />
                        <ThirdColumn />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatPortal