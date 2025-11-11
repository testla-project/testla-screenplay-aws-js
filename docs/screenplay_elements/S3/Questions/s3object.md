[Back to overview](../../screenplay_elements.md)

# S3Object

The `Object` class provides a way to verify if an object exists on S3. It allows for positive and negative checks. This class extends the `Question<boolean>` class.

## Table of Contents

- [S3Object](#s3object)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Extends](#extends)
    - [Methods](#methods)
      - [answeredBy](#answeredby)
      - [to](#to)
      - [notTo](#notto)
      - [exist](#exist)
      - [withAbilityAlias](#withabilityalias)
      - [failAsFalse](#failasfalse)

## Class Overview

### Extends

This class extends the `Question<boolean>` class, providing specific functionality for verifying Objects on S3.

### Methods

#### answeredBy

```typescript
public async answeredBy(actor: Actor): Promise<boolean>;
```

- **Description:** Perform the verification based on the specified action.
- **Parameters:**
  - `actor` - The actor performing the action.
- **Returns:** `Promise<boolean>` - The verification result (true or false).

#### to

*Introduced in: 1.0.0*

```typescript
static get to(): S3Object;
```

- **Description:** Create a new instance of the `S3Object` class for positive verification.
- **Returns:** `S3Object` - A new instance of the `S3Object` class.

#### notTo

*Introduced in: 1.0.0*

```typescript
static get notTo(): S3Object;
```

- **Description:** Create a new instance of the `S3Object` class for negative verification.
- **Returns:** `S3Object` - A new instance of the `S3Object` class.

#### exist

*Introduced in: 1.0.0*

```typescript
public exist(headObjectCommandInput: HeadObjectCommandInput): S3Object;
```

- **Description:** Set up the verification for the response status code.
- **Parameters:**
  - `headObjectCommandInput` - The HeadObjectCommandInput definition.
- **Returns:** `S3Object` - The updated instance of the `S3Object` class.

Usage:

```typescript
// To verify that the object exists
await actor.asks(
    S3Object.to.exist(headObjectCommandInput),
);
// To verify that the object does not exist
await actor.asks(
    S3Object.notTo.exist(headObjectCommandInput),
);
```

#### withAbilityAlias

*Introduced in: 1.0.0*

```typescript
public withAbilityAlias(alias: string): S3Object;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `S3Object` - Returns the current question.

Usage:

```typescript
// Example based on exist check
await actor.asks(
    S3Object.to.exist(headObjectCommandInput).withAbilityAlias('myAlias'),
);
```

#### failAsFalse

*Introduced in: 1.0.0*

```typescript
public get failAsFalse(): S3Object;
```

- **Description:** Returns false instead of failing when exception occurrs.
- **Returns:** `S3Object` - Returns the current question.

Usage:

```typescript
// get evaluation result based on exists check
const evaluationResult = await actor.asks(
    S3Object.to.exist(headObjectCommandInput).failAsFalse,
);
// do whatever necessary with the result
```

[Back to overview](../../screenplay_elements.md)