import { GetObjectCommand, GetObjectCommandInput, GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { UseS3 } from '../../../abilities/UseS3';
import { ActionStrategyExecuteParams } from '../../../../types';

export class GetObjectStrategy {
    protected getObjectCommandInput: GetObjectCommandInput;

    protected returnMode: 'text' | 'json' | 'raw' = 'raw';

    constructor(getObjectCommandInput: GetObjectCommandInput, returnMode: 'text' | 'json' | 'raw' = 'raw') {
        this.getObjectCommandInput = getObjectCommandInput;
        this.returnMode = returnMode;
    }

    public async execute({ actor, abilityAlias }: ActionStrategyExecuteParams): Promise<GetObjectCommandOutput | string | object> {
        const getCommand = new GetObjectCommand(this.getObjectCommandInput);
        const s3Client = UseS3.as(actor, abilityAlias).getClient();
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
}
