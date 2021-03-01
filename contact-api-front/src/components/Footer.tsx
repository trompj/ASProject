// Footer
// Page footer elements with social and contact icons
// TODO: - Add functionality to icons with relevant accounts or different accounts where necessary

import {Component} from "react";
import { FaFacebookSquare, FaEnvelope, FaInstagram } from 'react-icons/fa'
import { IconContext } from "react-icons";
import * as React from "react";
import "../styles/Navigation.css"

class Footer extends Component {
    render() {
        return(
            <div>
                <footer className="footer bg-dark">
                    <div className="d-flex flex-row footer-div">
                        <div className="icon">
                            <a href="/" target="_blank">
                                <IconContext.Provider value={{ size: "1.25em", color: "white" }}>
                                    <div>
                                        <FaEnvelope />
                                    </div>
                                </IconContext.Provider>
                            </a>
                        </div>
                        <div className="icon">
                            <a href="/" target="_blank" id="linked-in">
                                <IconContext.Provider value={{ size: "1.25em", color: "white" }}>
                                    <div>
                                        <FaFacebookSquare />
                                    </div>
                                </IconContext.Provider>
                            </a>
                        </div>
                        <div className="icon">
                            <a href="/" target="_blank" id="linked-in">
                                <IconContext.Provider value={{ size: "1.25em", color: "white" }}>
                                    <div>
                                        <FaInstagram />
                                    </div>
                                </IconContext.Provider>
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Footer;