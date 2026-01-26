import { GetObjectTaggingCommandInput, GetObjectTaggingCommand, S3Client } from '@aws-sdk/client-s3';

export const getObjectTags = async (s3Client: S3Client, Bucket: string, Key: string, format: 'raw' | 'json' | 'text') => {
    const getCommandInput: GetObjectTaggingCommandInput = { Bucket, Key };
    const getCommand = new GetObjectTaggingCommand(getCommandInput);
    const res = await s3Client.send(getCommand);
    if (format === 'raw') {
        return res;
    }

    const tagSet = res.TagSet ?? [];

    if (format === 'json') {
        return tagSet.reduce((acc, tag) => {
            if (tag.Key && tag.Value) {
                acc[tag.Key] = tag.Value;
            }
            return acc;
        }, {} as Record<string, string>);
    }

    return tagSet.map((tag) => `${tag.Key}=${tag.Value}`);
};
