import { Actor, Action } from '@testla/screenplay';
import {
    ListShardsCommand, GetShardIteratorCommand, ShardIteratorType,
    GetRecordsCommand,
} from '@aws-sdk/client-kinesis';
import { UseKinesis } from '../abilities/UseKinesis';
import { StreamOptions } from '../types';

export class Get extends Action {
    private stream: string;

    private options?: StreamOptions;

    private startTime?: Date;

    private constructor(stream: string, options?: StreamOptions) {
        super();
        this.stream = stream;
        this.options = options;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async performAs(actor: Actor): Promise<any> {
        // check for required parameters
        if (
            this.stream === undefined
        ) {
            throw new Error('Stream is not set');
        }

        const kinesisClient = UseKinesis.as(actor, this.abilityAlias).getClient();

        const results = await kinesisClient.send(new ListShardsCommand({
            StreamName: this.stream,
        }));

        if (results?.Shards === undefined || results.Shards.length === 0) {
            throw new Error('No shards found');
        }

        // Currently we only have a look at the last found shard - we need to consder all
        // eslint-disable-next-line
        // @ts-ignore
        const shardId = results.Shards.pop().ShardId;

        const getShardIteratorOutput = await kinesisClient.send(
            new GetShardIteratorCommand({
                // identifier = 'name' or default/fallback
                StreamName: this.options?.streamIdentifier !== 'arn' ? this.stream : undefined,
                // only if identifier = 'arn'
                StreamARN: this.options?.streamIdentifier === 'arn' ? this.stream : undefined,
                ShardId: shardId,
                Timestamp: this.startTime,
                ShardIteratorType: this.startTime ? ShardIteratorType.AT_TIMESTAMP : undefined,
            }),
        );

        const getRecordsOutput = await kinesisClient.send(new GetRecordsCommand({
            ShardIterator: getShardIteratorOutput.ShardIterator,
        }));

        const records = getRecordsOutput?.Records;

        if (records === undefined) {
            throw Error('No records received');
        }

        const textDecoder = new TextDecoder();

        return records
            .map((record) => textDecoder.decode(record.Data));
    }

    /**
     * Gets record from a stream
     *
     * @param stream to be read from
     * @param options object (optional) to provide streamIdentifier or partitionKey
     * @returns an instance of Get
     */
    public static recordsFrom(streamName: string, options?: StreamOptions): Get {
        const instance = new Get(streamName, options);
        instance.setCallStackInitializeCalledWith({ streamName, options });
        return instance;
    }

    /**
     * Sets strating time for record reading
     *
     * @param startTime Time at which data reading will be started
     * @returns current updated instance
     */
    public startingAt(startTime: Date): Get {
        this.startTime = startTime;
        this.addToCallStack({ caller: 'startingAt', calledWith: { startTime } });
        return this;
    }
}
