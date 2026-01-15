import { Actor, Action } from '@testla/screenplay';
import { GetObjectCommand, GetObjectCommandInput, GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { UseS3 } from '../abilities/UseS3';

export class Get extends Action {
    private getObjectCommandInput: GetObjectCommandInput;

    private returnMode: 'text' | 'json' | 'raw' = 'raw';

    private constructor(getObjectCommandInput: GetObjectCommandInput) {
        super();
        this.getObjectCommandInput = getObjectCommandInput;
    }

    public async performAs(actor: Actor): Promise<GetObjectCommandOutput | string | object> {
        const getCommand = new GetObjectCommand(this.getObjectCommandInput);
        const s3Client = UseS3.as(actor, this.abilityAlias).getClient();
        const res = await s3Client.send(getCommand);

        if (this.returnMode === 'raw') {
            return res;
        }

        const fileContent = await res.Body?.transformToString() ?? '';

        if (this.returnMode === 'json') {
            return JSON.parse(fileContent);
        }

        return fileContent;
    }

    /**
     * Gets objects from S3
     * If not specified otherwise returns the raw GetObjectCommandOutput
     *
     * @param getObjectCommandInput get object command input
     * @returns an instance of Get
     */
    public static object(getObjectCommandInput: GetObjectCommandInput): Get {
        const instance = new Get(getObjectCommandInput);
        instance.setCallStackInitializeCalledWith({ getObjectCommandInput });
        return instance;
    }

    /**
     * Returns the S3 object as JSON
     *
     * @returns an instance of Get
     */
    public get asText(): Get {
        this.returnMode = 'text';
        return this;
    }

    /**
     * Returns the S3 object as JSON
     *
     * @returns an instance of Get
     */
    public get asJson(): Get {
        this.returnMode = 'json';
        return this;
    }
}
