import classNames from "classnames"
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

    return (
        <>
            <Row
                helpText="Use any of the formats SMILES, SDF or InChI."
                className={classNames({
                    "d-none": inputType !== "text",
                })}
            >
                <Field
                    name="input"
                    id="input"
                    rows={5}
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
