import { File } from "@/features/fileUpload/fileFieldSlice"
import { type Module } from "@/types"
import { FORM_ERROR, FormApi } from "final-form"
import { useCallback, useEffect, useRef, useState } from "react"
import { Field, Form } from "react-final-form"
import { FaPaperPlane } from "react-icons/fa6"
import DynamicInput from "./DynamicInput"
import JobParameterField from "./JobParameterField"
import Row from "./Row"

type JobFormValues = {
    inputType: "text" | "file" | "draw" | "example"
    input?: string
    inputFile?: File[]
    inputDrawn?: string
} & Record<string, any>

export type SubmitHandler = (
    values: JobFormValues,
) => Promise<Record<string, string> | undefined>

type JobFormProps = {
    module: Module
    onSubmit: SubmitHandler
}

export default function JobForm({ module, onSubmit }: JobFormProps) {
    // When the user clicks on the submit button, we have to make sure to upload all
    // files before submitting the form to server. For that we introduce two state variables:
    // * formPending indicates whether files are still being uploaded (formPending)
    // * submitRequested indicates whether the user has clicked the submit button
    // Below we have code that submits the form only when formPending is false and submitRequested
    // is true.
    const [formPending, setFormPending] = useState(false)
    const [submitRequested, setSubmitRequested] = useState(false)

    // we need to keep a reference to the form instance in order to trigger the submit
    // programmatically
    const formRef = useRef<FormApi<JobFormValues> | null>(null)

    //
    // Validation
    //
    const validate = useCallback(
        (values: JobFormValues) => {
            const errors: Record<string, string> = {}

            // input
            if (values.inputType === "text") {
                if (!values.input || values.input.trim().length === 0) {
                    errors.input = "Required"
                }
            } else if (values.inputType === "file") {
                if (!values.inputFile || values.inputFile.length === 0) {
                    errors.inputFile = "Required"
                }
            } else if (values.inputType === "draw") {
                if (!values.inputDrawn || !values.inputDrawn) {
                    errors.inputDrawn = "Required"
                }
            }

            // job parameters
            for (const jobParameter of module.jobParameters) {
                if (jobParameter.required && !values[jobParameter.name]) {
                    errors[jobParameter.name] = "Required"
                }
            }

            // wait for file uploads to finish
            if (
                values.inputType === "file" &&
                values.inputFile !== undefined &&
                // all files uploaded?
                values.inputFile.filter((file) =>
                    ["pending", "deleting"].includes(file.status),
                ).length > 0
            ) {
                // We are setting an error on a pseudo field that doesn't exist in the form.
                // This will not be displayed in the form, but it keeps the form from getting
                // submitted.
                errors[FORM_ERROR] = "Waiting for file uploads to finish..."

                // indicate that form is not ready
                setFormPending(true)
            } else {
                // form is ready to submit
                setFormPending(false)
            }

            return errors
        },
        [module, setFormPending],
    )

    // This function is called when the user clicks the submit button.
    const handleDelayedSubmit = useCallback(
        (form: FormApi<JobFormValues>) => {
            formRef.current = form
            setSubmitRequested(true)
        },
        [setSubmitRequested],
    )

    // Whenever a submit was requested and all uploads have finished (formPending is false), we
    // trigger the form submission programmatically.
    useEffect(() => {
        if (!formPending && submitRequested) {
            try {
                formRef.current?.submit()
            } finally {
                setFormPending(false)
                setSubmitRequested(false)
            }
        }
    }, [formPending, submitRequested, setSubmitRequested, setFormPending])

    return (
        <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7 col-12">
                <h2 className="mb-5">Start prediction</h2>

                <Form
                    onSubmit={onSubmit}
                    validate={validate}
                    subscription={{
                        submitting: true,
                        errors: true,
                        submitError: true,
                    }}
                    render={({
                        handleSubmit,
                        submitting,
                        errors,
                        submitError,
                        form,
                    }) => (
                        <form onSubmit={handleSubmit} noValidate>
                            <Row>
                                {/* grouping everything in a fragment is necessary here  */}
                                <>
                                    <div className="form-check form-check-inline">
                                        <Field
                                            name="inputType"
                                            id="inputTextOption"
                                            component="input"
                                            type="radio"
                                            className="form-check-input"
                                            value="text"
                                            initialValue="text"
                                        />
                                        <label
                                            htmlFor="inputTextOption"
                                            className="form-check-label"
                                        >
                                            Enter text
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Field
                                            name="inputType"
                                            id="inputFileOption"
                                            component="input"
                                            type="radio"
                                            className="form-check-input"
                                            value="file"
                                        />
                                        <label
                                            htmlFor="inputFileOption"
                                            className="form-check-label"
                                        >
                                            Upload file
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Field
                                            name="inputType"
                                            id="inputDrawOption"
                                            component="input"
                                            type="radio"
                                            className="form-check-input"
                                            value="draw"
                                        />
                                        <label
                                            htmlFor="inputDrawOption"
                                            className="form-check-label"
                                        >
                                            Draw molecule
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <Field
                                            name="inputType"
                                            id="inputExampleOption"
                                            component="input"
                                            type="radio"
                                            className="form-check-input"
                                            value="example"
                                        />
                                        <label
                                            htmlFor="inputExampleOption"
                                            className="form-check-label"
                                        >
                                            Use example
                                        </label>
                                    </div>
                                </>
                            </Row>
                            <DynamicInput
                                exampleSmiles={module.exampleSmiles}
                            />

                            {module.jobParameters.map((jobParameter, i) => (
                                <Row key={i} helpText={jobParameter.helpText}>
                                    <JobParameterField
                                        jobParameter={jobParameter}
                                    />
                                </Row>
                            ))}

                            <Row>
                                <div className="d-flex align-items-center">
                                    {!submitRequested && !submitting && (
                                        <button
                                            className="btn btn-lg btn-primary text-nowrap"
                                            onClick={() =>
                                                handleDelayedSubmit(form)
                                            }
                                        >
                                            <FaPaperPlane
                                                size={15}
                                                className="me-2"
                                            />
                                            Submit
                                        </button>
                                    )}
                                    {(submitRequested || submitting) && (
                                        <button
                                            className="btn btn-lg btn-primary text-nowrap"
                                            disabled
                                        >
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                aria-hidden="true"
                                            ></span>
                                            <span role="status">
                                                Loading...
                                            </span>
                                        </button>
                                    )}
                                    {submitRequested &&
                                        errors !== undefined &&
                                        errors[FORM_ERROR] && (
                                            <div className="ms-3 text-body-secondary">
                                                {errors[FORM_ERROR]}
                                            </div>
                                        )}
                                    {(errors === undefined ||
                                        !errors[FORM_ERROR]) &&
                                        submitError && (
                                            <div className="ms-3 text-danger">
                                                {submitError}
                                            </div>
                                        )}
                                </div>
                            </Row>
                        </form>
                    )}
                />
            </div>
            <div className="col-lg-4 d-lg-block d-none"></div>
        </div>
    )
}
