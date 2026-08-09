export interface QueueStats {
    moduleId: string
    waitingTimeMinutes: number
    numActiveJobs: number
    estimate: "upper_bound" | "lower_bound"
    secondsPerMolecule: number
    startupTimeSeconds: number
    maxNumMolecules: number
    checkpointSize: number
}
