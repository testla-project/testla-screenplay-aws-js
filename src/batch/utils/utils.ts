import { DescribeJobsCommand } from '@aws-sdk/client-batch';
import { JobStatus } from '../types';

export const checkJobHasStatus = async (batchClient: any, jobId: string, desiredStatus: JobStatus[]): Promise<boolean> => {
    const describeJobsCommand = new DescribeJobsCommand({ jobs: [jobId] });
    const response = await batchClient.send(describeJobsCommand);

    if (!response.jobs || response.jobs.length === 0) {
        throw new Error(`Job with ID ${jobId} not found`);
    }

    const job = response.jobs[0];
    return desiredStatus.includes(job.status as JobStatus);
};
