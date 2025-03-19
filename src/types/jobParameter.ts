export interface JobParameterChoice {
    label: string;
    value: any;
}

export interface JobParameter {
    name: string;
    type: string;
    visibleName: string;
    helpText?: string;
    default?: any;
    required?: boolean;
    choices?: JobParameterChoice[];
}

export default JobParameter;