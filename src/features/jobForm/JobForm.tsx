import MoleculeEditor from "@/features/moleculeEditor/MoleculeEditor"
import { type Module } from "@/types"
import classNames from "classnames"
import { createForm, FORM_ERROR, FormApi } from "final-form"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Field, Form, FormSpy } from "react-final-form"
import { FaPaperPlane } from "react-icons/fa6"
import FileField from "./FileField"
import JobParameterField from "./JobParameterField"
import MoleculeEditorField from "./MoleculeEditorField"
import Row from "./Row"
import Textarea from "./Textarea"

type JobFormProps = {
    module: Module
    onSubmit: (values: any) => Promise<any>
}

export default function JobForm({ module, onSubmit }: JobFormProps) {
    // create a placeholder for the text input
    // (first few characters of the example SMILES)
    const exampleSmiles = module.exampleSmiles
        ? module.exampleSmiles.split()[0]
        : "CN1CCN(Cc2ccc(cc2)C(=O)Nc3ccc(C)c(Nc4nccc(n4)c5cccnc5)c3)CC1"
    const placeholderSmiles = exampleSmiles.slice(0, 13) + "..."

    // The file field contains a drop zone and a list of uploaded files. We want to
    // position the tooltip at the center of the *upload zone* (ignoring the list of
    // uploaded files). To do this, we need to get a reference to the upload zone and
    // pass it to the tooltip component.
    const inputTextFieldTooltipPositionReference =
        useRef<HTMLTextAreaElement>(null)
    const fileFieldTooltipPositionReference = useRef<HTMLElement>(null)
    const inputDrawnTooltipPositionReference = useRef<HTMLElement>(null)

    // When the user clicks on the submit button, we have to make sure to upload all
    // files before submitting the form to server. For that we introduce two state variables:
    // * formPending indicates whether files are still being uploaded (formPending)
    // * submitRequested indicates whether the user has clicked the submit button
    // Below we have code that submits the form only when formPending is false and submitRequested
    // is true.
    const [formPending, setFormPending] = useState(false)
    const [submitRequested, setSubmitRequested] = useState(false)

    //
    // Validation
    //
    const validate = useCallback(
        (values) => {
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
                // all files uploaded?
                values.inputFile?.filter((file) =>
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

    //
    // create form
    //
    const formApi = useMemo(
        () => createForm({ onSubmit, validate }),
        [onSubmit, validate],
    )

    const handleDelayedSubmit = useCallback(() => {
        setSubmitRequested(true)
    }, [setSubmitRequested])

    useEffect(() => {
        if (!formPending && submitRequested) {
            try {
                formApi.submit()
            } finally {
                setSubmitRequested(false)
            }
        }
    }, [formPending, formApi, submitRequested, setSubmitRequested])

    const formRef = useRef<FormApi>(formApi)

    return (
        <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7 col-12">
                <h2 className="mb-5">Start prediction</h2>

                <Form
                    form={formRef.current}
                    render={({
                        handleSubmit,
                        submitting,
                        errors,
                        submitError,
                    }) => (
                        <form onSubmit={handleSubmit} noValidate>
                            <FormSpy subscription={{ values: true }}>
                                {({ values }) => (
                                    <>
                                        <Row>
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

                                        <Row
                                            helpText="Use any of the formats SMILES, SDF or InChI."
                                            positionReference={
                                                inputTextFieldTooltipPositionReference
                                            }
                                            className={classNames({
                                                "d-none":
                                                    values.inputType !== "text",
                                            })}
                                        >
                                            <Field
                                                name="input"
                                                id="input"
                                                rows={5}
                                                positionReference={
                                                    inputTextFieldTooltipPositionReference
                                                }
                                                aria-describedby="inputHelp"
                                                initialValue=""
                                                placeholder={placeholderSmiles}
                                                component={Textarea}
                                            />
                                        </Row>

                                        <Row
                                            helpText="File format can be SMILES, SDF, InChI or compressed archives like
                        ZIP, TAR, GZ containing other files with molecular representations. 
                        Multiple files can be uploaded."
                                            className={classNames({
                                                "d-none":
                                                    values.inputType !== "file",
                                            })}
                                            positionReference={
                                                fileFieldTooltipPositionReference
                                            }
                                        >
                                            <Field
                                                name="inputFile"
                                                id="inputFile"
                                                // do not provide initialValue = []
                                                // 1. it is not needed
                                                // 2. a rerender will always create a new array
                                                //    -> this triggers another rerender
                                                component={FileField}
                                                aria-describedby="inputFileHelp"
                                                positionReference={
                                                    fileFieldTooltipPositionReference
                                                }
                                                multiple
                                            />
                                        </Row>

                                        <Row
                                            className={classNames({
                                                "d-none":
                                                    values.inputType !== "draw",
                                            })}
                                        >
                                            <Field
                                                name="inputDrawn"
                                                id="inputDrawn"
                                                initialValue={""}
                                                component={MoleculeEditorField}
                                                aria-describedby="inputDrawnHelp"
                                                positionReference={
                                                    inputDrawnTooltipPositionReference
                                                }
                                            />
                                        </Row>

                                        <Row
                                            className={classNames({
                                                "d-none":
                                                    values.inputType !==
                                                    "example",
                                            })}
                                        >
                                            <MoleculeEditor
                                                value={exampleSmiles}
                                                width="300px"
                                                height="200px"
                                                depict={true}
                                            />
                                        </Row>
                                    </>
                                )}
                            </FormSpy>

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
                                            onClick={handleDelayedSubmit}
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
                                    {submitRequested && errors[FORM_ERROR] && (
                                        <div className="ms-3 text-body-secondary">
                                            {errors[FORM_ERROR]}
                                        </div>
                                    )}
                                    {!errors[FORM_ERROR] && submitError && (
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
