import { Actor, Action } from '@testla/screenplay';
import { UseBatch } from '../abilities/UseBatch';
import { checkJobHasStatus } from '../utils';

type WaitOptions = {
    timeout?: number;
};

export class Wait extends Action {
    private delayBetweenRetries = 500;

    private jobId: string;

    private options?: WaitOptions;

    private constructor(jobId: string, options?: WaitOptions) {
        super();
        this.jobId = jobId;
        this.options = options;
    }

    public async performAs(actor: Actor): Promise<boolean> {
        const batchClient = UseBatch.as(actor, this.abilityAlias).getClient();
        const timeout = this.options?.timeout || 30000; // default 30 seconds
        const startTime = Date.now();

        // eslint-disable-next-line no-await-in-loop
        while (Date.now() - startTime < timeout) {
            // eslint-disable-next-line no-await-in-loop
            const isFinished = await checkJobHasStatus(batchClient, this.jobId, ['SUCCEEDED', 'FAILED']);

            if (isFinished) {
                return true;
            }

            // Wait for the specified delay before retrying
            // eslint-disable-next-line no-await-in-loop
            await new Promise((resolve) => {
                setTimeout(resolve, this.delayBetweenRetries);
            });
        }

        // Timeout reached
        return false;
    }

    /**
     * Waits for a batch job to finish with configurable timeout and retry delay
     *
     * @param jobId the batch job id to wait for
     * @param options optional configuration with timeout in milliseconds
     * @returns an instance of Wait
     */
    public static forJobFinished(jobId: string, options?: WaitOptions): Wait {
        const instance = new Wait(jobId, options);
        instance.setCallStackInitializeCalledWith({ jobId, options });
        return instance;
    }
}
