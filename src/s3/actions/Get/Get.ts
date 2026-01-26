import { Actor, Action } from '@testla/screenplay';
import { GetObjectCommandInput, GetObjectTaggingCommandInput } from '@aws-sdk/client-s3';
import { GetObjectStrategy } from './strategies/GetObjectStrategy';
import { GetObjectTagsStrategy } from './strategies/GetObjectTagsStrategy';

type StrategyType = 'Object' | 'ObjectTags';

type Strategy = GetObjectStrategy | GetObjectTagsStrategy;

export class Get extends Action {
    private strategyType: StrategyType;

    private getCommandInput: GetObjectCommandInput | GetObjectTaggingCommandInput;

    private returnMode: 'text' | 'json' | 'raw' = 'raw';

    private constructor(strategyType: StrategyType, getObjectCommandInput: GetObjectCommandInput | GetObjectTaggingCommandInput) {
        super();
        this.strategyType = strategyType;
        this.getCommandInput = getObjectCommandInput;
    }

    public async performAs(actor: Actor) {
        const { abilityAlias } = this;
        let strategy: Strategy;
        switch (this.strategyType) {
            case 'ObjectTags':
                strategy = new GetObjectTagsStrategy(this.getCommandInput, this.returnMode);
                break;
            case 'Object':
            default:
                strategy = new GetObjectStrategy(this.getCommandInput, this.returnMode);
                break;
        }
        return strategy.execute({ actor, abilityAlias });
    }

    /**
     * Gets objects from S3
     * If not specified otherwise returns the raw GetObjectCommandOutput
     *
     * @param getObjectCommandInput get object command input
     * @returns an instance of Get
     */
    public static object(getObjectCommandInput: GetObjectCommandInput): Get {
        const instance = new Get('Object', getObjectCommandInput);
        instance.setCallStackInitializeCalledWith({ getObjectCommandInput });
        return instance;
    }

    /**
     * Get object tags from S3
     * If not specified otherwise returns the raw GetObjectTaggingCommandOutput
     *
     * @param getObjectTaggingCommandInput get object tagging command input
     * @returns an instance of Get
     */
    public static objectTags(getObjectTaggingCommandInput: GetObjectTaggingCommandInput): Get {
        const instance = new Get('ObjectTags', getObjectTaggingCommandInput);
        instance.setCallStackInitializeCalledWith({ getObjectTaggingCommandInput });
        return instance;
    }

    /**
     * Returns the S3 object as JSON
     *
     * @returns an instance of Get
     */
    public get asText(): Get {
        this.returnMode = 'text';
        return this;
    }

    /**
     * Returns the S3 object as JSON
     *
     * @returns an instance of Get
     */
    public get asJson(): Get {
        this.returnMode = 'json';
        return this;
    }
}
