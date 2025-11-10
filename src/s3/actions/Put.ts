import { Actor, Action } from '@testla/screenplay';

import { PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { UseS3 } from '../abilities/UseS3';

export class Put extends Action {
    private putObjectCommandInput: PutObjectCommandInput;

    private constructor(putObjectCommandInput: PutObjectCommandInput) {
        super();
        this.putObjectCommandInput = putObjectCommandInput;
    }

    public async performAs(actor: Actor): Promise<PutObjectCommandOutput> {
        const putCommand = new PutObjectCommand(this.putObjectCommandInput);
        const s3Client = UseS3.as(actor, this.abilityAlias).getClient();
        return s3Client.send(putCommand);
    }

    /**
     * Puts objects into S3
     *
     * @param putObjectCommandInput put object command input
     * @returns an instance of Put
     */
    public static with(putObjectCommandInput: PutObjectCommandInput): Put {
        const instance = new Put(putObjectCommandInput);
        instance.setCallStackInitializeCalledWith({ putObjectCommandInput });
        return instance;
    }
}
