import React from "react"
import { Field } from "react-final-form"
import { jobParameterType } from "../../types"
import CheckBoxField from "./CheckBoxField"
import SelectField from "./SelectField"
import TextField from "./TextField"

export default function JobParameterField({ jobParameter }) {
    if (jobParameter.choices) {
        const defaultValue = jobParameter.default ?? ""

        return (
            <Field
                name={jobParameter.name}
                id={jobParameter.name}
                initialValue={defaultValue}
                aria-label={jobParameter.name}
                aria-describedby={`${jobParameter.name}Help`}
                component={SelectField}
                choices={jobParameter.choices}
            />
        )
    } else if (jobParameter.type === "bool") {
        const defaultValue = jobParameter.default ?? false

        return (
            <Field
                name={jobParameter.name}
                id={jobParameter.name}
                initialValue={defaultValue}
                aria-label={jobParameter.name}
                component={CheckBoxField}
                type="checkbox"
            />
        )
    } else {
        const defaultValue = jobParameter.default ?? ""

        return (
            <Field
                name={jobParameter.name}
                initialValue={defaultValue}
                id={jobParameter.name}
                aria-label={jobParameter.name}
                aria-describedby={`${jobParameter.name}Help`}
                component={TextField}
            />
        )
    }
}

JobParameterField.propTypes = {
    jobParameter: jobParameterType.isRequired,
}
