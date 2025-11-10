import { Actor, Question } from '@testla/screenplay';
import { expect } from '@playwright/test';
import { HeadObjectCommand, HeadObjectCommandInput } from '@aws-sdk/client-s3';
import { UseS3 } from '../abilities/UseS3';
import { CheckMode } from '../../types';

/**
 * Question Class. Get a specified state for a selector like visible or enabled.
 */
export class S3Object extends Question<boolean> {
    private checkMode: CheckMode = 'positive';

    private headObjectCommandInput?: HeadObjectCommandInput;

    private constructor(checkMode: CheckMode) {
        super();
        this.checkMode = checkMode;
    }

    /**
     * Verifies if an element.
     *
     * @param {Actor} actor the actor
     * @return {boolean} if .is was called -> positive check, if .not was called -> negative check
     */
    public async answeredBy(actor: Actor): Promise<boolean> {
        const {
            headObjectCommandInput, checkMode, abilityAlias,
        } = this;

        if (!headObjectCommandInput) {
            throw new Error('HeadObjectCommandInput is not set');
        }

        const s3Client = UseS3.as(actor, abilityAlias).getClient();

        const headCommand = new HeadObjectCommand(headObjectCommandInput);

        const isExisting = await s3Client.send(headCommand)
            .then(() => true)
            .catch((err) => {
                if (err.name === 'NotFound') {
                    return false;
                }
                throw err;
            });

        expect(isExisting).toBe(checkMode === 'positive');
        return Promise.resolve(true); // if is not the expected result there will be an exception
    }

    /**
     * make the Question check for the positive.
     * @return {S3Object} new Object instance
     */
    static get to() {
        return new S3Object('positive');
    }

    /**
     * make the Question check for the negative.
     * @return {S3Object} new Object instance
     */
    static get notTo() {
        return new S3Object('negative');
    }

    /**
     * Verifies if an object exists on S3.
     *
     * @param {HeadObjectCommandInput} headObjectCommandInput
     * @return {S3Object} this S3Object instance
     */
    public exist(headObjectCommandInput: HeadObjectCommandInput): S3Object {
        this.headObjectCommandInput = headObjectCommandInput;
        this.addToCallStack({ caller: 'exist', calledWith: { headObjectCommandInput } });

        return this;
    }
}
