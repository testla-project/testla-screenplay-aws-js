import { Actor, Action } from '@testla/screenplay';
import { ListObjectsV2Command, ListObjectsV2CommandInput, ListObjectsV2CommandOutput } from '@aws-sdk/client-s3';
import { UseS3 } from '../abilities/UseS3';
import { getObjectTags } from '../utils';

export class List extends Action {
    private listObjectsCommandInput: ListObjectsV2CommandInput;

    private returnMode: 'text' | 'json' | 'raw' = 'raw';

    private withTagsIncluded: boolean = false;

    private constructor(listObjectsCommandInput: ListObjectsV2CommandInput) {
        super();
        this.listObjectsCommandInput = listObjectsCommandInput;
    }

    public async performAs(actor: Actor): Promise<ListObjectsV2CommandOutput | (string | object | undefined)[]> {
        const listCommand = new ListObjectsV2Command(this.listObjectsCommandInput);
        const s3Client = UseS3.as(actor, this.abilityAlias).getClient();
        // return s3Client.send(listCommand);
        const res = await s3Client.send(listCommand);

        if (this.returnMode === 'raw') {
            if (this.withTagsIncluded && res.Contents) {
                // Fetch tags for each object (be aware of rate limits)
                const objectsWithTags = await Promise.all(
                    res.Contents.map(async (obj) => {
                        const tags = await getObjectTags(s3Client, this.listObjectsCommandInput.Bucket!, obj.Key!, 'raw');
                        return { ...obj, Tags: tags };
                    }),
                );
                return objectsWithTags;
            }
            return res;
        }

        const listContent = res.Contents ?? [];

        if (this.returnMode === 'json') {
            if (this.withTagsIncluded) {
                // Fetch tags for each object (be aware of rate limits)
                const objectsWithTags = await Promise.all(
                    listContent.map(async (obj) => {
                        const tags = await getObjectTags(s3Client, this.listObjectsCommandInput.Bucket!, obj.Key!, 'json');
                        return { ...obj, Tags: tags };
                    }),
                );
                return objectsWithTags;
            }
            return listContent;
        }

        return listContent.map((item) => item.Key);
    }

    /**
     * Lists objects in an S3 bucket
     *
     * @param listObjectsCommandInput list objects command input
     * @returns an instance of List
     */
    public static objects(listObjectsCommandInput: ListObjectsV2CommandInput): List {
        const instance = new List(listObjectsCommandInput);
        instance.setCallStackInitializeCalledWith({ listObjectsCommandInput });
        return instance;
    }

    /**
     * Returns the list as JSON
     *
     * @returns an instance of List
     */
    public get asText(): List {
        this.returnMode = 'text';
        return this;
    }

    /**
     * Returns the list as JSON
     *
     * @returns an instance of List
     */
    public get asJson(): List {
        this.returnMode = 'json';
        return this;
    }

    /**
     * Includes tags in the list
     *
     * @returns an instance of List
     */
    public get withTags(): List {
        this.withTagsIncluded = true;
        return this;
    }
}
