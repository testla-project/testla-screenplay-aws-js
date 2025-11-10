import { Actor, Action } from '@testla/screenplay';
import { DeleteObjectCommand, DeleteObjectCommandInput, DeleteObjectCommandOutput } from '@aws-sdk/client-s3';
import { UseS3 } from '../abilities/UseS3';

export class Delete extends Action {
    private deleteObjectCommandInput: DeleteObjectCommandInput;

    private constructor(deleteObjectCommandInput: DeleteObjectCommandInput) {
        super();
        this.deleteObjectCommandInput = deleteObjectCommandInput;
    }

    public async performAs(actor: Actor): Promise<DeleteObjectCommandOutput> {
        const deleteCommand = new DeleteObjectCommand(this.deleteObjectCommandInput);
        const s3Client = UseS3.as(actor, this.abilityAlias).getClient();
        return s3Client.send(deleteCommand);
    }

    /**
     * Deletes object from S3
     *
     * @param deleteObjectCommandInput delete object command input
     * @returns an instance of Delete
     */
    public static with(deleteObjectCommandInput: DeleteObjectCommandInput): Delete {
        const instance = new Delete(deleteObjectCommandInput);
        instance.setCallStackInitializeCalledWith({ deleteObjectCommandInput });
        return instance;
    }
}
