import { Actor, Action } from '@testla/screenplay';
import { UseBatch } from '../abilities/UseBatch';
import { checkJobHasStatusWithRetry } from '../utils';
import { JobStatusCheckOptions } from '../types';

export class Wait extends Action {
    private jobId: string;

    private options?: JobStatusCheckOptions;

    private constructor(jobId: string, options?: JobStatusCheckOptions) {
        super();
        this.jobId = jobId;
        this.options = options;
    }

    public async performAs(actor: Actor): Promise<boolean> {
        const batchClient = UseBatch.as(actor, this.abilityAlias).getClient();
        return checkJobHasStatusWithRetry(
            batchClient,
            this.jobId,
            ['SUCCEEDED', 'FAILED'],
            this.options,
        );
    }

    /**
     * Waits for a batch job to finish with configurable timeout and retry delay
     *
     * @param jobId the batch job id to wait for
     * @param options optional configuration for job status lookup
     * @returns an instance of Wait
     */
    public static forJobFinished(jobId: string, options?: JobStatusCheckOptions): Wait {
        const instance = new Wait(jobId, options);
        instance.setCallStackInitializeCalledWith({ jobId, options });
        return instance;
    }
}
