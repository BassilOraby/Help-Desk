import React from 'react'

function Jumbotron() {
    return (
        <div className="JumbotronFile">
            <div class="container jumbContainer">
                <div class="jumbotron welcome" data-aos="fade-up" data-aos-once="true">
                    <h1 class="text-center headText">Welcome to HelpDesk</h1>
                    <p class="text-center wlcmTxt" style={{marginBottom:0 + "px"}}>Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
                    <p class="btnsContainer"><a class="btn btn-link learnMorebtn" role="button" href="#">Learn more</a></p>
                </div>
            </div>
        </div>
    )
}

export default Jumbotron
