import { Actor, Question } from '@testla/screenplay';
import assert from 'assert';
import { UseBatch } from '../abilities/UseBatch';
import { CheckMode } from '../../types';
import { checkJobHasStatus } from '../utils';
import { JobStatus } from '../types';

/**
 * Question Class. Get a specified state for a selector like visible or enabled.
 */
export class Job extends Question<boolean> {
    private checkMode: CheckMode = 'positive';

    private statusToLookup?: JobStatus[];

    private jobId?: string;

    private constructor(checkMode: CheckMode) {
        super();
        this.checkMode = checkMode;
    }

    /**
     * Verifies if a job.
     *
     * @param {Actor} actor the actor
     * @return {boolean} if .is was called -> positive check, if .not was called -> negative check
     */
    public async answeredBy(actor: Actor): Promise<boolean> {
        const {
            jobId, checkMode, abilityAlias, statusToLookup = [],
        } = this;

        if (!jobId) {
            throw new Error('Job ID is not set');
        }

        const batchClient = UseBatch.as(actor, abilityAlias).getClient();
        assert.equal(await checkJobHasStatus(batchClient, jobId, statusToLookup), checkMode === 'positive');
        return Promise.resolve(true); // if is not the expected result there will be an exception
    }

    /**
     * make the Question check for the positive.
     * @return {Job} new Job instance
     */
    static get toHave() {
        return new Job('positive');
    }

    /**
     * make the Question check for the negative.
     * @return {Job} new Job instance
     */
    static get notToHave() {
        return new Job('negative');
    }

    /**
     * make the Question check for the positive.
     * @return {Job} new Job instance
     */
    static get toBe() {
        return new Job('positive');
    }

    /**
     * make the Question check for the negative.
     * @return {Job} new Job instance
     */
    static get notToBe() {
        return new Job('negative');
    }

    /**
     * Verifies if an job has a wanted status.
     *
     * @param {String} jobId the job id
     * @param {JobStatus} statusToLookup the job status to look for
     * @return {Job} this Job instance
     */
    public status(jobId: string, statusToLookup: JobStatus): Job {
        this.jobId = jobId;
        this.statusToLookup = [statusToLookup];
        this.addToCallStack({ caller: 'status', calledWith: { jobId, statusToLookup } });

        return this;
    }

    /**
     * Veries if an job has finished (SUCCEEDED or FAILED).
     *
     * @param {String} jobId the job id
     * @return {Job} this Job instance
     */
    public finished(jobId: string): Job {
        this.jobId = jobId;
        this.statusToLookup = ['SUCCEEDED', 'FAILED'];
        this.addToCallStack({ caller: 'finished', calledWith: { jobId } });

        return this;
    }
}
