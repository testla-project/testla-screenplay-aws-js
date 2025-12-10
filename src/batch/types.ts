export type JobStatus =
    | 'SUBMITTED'
    | 'PENDING'
    | 'RUNNABLE'
    | 'STARTING'
    | 'RUNNING'
    | 'SUCCEEDED'
    | 'FAILED';

export type JobStatusCheckOptions = {
    timeout?: number;
    delayBetweenRetries?: number;
};
