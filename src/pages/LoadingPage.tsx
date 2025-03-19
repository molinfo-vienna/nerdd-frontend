import Layout from "./Layout"

export default function LoadingPage() {
    return (
        <Layout>
            <div className="d-flex flex-fill align-items-center justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </Layout>
    )
}
