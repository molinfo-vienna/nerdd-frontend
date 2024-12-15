import { createForm } from "final-form"
import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"
import { Field, Form } from "react-final-form"
import { moduleType } from "../../types"
import FileFieldAndList from "../fileField/FileFieldAndList"
import Icon from "../icon/Icon"
import MoleculeEditor from "../moleculeEditor/MoleculeEditor"
import JobParameterField from "./JobParameterField"
import Row from "./Row"

export default function JobForm({ module, onSubmit }) {
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
    const fileFieldTooltipPositionReference = useRef()

    const jobParameters = module.jobParameters ?? []

    // When the user clicks on the submit button, we have to make sure to upload all
    // files before submitting the form to server. We do that by
    // 1. Having two modes "idle" and "submitting" (and saving it in a state)
    // 2. When the user clicks on the submit button, we change the state to "submitting"
    // 3. Keep track of all files with useSelector and check on each change if all
    //    files are uploaded.
    const [status, setStatus] = useState("idle")
    const [valuesToSubmit, setValuesToSubmit] = useState(null)

    const onDelayedSubmit = (values) => {
        setStatus("submitting")
    }

    const formApi = createForm({ onSubmit: onDelayedSubmit })
    useEffect(() => {
        formApi.subscribe(
            ({ values }) => {
                setValuesToSubmit(values)
            },
            { values: true },
        )
    }, [])

    const formRef = useRef(formApi)

    useEffect(() => {
        if (status === "submitting") {
            // check if all files are uploaded
            if (
                valuesToSubmit.inputFile.filter((file) =>
                    ["pending", "deleting"].includes(file.status),
                ).length === 0
            ) {
                onSubmit(valuesToSubmit)
                setStatus("idle")
            }
        }
    }, [status, valuesToSubmit, onSubmit])

    return (
        <Form
            form={formRef.current}
            render={({ handleSubmit, values }) => (
                <form
                    className="form-horizontal"
                    onSubmit={(e) => {
                        // don't invoke a normal submit
                        e.preventDefault()
                        // rather, invoke our own submit function
                        handleSubmit(e)
                    }}
                >
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
                            {/* <div className="form-check form-check-inline">
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
                                        </div> */}
                            {/* <div className="form-check form-check-inline">
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
                                        </div> */}
                        </>
                    </Row>

                    <Row
                        helpText="Use any of the formats SMILES, SDF or InChI."
                        className={`${values.inputType !== "text" && "d-none"}`}
                    >
                        <Field
                            name="input"
                            component="textarea"
                            className="form-control"
                            id="input"
                            aria-describedby="inputHelp"
                            rows={5}
                            placeholder={placeholderSmiles}
                            initialValue=""
                        />
                    </Row>

                    <Row
                        helpText="Within a file, the format shouldn't change,
                                but different files can have any of the formats
                                SMILES, SDF or InChI."
                        className={`${values.inputType !== "file" && "d-none"}`}
                        positionReference={fileFieldTooltipPositionReference}
                    >
                        <FileFieldAndList
                            name="inputFile"
                            tooltipPositionReference={
                                fileFieldTooltipPositionReference
                            }
                            className="form-control"
                            multiple
                        />
                    </Row>

                    <Row
                        className={`${values.inputType !== "draw" && "d-none"}`}
                    >
                        <MoleculeEditor name="inputDrawn" />
                    </Row>

                    {jobParameters.map((jobParameter, i) => (
                        <Row
                            key={i}
                            label={jobParameter.visibleName}
                            labelFor={jobParameter.name}
                            helpText={jobParameter.helpText}
                        >
                            <JobParameterField jobParameter={jobParameter} />
                        </Row>
                    ))}

                    <Row>
                        <p className="text-center">
                            {status === "idle" && (
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-primary"
                                >
                                    <Icon
                                        name="FaPaperPlane"
                                        size={15}
                                        className="me-2"
                                    />
                                    Submit
                                </button>
                            )}
                            {status === "submitting" && (
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
                        </p>
                    </Row>
                </form>
            )}
        />
    )
}

JobForm.propTypes = {
    module: moduleType.isRequired,
    onSubmit: PropTypes.func.isRequired,
}
