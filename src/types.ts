import { AwsCredentialIdentity } from '@aws-sdk/types';
import { Actor } from '@testla/screenplay';

export type AwsSettings = {
    region: string;
    credentials?: AwsCredentialIdentity;
}

export type CheckMode = 'positive' | 'negative';

export type ActionStrategyExecuteParams = {
    actor: Actor;
    abilityAlias?: string;
};
