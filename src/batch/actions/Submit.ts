import { Actor, Action } from '@testla/screenplay';
import { SubmitJobCommand, SubmitJobCommandInput, SubmitJobCommandOutput } from '@aws-sdk/client-batch';
import { UseBatch } from '../abilities/UseBatch';

export class Submit extends Action {
    private submitJobCommandInput: SubmitJobCommandInput;

    private constructor(submitJobCommandInput: SubmitJobCommandInput) {
        super();
        this.submitJobCommandInput = submitJobCommandInput;
    }

    public async performAs(actor: Actor): Promise<SubmitJobCommandOutput> {
        const command = new SubmitJobCommand(this.submitJobCommandInput);
        const batchClient = UseBatch.as(actor, this.abilityAlias).getClient();
        return batchClient.send(command);
    }

    /**
     * Submits a new job to AWS Batch
     *
     * @param submitJobCommandInput submit job command input
     * @returns an instance of Submit
     */
    public static job(submitJobCommandInput: SubmitJobCommandInput): Submit {
        const instance = new Submit(submitJobCommandInput);
        instance.setCallStackInitializeCalledWith({ submitJobCommandInput });
        return instance;
    }
}
