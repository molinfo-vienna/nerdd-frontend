import ContactCard from "@/features/contactCard/ContactCard"
import Layout from "./Layout"

export default function ContactPage() {
    return (
        <Layout>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-auto mt-5 pt-5">
                        <div
                            // align-items-center: the error message is centered with respect
                            //   to the icon (if there is no explanation text provided, there is
                            //   not enough text and it looks weird).
                            className="d-flex flex-row align-items-center align-items-center"
                        >
                            <ContactCard />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
