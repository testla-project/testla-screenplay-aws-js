[Back to overview](../../screenplay_elements.md)

# Submit

The `Submit` class provides a convenient way to submit a new batch job. This class extends the `Action` class. 

## Table of Contents

- [Submit](#submit)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Extends](#extends)
    - [Methods](#methods)
      - [performAs](#performas)
      - [job](#object)
      - [withAbilityAlias](#withabilityalias)
      - [orSkipOnFail](#orskiponfail)

## Class Overview

### Extends

This class extends the `Action` class, providing a specific implementation for submitting a batch job.

### Methods

#### performAs

```typescript
public async performAs(actor: Actor): Promise<SubmitJobCommandOutput>;
```

- **Description:** Submit a batch job.
- **Parameters:**
  - `actor` - The actor performing the action.
- **Returns:** `Promise<SubmitJobCommandOutput>` - The response object.

#### job

*Introduced in: 1.0.0*

```typescript
public static job(submitJobCommandInput): Submit;
```

- **Description:** Create a new instance of the `Submit` class with the specified submit job command.
- **Parameters:**
  - `submitJobCommandInput` - The SubmitJobCommandInput object.
- **Returns:** `Submit` - A new instance of the `Submit` class.

Usage:

```typescript
await actor.attemptsTo(
    Submit.job(submitJobCommandInput),
);
```

#### withAbilityAlias

*Introduced in: 1.0.0*

```typescript
public withAbilityAlias(alias: string): Submit;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Submit` - Returns the current action.

Usage:

```typescript
await actor.attemptsTo(
    Submit.job(submitJobCommandInput).withAbilityAlias('myAlias'),
);
```

#### orSkipOnFail

*Introduced in: 1.0.0*

```typescript
public get orSkipOnFail(): Submit;
```

- **Description:** Allows to skip an action on fail.
- **Returns:** `Submit` - Returns the current action.

Usage:

```typescript
await actor.attemptsTo(
    Submit.job(submitJobCommandInput).orSkipOnFail,
);
```

[Back to overview](../../screenplay_elements.md)