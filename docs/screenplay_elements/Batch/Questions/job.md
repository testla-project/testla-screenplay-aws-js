[Back to overview](../../screenplay_elements.md)

# Job

The `Job` class provides a way to verify if a batch job is in a certain state. It allows for positive and negative checks. This class extends the `Question<boolean>` class.

## Table of Contents

- [Job](#job)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Extends](#extends)
    - [Methods](#methods)
      - [answeredBy](#answeredby)
      - [toHave](#tohave)
      - [notToHave](#nottohave)
      - [toBe](#tobe)
      - [notToBe](#nottobe)
      - [status](#status)
      - [finished](#finished)
      - [withAbilityAlias](#withabilityalias)
      - [failAsFalse](#failasfalse)

## Class Overview

### Extends

This class extends the `Question<boolean>` class, providing specific functionality for verifying states on batch jobs.

### Methods

#### answeredBy

```typescript
public async answeredBy(actor: Actor): Promise<boolean>;
```

- **Description:** Perform the verification based on the specified action.
- **Parameters:**
  - `actor` - The actor performing the action.
- **Returns:** `Promise<boolean>` - The verification result (true or false).

#### toHave

*Introduced in: 1.0.0*

```typescript
static get toHave(): Job;
```

- **Description:** Create a new instance of the `Job` class for positive verification.
- **Returns:** `Job` - A new instance of the `Job` class.

#### notToHave

*Introduced in: 1.0.0*

```typescript
static get notToHave(): Job;
```

- **Description:** Create a new instance of the `Job` class for negative verification.
- **Returns:** `Job` - A new instance of the `Job` class.

#### toBe

*Introduced in: 1.0.0*

```typescript
static get toBe(): Job;
```

- **Description:** Create a new instance of the `Job` class for positive verification.
- **Returns:** `Job` - A new instance of the `Job` class.

#### notToBe

*Introduced in: 1.0.0*

```typescript
static get notToBe(): Job;
```

- **Description:** Create a new instance of the `Job` class for negative verification.
- **Returns:** `Job` - A new instance of the `Job` class.

#### status

*Introduced in: 1.0.0*

```typescript
public status(jobId: string, statusToLookup: JobStatus): Job;
```

- **Description:** Set up the verification for the job status.
- **Parameters:**
  - `jobId` - The job id
  - `statusToLookup` - The status to be checked against
- **Returns:** `Job` - The updated instance of the `Job` class.

Usage:

```typescript
// To verify that the job has a given status
await actor.asks(
    Job.toHave.status('myJobId', 'SUCCEEDED'),
);
// To verify that the job does not have a given status
await actor.asks(
    Job.toNotHave.status('myJobId', 'SUCCEEDED'),
);
```

#### finished

*Introduced in: 1.0.0*

```typescript
public finished(jobId: string): Job;
```

- **Description:** Set up the verification for the job to be finished.
- **Parameters:**
  - `jobId` - The job id
- **Returns:** `Job` - The updated instance of the `Job` class.

Usage:

```typescript
// To verify that the job is finished
await actor.asks(
    Job.toBe.finished('myJobId'),
);
// To verify that the job is not fnished
await actor.asks(
    Job.toNotBe.finished('myJobId'),
);
```

#### withAbilityAlias

*Introduced in: 1.0.0*

```typescript
public withAbilityAlias(alias: string): Job;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Job` - Returns the current question.

Usage:

```typescript
// Example based on exist check
await actor.asks(
    Job.toBe.finished('myJobId').withAbilityAlias('myAlias'),
);
```

#### failAsFalse

*Introduced in: 1.0.0*

```typescript
public get failAsFalse(): Job;
```

- **Description:** Returns false instead of failing when exception occurrs.
- **Returns:** `Job` - Returns the current question.

Usage:

```typescript
// get evaluation result based on exists check
const evaluationResult = await actor.asks(
    Job.toBe.finished('myJobId').failAsFalse,
);
// do whatever necessary with the result
```

[Back to overview](../../screenplay_elements.md)