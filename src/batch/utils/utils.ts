import { DescribeJobsCommand } from '@aws-sdk/client-batch';
import { JobStatus, JobStatusCheckOptions } from '../types';
import { JOB_STATUS_CHECK_DEFAULT } from '../constants';

export const checkJobHasStatus = async (batchClient: any, jobId: string, desiredStatus: JobStatus[]): Promise<boolean> => {
    const describeJobsCommand = new DescribeJobsCommand({ jobs: [jobId] });
    const response = await batchClient.send(describeJobsCommand);

    if (!response.jobs || response.jobs.length === 0) {
        throw new Error(`Job with ID ${jobId} not found`);
    }

    const job = response.jobs[0];
    return desiredStatus.includes(job.status as JobStatus);
};

export const checkJobHasStatusWithRetry = async (
    batchClient: any,
    jobId: string,
    desiredStatus: JobStatus[],
    options?: JobStatusCheckOptions,
): Promise<boolean> => {
    const startTime = Date.now();
    const timeout = options?.timeout || JOB_STATUS_CHECK_DEFAULT.TIMEOUT;
    const delayBetweenRetries = options?.delayBetweenRetries || JOB_STATUS_CHECK_DEFAULT.DELAY_BETWEEN_RETRIES;

    if (timeout === 0) {
        return checkJobHasStatus(batchClient, jobId, desiredStatus);
    }

    // eslint-disable-next-line no-await-in-loop
    while (Date.now() - startTime < timeout) {
        // eslint-disable-next-line no-await-in-loop
        const hasStatus = await checkJobHasStatus(batchClient, jobId, desiredStatus);

        if (hasStatus) {
            return true;
        }

        // Wait for the specified delay before retrying
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => {
            setTimeout(resolve, delayBetweenRetries);
        });
    }

    // Timeout reached
    return false;
};
