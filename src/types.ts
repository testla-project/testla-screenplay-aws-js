import { AwsCredentialIdentity } from '@aws-sdk/types';

export type AwsSettings = {
    region: string;
    credentials?: AwsCredentialIdentity;
}
