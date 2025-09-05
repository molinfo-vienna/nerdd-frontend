import { type JobParameter } from "@/types"
import { Field } from "react-final-form"
import CheckBoxField from "./CheckBoxField"
import SelectField from "./SelectField"
import TextField from "./TextField"

type JobParameterFieldProps = {
    jobParameter: JobParameter
}

export default function JobParameterField({
    jobParameter,
}: JobParameterFieldProps) {
    if (jobParameter.choices) {
        const defaultValue = jobParameter.default ?? ""

        return (
            <Field
                name={jobParameter.name}
                id={jobParameter.name}
                initialValue={defaultValue}
                label={jobParameter.visibleName}
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
                label={jobParameter.visibleName}
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
                placeholder={defaultValue}
                label={jobParameter.visibleName}
                id={jobParameter.name}
                aria-label={jobParameter.name}
                aria-describedby={`${jobParameter.name}Help`}
                component={TextField}
            />
        )
    }
}
