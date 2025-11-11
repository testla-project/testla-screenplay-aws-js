import { Actor, Action } from '@testla/screenplay';
import { GetObjectCommand, GetObjectCommandInput, GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { UseS3 } from '../abilities/UseS3';

export class Get extends Action {
    private getObjectCommandInput: GetObjectCommandInput;

    private constructor(getObjectCommandInput: GetObjectCommandInput) {
        super();
        this.getObjectCommandInput = getObjectCommandInput;
    }

    public async performAs(actor: Actor): Promise<GetObjectCommandOutput> {
        const getCommand = new GetObjectCommand(this.getObjectCommandInput);
        const s3Client = UseS3.as(actor, this.abilityAlias).getClient();
        return s3Client.send(getCommand);
    }

    /**
     * Gets objects from S3
     *
     * @param getObjectCommandInput get object command input
     * @returns an instance of Get
     */
    public static object(getObjectCommandInput: GetObjectCommandInput): Get {
        const instance = new Get(getObjectCommandInput);
        instance.setCallStackInitializeCalledWith({ getObjectCommandInput });
        return instance;
    }
}
