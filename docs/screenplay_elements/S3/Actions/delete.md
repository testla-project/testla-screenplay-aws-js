[Back to overview](../../screenplay_elements.md)

# Delete

The `Delete` class provides a convenient way to delete objects from S3. This class extends the `Action` class. 

## Table of Contents

- [Delete](#delete)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Extends](#extends)
    - [Methods](#methods)
      - [performAs](#performas)
      - [object](#object)
      - [withAbilityAlias](#withabilityalias)
      - [orSkipOnFail](#orskiponfail)

## Class Overview

### Extends

This class extends the `Action` class, providing a specific implementation for deleting objects from S3.

### Methods

#### performAs

```typescript
public async performAs(actor: Actor): Promise<any>;
```

- **Description:** Delete an object from S3.
- **Parameters:**
  - `actor` - The actor performing the action.
- **Returns:** `Promise<any>` - The response object.

#### object

*Introduced in: 1.0.0*

```typescript
public static object(deleteObjectCommandInput): Delete;
```

- **Description:** Create a new instance of the `Delete` class with the specified stream and options.
- **Parameters:**
  - `deleteObjectCommandInput` - The DeleteObjectCommandInput object
- **Returns:** `Delete` - A new instance of the `Delete` class.

Usage:

```typescript
await actor.attemptsTo(
    Delete.object(deleteObjectCommandInput),
);
```

#### withAbilityAlias

*Introduced in: 1.0.0*

```typescript
public withAbilityAlias(alias: string): Delete;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Delete` - Returns the current action.

Usage:

```typescript
await actor.attemptsTo(
    Delete.object(deleteObjectCommandInput).withAbilityAlias('myAlias'),
);
```

#### orSkipOnFail

*Introduced in: 1.0.0*

```typescript
public get orSkipOnFail(): Get;
```

- **Description:** Allows to skip an action on fail.
- **Returns:** `Delete` - Returns the current action.

Usage:

```typescript
await actor.attemptsTo(
    Delete.object(deleteObjectCommandInput).orSkipOnFail,
);
```

[Back to overview](../../screenplay_elements.md)