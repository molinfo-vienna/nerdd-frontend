export interface JobStatus {
    status?: string;
    progress?: number;
    message?: string;
    startTime?: string; // ISO date string
    endTime?: string;   // ISO date string
}

export default JobStatus;