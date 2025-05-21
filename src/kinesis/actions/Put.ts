import { Actor, Action } from '@testla/screenplay';
import {
    PutRecordsCommand,
    PutRecordsCommandInput,
    PutRecordsRequestEntry,
} from '@aws-sdk/client-kinesis';
import { UseKinesis } from '../abilities/UseKinesis';
import { StreamOptions } from '../types';

// Todo: ShardId ???

export class Put extends Action {
    private stream: string | undefined;

    private data: any[];

    private options?: StreamOptions;

    private constructor(data: any[], stream: string, options?: StreamOptions) {
        super();
        this.data = data;
        this.stream = stream;
        this.options = options;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async performAs(actor: Actor): Promise<any> {
        // check for required parameters
        if (this.stream === undefined) {
            throw new Error('Stream is not set');
        }

        const kinesisClient = UseKinesis.as(actor, this.abilityAlias).getClient();

        const records: PutRecordsRequestEntry[] = this.data.map((record) => ({
            Data: Buffer.from(record),
            PartitionKey: this.options?.partitionKey,
        }));

        const params: PutRecordsCommandInput = {
            // identifier = 'name' or default/fallback
            StreamName: this.options?.streamIdentifier !== 'arn' ? this.stream : undefined,
            // only if identifier = 'arn'
            StreamARN: this.options?.streamIdentifier === 'arn' ? this.stream : undefined,
            Records: records,
        };
        const command = new PutRecordsCommand(params);
        return kinesisClient.send(command);
    }

    /**
     * Puts a single record to a kinesis stream
     *
     * @param data to be sent to the stream
     * @param stream to send the record to
     * @param options object (optional) to provide streamIdentifier or partitionKey
     * @returns an instance of Put
     */
    public static recordTo(data: any, stream: string, options?: StreamOptions): Put {
        if (data instanceof Array) {
            throw new Error('Input should not be an array. Use records() instead');
        }
        const instance = new Put([data], stream, options);
        instance.setCallStackInitializeCalledWith({ data, stream, options });
        return instance;
    }

    /**
     * Puts multiple records to a kinesis stream
     *
     * @param data to be sent to the stream
     * @param stream to send the record to
     * @param options object (optional) to provide streamIdentifier or partitionKey
     * @returns an instance of Put
     */
    public static recordsTo(data: any[], stream: string, options?: StreamOptions): Put {
        const instance = new Put(data, stream, options);
        instance.setCallStackInitializeCalledWith({ data, stream, options });
        return instance;
    }
}
