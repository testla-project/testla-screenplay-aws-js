export type StreamIdentifier = 'name' | 'arn';

export type StreamOptions = {
    partitionKey?: string;
    streamIdentifier?: StreamIdentifier;
}
