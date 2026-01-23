import { FaMapMarkedAlt } from "react-icons/fa"
import { FaEnvelope } from "react-icons/fa6"
import "./ContactCard.scss"

export default function ContactCard() {
    return (
        <div className="card contact-card bg-primary-subtle border-0 h-100 pt-2 mb-3 mx-auto overflow-hidden text-decoration-none">
            <div className="card-body pt-1">
                <div className="card-text p-4">
                    <h1>Contact Information</h1>
                    <ul className="list-unstyled m-0 mt-4">
                        <li className="d-flex align-items-start gap-2 mb-2">
                            <span className="contact-icon me-1">
                                <FaEnvelope size={30} />
                            </span>
                            <a
                                className="contact-text"
                                href="mailto:comp3d.pharmacy@univie.ac.at"
                            >
                                comp3d.pharmacy@univie.ac.at
                            </a>
                        </li>
                        <li className="d-flex align-items-start gap-2">
                            <span className="contact-icon me-1">
                                <FaMapMarkedAlt size={30} />
                            </span>
                            <span className="contact-text">
                                Division of Pharmaceutical Chemistry, University
                                of Vienna, Josef-Holaubek-Platz 2 (UZA II), 1090
                                Vienna, Austria
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
