import { type Module } from "@/types"
import { createForm, FormApi } from "final-form"
import { useCallback, useEffect, useRef, useState } from "react"
import { Field, Form, FormSpy } from "react-final-form"
import { FaPaperPlane } from "react-icons/fa6"
import MoleculeEditor from "../moleculeEditor/MoleculeEditor"
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

    const jobParameters = module.jobParameters ?? []

    // When the user clicks on the submit button, we have to make sure to upload all
    // files before submitting the form to server. We do that by
    // 1. Having two modes "idle" and "submitting" (and saving it in a state)
    // 2. When the user clicks on the submit button, we change the state to "submitting"
    // 3. Keep track of all files with useEffect and check on each change if all
    //    files are uploaded.
    const [status, setStatus] = useState("idle")
    const [valuesToSubmit, setValuesToSubmit] = useState<any>(null)

    const onDelayedSubmit = (values: any) => {
        setStatus("checking")
    }

    useEffect(() => {
        async function _submit() {
            if (status === "checking" && valuesToSubmit) {
                // check if all files are uploaded
                if (
                    valuesToSubmit.inputFile?.filter((file: any) =>
                        ["pending", "deleting"].includes(file.status),
                    ).length === 0
                ) {
                    setStatus("submitting")
                    try {
                        await onSubmit(valuesToSubmit)
                    } finally {
                        setStatus("idle")
                    }
                }
            }
        }
        _submit()
    }, [status, valuesToSubmit, onSubmit])

    //
    // Validation
    //
    const validate = useCallback(
        (values: any) => {
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
            for (const jobParameter of jobParameters) {
                if (jobParameter.required && !values[jobParameter.name]) {
                    errors[jobParameter.name] = "Required"
                }
            }

            return errors
        },
        // we would like to have jobParameters as a dependency, but it is an object
        // BUT: jobParameters changes if and only if the module changes
        // --> use module.id as a dependency
        [module.id],
    )

    //
    // create form
    //
    const formApi = createForm({ onSubmit: onDelayedSubmit, validate })
    useEffect(() => {
        formApi.subscribe(
            // update local state with the values to submit
            ({ values }) => setValuesToSubmit(values),
            // subscribe to all changes in the form
            { values: true },
        )
    }, [])

    const formRef = useRef<FormApi<any, any>>(formApi)

    return (
        <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7 col-12">
                <h2 className="mb-5">Start prediction</h2>

                <Form
                    form={formRef.current}
                    render={({ handleSubmit, submitting }) => (
                        <form
                            onSubmit={(e) => {
                                // don't invoke a normal submit
                                e.preventDefault()
                                // rather, invoke our own submit function
                                handleSubmit(e)

                                // TODO: it is possible to upload files, submit and delete all files
                                // during the upload phase. In this case, validation was already skipped
                                // and the form is submitted without any files. We should prevent this.
                            }}
                        >
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
                                            className={
                                                values.inputType !== "text"
                                                    ? "d-none"
                                                    : ""
                                            }
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
                                            className={
                                                values.inputType !== "file"
                                                    ? "d-none"
                                                    : ""
                                            }
                                            positionReference={
                                                fileFieldTooltipPositionReference
                                            }
                                        >
                                            <Field
                                                name="inputFile"
                                                id="inputFile"
                                                initialValue={[]}
                                                component={FileField}
                                                aria-describedby="inputFileHelp"
                                                positionReference={
                                                    fileFieldTooltipPositionReference
                                                }
                                                multiple
                                            />
                                        </Row>

                                        <Row
                                            className={
                                                values.inputType !== "draw"
                                                    ? "d-none"
                                                    : ""
                                            }
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
                                            className={
                                                values.inputType !== "example"
                                                    ? "d-none"
                                                    : ""
                                            }
                                        >
                                            <MoleculeEditor
                                                value={exampleSmiles}
                                                width="300px"
                                                height="200px"
                                                config={{
                                                    options: "depict",
                                                }}
                                            />
                                        </Row>
                                    </>
                                )}
                            </FormSpy>

                            {jobParameters.map((jobParameter, i) => (
                                <Row
                                    key={i}
                                    label={jobParameter.visibleName}
                                    labelFor={jobParameter.name}
                                    helpText={jobParameter.helpText}
                                >
                                    <JobParameterField
                                        jobParameter={jobParameter}
                                    />
                                </Row>
                            ))}

                            <Row>
                                {status === "idle" && !submitting && (
                                    <button
                                        type="submit"
                                        className="btn btn-lg btn-primary"
                                    >
                                        <FaPaperPlane
                                            size={15}
                                            className="me-2"
                                        />
                                        Submit
                                    </button>
                                )}
                                {(status === "submitting" ||
                                    status === "checking" ||
                                    submitting) && (
                                    <button
                                        type="submit"
                                        className="btn btn-lg btn-primary"
                                        disabled
                                    >
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            aria-hidden="true"
                                        ></span>
                                        <span role="status">Loading...</span>
                                    </button>
                                )}
                            </Row>
                        </form>
                    )}
                />
            </div>
            <div className="col-lg-4 d-lg-block d-none"></div>
        </div>
    )
}
