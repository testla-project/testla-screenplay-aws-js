import { Ability, Actor } from '@testla/screenplay';
import { BatchClient } from '@aws-sdk/client-batch';
import type { AwsSettings } from '../../types';

export class UseBatch extends Ability {
    private batchClient;

    private constructor(settings: AwsSettings) {
        super();
        this.batchClient = new BatchClient(settings);
    }

    /**
     * Instanciates a new batch client
     *
     * @param {AwsSettings} settings like region and credentials
     * @returns {UseBatch} batch ability
     */
    public static using(settings: AwsSettings) {
        return new UseBatch(settings);
    }

    /**
     * Use this Ability as an Actor.
     *
     * @param actor
     * @returns {UseBatch} batch ability
     */
    public static as(actor: Actor, alias?: any): UseBatch {
        return actor.withAbilityTo(this, alias) as UseBatch;
    }

    /**
     * Get abilities batch client
     * @returns {BatchClient} batch client
     */
    public getClient() {
        return this.batchClient;
    }
}
