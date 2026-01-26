import {
    GetObjectTaggingCommandOutput, GetObjectTaggingCommandInput,
} from '@aws-sdk/client-s3';
import { UseS3 } from '../../../abilities/UseS3';
import { ActionStrategyExecuteParams } from '../../../../types';
import { getObjectTags } from '../../../utils';

export class GetObjectTagsStrategy {
    protected getObjectTaggingCommandInput: GetObjectTaggingCommandInput;

    protected returnMode: 'text' | 'json' | 'raw' = 'raw';

    constructor(getObjectTaggingCommandInput: GetObjectTaggingCommandInput, returnMode: 'text' | 'json' | 'raw' = 'raw') {
        this.getObjectTaggingCommandInput = getObjectTaggingCommandInput;
        this.returnMode = returnMode;
    }

    public async execute({ actor, abilityAlias }: ActionStrategyExecuteParams): Promise<GetObjectTaggingCommandOutput | string | object> {
        const s3Client = UseS3.as(actor, abilityAlias).getClient();

        return getObjectTags(
            s3Client,
            this.getObjectTaggingCommandInput.Bucket!,
            this.getObjectTaggingCommandInput.Key!,
            this.returnMode,
        );
    }
}
