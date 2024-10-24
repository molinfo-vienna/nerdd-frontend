import React from "react"
import { Field } from "react-final-form"
import { jobParameterType } from "../../types"

export default function JobParameterField({ jobParameter }) {
    if (jobParameter.choices) {
        const defaultValue =
            jobParameter.default ?? jobParameter.choices[0].value

        return (
            <Field
                name={jobParameter.name}
                component="select"
                className="form-select"
                aria-label={jobParameter.name}
                aria-describedby={`${jobParameter.name}Help`}
                initialValue={defaultValue}
            >
                {jobParameter.choices.map(({ label, value }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </Field>
        )
    } else {
        const defaultValue = jobParameter.default ?? ""

        return (
            <Field
                name={jobParameter.name}
                component="input"
                className="form-control"
                id={jobParameter.name}
                aria-label={jobParameter.name}
                aria-describedby={`${jobParameter.name}Help`}
                initialValue={defaultValue}
            />
        )
    }
}

JobParameterField.propTypes = {
    jobParameter: jobParameterType.isRequired,
}
