import { Ability, Actor } from '@testla/screenplay';
import {
    KinesisClient,
} from '@aws-sdk/client-kinesis';
import type { AwsSettings } from '../../types';

export class UseKinesis extends Ability {
    private kinesisClient;

    private constructor(settings: AwsSettings) {
        super();
        this.kinesisClient = new KinesisClient(settings);
    }

    /**
     * Instanciates a new Kinesis client
     *
     * @param {AwsSettings} settings like region and credetials
     * @returns {UseKinesis} kinesis ability
     */
    public static using(settings: AwsSettings) {
        return new UseKinesis(settings);
    }

    /**
     * Use this Ability as an Actor.
     *
     * @param actor
     * @returns {UseKinesis} kinesis ability
     */
    public static as(actor: Actor, alias?: any): UseKinesis {
        return actor.withAbilityTo(this, alias) as UseKinesis;
    }

    /**
     * Get abilities kinesis client
     * @returns {KinesisClient} kinesis client
     */
    public getClient() {
        return this.kinesisClient;
    }
}
