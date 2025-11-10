import { Ability, Actor } from '@testla/screenplay';
import { S3Client } from '@aws-sdk/client-s3';
import type { AwsSettings } from '../../types';

export class UseS3 extends Ability {
    private s3Client;

    private constructor(settings: AwsSettings) {
        super();
        this.s3Client = new S3Client(settings);
    }

    /**
     * Instanciates a new S3 client
     *
     * @param {AwsSettings} settings like region and credetials
     * @returns {UseS3} s3 ability
     */
    public static using(settings: AwsSettings) {
        return new UseS3(settings);
    }

    /**
     * Use this Ability as an Actor.
     *
     * @param actor
     * @returns {UseS3} s3 ability
     */
    public static as(actor: Actor, alias?: any): UseS3 {
        return actor.withAbilityTo(this, alias) as UseS3;
    }

    /**
     * Get abilities s3 client
     * @returns {S3Client} s3 client
     */
    public getClient() {
        return this.s3Client;
    }
}
