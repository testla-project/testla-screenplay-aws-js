[Back to overview](../../screenplay_elements.md)

# Wait

The `Wait` class provides a convenient way to wait for a batch job to finish. This class extends the `Action` class. 

## Table of Contents

- [Wait](#wait)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Extends](#extends)
    - [Methods](#methods)
      - [performAs](#performas)
      - [forJobFinished](#forjobfinished)
      - [withAbilityAlias](#withabilityalias)
      - [orSkipOnFail](#orskiponfail)

## Class Overview

### Extends

This class extends the `Action` class, providing a specific implementation for waiting for a batch job to finish.

### Methods

#### performAs

```typescript
public async performAs(actor: Actor): Promise<boolean>;
```

- **Description:** Wait for batch job to finish.
- **Parameters:**
  - `actor` - The actor performing the action.
- **Returns:** `Promise<boolean>` - The response.

#### forJobFinished

*Introduced in: 1.0.0*

```typescript
public static forJobFinished(jobId, options): Wait;
```

- **Description:** Create a new instance of the `Wait` class with the specified job id and optional options. The default timeout is 30000 (30sec).
- **Parameters:**
  - `jobId` - The job id.
  - `options` - The job status check options (optional)
- **Returns:** `Wait` - A new instance of the `Wait` class.

Usage:

```typescript
await actor.attemptsTo(
    Wait.forJobFinished('myJobId', { timeout: 30000, delayBetweenRetries: 500 }),
);
```

#### withAbilityAlias

*Introduced in: 1.0.0*

```typescript
public withAbilityAlias(alias: string): Wait;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Wait` - Returns the current action.

Usage:

```typescript
await actor.attemptsTo(
    Wait.forJobFinished('myJobId').withAbilityAlias('myAlias'),
);
```

#### orSkipOnFail

*Introduced in: 1.0.0*

```typescript
public get orSkipOnFail(): Wait;
```

- **Description:** Allows to skip an action on fail.
- **Returns:** `Wait` - Returns the current action.

Usage:

```typescript
await actor.attemptsTo(
    Wait.forJobFinished('myJobId').orSkipOnFail,
);
```

[Back to overview](../../screenplay_elements.md)