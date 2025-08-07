import classNames from "classnames"
import { useRef } from "react"
import { Field, useField } from "react-final-form"
import MoleculeEditor from "../moleculeEditor/MoleculeEditor"
import FileField from "./FileField"
import MoleculeEditorField from "./MoleculeEditorField"
import Row from "./Row"
import Textarea from "./Textarea"

type DynamicInputProps = {
    exampleSmiles: string
}

export default function DynamicInput({ exampleSmiles }: DynamicInputProps) {
    // create a placeholder for the text input
    // (first few characters of the example SMILES)
    const placeholderSmiles = exampleSmiles.split(/\s+/)[0].slice(0, 13) + "..."

    const {
        input: { value: inputType },
    } = useField("inputType", { subscription: { value: true } })

    // The file field contains a drop zone and a list of uploaded files. We want to
    // position the tooltip at the center of the *upload zone* (ignoring the list of
    // uploaded files). To do this, we need to get a reference to the upload zone and
    // pass it to the tooltip component.
    const inputTextFieldTooltipPositionReference =
        useRef<HTMLTextAreaElement>(null)
    const fileFieldTooltipPositionReference = useRef<HTMLElement>(null)
    const inputDrawnTooltipPositionReference = useRef<HTMLElement>(null)

    return (
        <>
            <Row
                helpText="Use any of the formats SMILES, SDF or InChI."
                positionReference={inputTextFieldTooltipPositionReference}
                className={classNames({
                    "d-none": inputType !== "text",
                })}
            >
                <Field
                    name="input"
                    id="input"
                    rows={5}
                    positionReference={inputTextFieldTooltipPositionReference}
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
                    "d-none": inputType !== "file",
                })}
                positionReference={fileFieldTooltipPositionReference}
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
                    positionReference={fileFieldTooltipPositionReference}
                    multiple
                />
            </Row>

            <Row
                className={classNames({
                    "d-none": inputType !== "draw",
                })}
            >
                <Field
                    name="inputDrawn"
                    id="inputDrawn"
                    initialValue={""}
                    component={MoleculeEditorField}
                    aria-describedby="inputDrawnHelp"
                    positionReference={inputDrawnTooltipPositionReference}
                />
            </Row>

            <Row
                className={classNames({
                    "d-none": inputType !== "example",
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
    )
}
