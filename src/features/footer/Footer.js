import React from "react"
import { Link } from "react-router-dom"
import { moduleType } from "../../types"
import FooterLink from "./FooterLink"

export default function Footer({ module }) {
    //
    // decide which partners to show
    //

    // landing page: show default partners (Vienna, Hamburg)
    const defaultPartners = [
        { name: "University of Vienna", logo: "/images/logo_vienna.gif" },
        { name: "University of Hamburg", logo: "/images/logo_hamburg.gif" },
    ]

    // module page: show module partners
    const partners = module?.partners ?? defaultPartners

    return (
        <footer className="bd-footer text-body-secondary">
            {/*
             * border-top: a line to separate footer from content
             * py-4: space between line and content
             * px-4: same space to left and right edge as module list on landing page
             *
             * xl: Space(1) + NERDD(3) + Space(1) + 3 * Links(2) + Space(1)
             *     Space(5) + Partners(6) + Space(1)
             * lg: NERDD(3) + 3*Links(3)
             *     Space(3) + Partners(9)
             * md: NERDD (3) + 3*Links(3)
             *     Space(3) + Partners(9)
             * sm: NERDD (12)
             *     3*Links(4)
             *     Partners(12)
             * xs: stacked
             */}
            <div className="container border-top py-4 px-4 py-md-5 mt-5">
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-3 offset-xl-1 mb-3">
                        <h5 className="mb-3">NERDD</h5>
                        <ul className="list-unstyled">
                            <li>
                                <span className="fs-5">
                                    Next-gen E-Resource for Drug Discovery
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-3 offset-xl-1 col-sm-4 mb-3">
                        <h5 className="mb-3">About</h5>
                        <ul className="list-unstyled">
                            <FooterLink
                                icon="FaPeopleGroup" // PeopleFill
                                title="COMP3D Group"
                                url="https://comp3d.univie.ac.at/the-comp3d-team/"
                            />
                            <FooterLink
                                icon="FaLock" // LockFill
                                title="Privacy Policy"
                                url="https://dsba.univie.ac.at/en/data-protection-declaration/"
                            />
                            <FooterLink
                                icon="FaShield" // ShieldFillCheck
                                title="Legal Notice"
                                url="https://pharmazie.univie.ac.at/impressum/"
                            />
                            <FooterLink
                                icon="FaEnvelope" // ChatDotsFill
                                title="Contact"
                                url="/contact"
                            />
                        </ul>
                    </div>
                    {/*
                     * We have to align the last column to the right to make it look
                     * good on large screens. But then, the space between middle and
                     * last link column is too large. So we center the middle column.
                     */}
                    <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 mb-3 text-md-center">
                        <div className="d-inline-block text-start">
                            <h5 className="mb-3">Links</h5>
                            <ul className="list-unstyled">
                                <FooterLink
                                    icon="FaBookOpen" // BookFill
                                    title="Documentation"
                                    url="/docs"
                                />
                                <FooterLink
                                    icon="FaPlug" // PlugFill
                                    title="Developer API"
                                    url="/api"
                                />
                                <FooterLink
                                    icon="FaBook" // BookmarksFill
                                    title="How to cite"
                                    url="/cite"
                                />
                            </ul>
                        </div>
                    </div>
                    {/*
                     * We have to align the last column to the right to make it look
                     * good on large screens (text-md-end). The content should still
                     * be left-aligned and so we create an inner div with text-start.
                     */}
                    <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 mb-3 text-md-end">
                        <div className="d-inline-block text-start">
                            <h5 className="mb-3">Code</h5>
                            <ul className="list-unstyled">
                                <FooterLink
                                    icon="FaSitemap" // Diagram3Fill
                                    title="Architecture"
                                    url="/architecture"
                                />
                                <FooterLink
                                    icon="FaWindowMaximize" // LaptopFill
                                    title="Frontend"
                                    url="/frontend"
                                />
                                <FooterLink
                                    icon="FaDatabase" // DatabaseFill
                                    title="Backend"
                                    url="/backend"
                                />
                                <FooterLink
                                    icon="FaGear" // GearFill
                                    title="NERDD Module"
                                    url="/module"
                                />
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-7 col-md-9 offset-xl-5 offset-md-3">
                        <h5 className="mb-3">Partners</h5>
                        <div className="d-flex flex-wrap justify-content-start">
                            {partners.map((partner, i) => (
                                <div
                                    className={`align-self-center text-sm-center`}
                                    style={{
                                        width: "33%",
                                    }}
                                    key={i}
                                >
                                    <Link to={partner.url}>
                                        <img
                                            src={partner.logo}
                                            alt={partner.name}
                                            className="img-fluid"
                                            style={{
                                                maxHeight: "5rem",
                                            }}
                                        />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

Footer.propTypes = {
    module: moduleType,
}
