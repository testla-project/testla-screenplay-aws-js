[Back to overview](../../screenplay_elements.md)

# Put

The `Put` class provides a convenient way to put objects into S3. This class extends the `Action` class.

## Table of Contents

- [Put](#put)
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

This class extends the `Action` class, providing a specific implementation for putting objects into S3.

### Methods

#### performAs

```typescript
public async performAs(actor: Actor): Promise<any>;
```

- **Description:** Put an object into S3.
- **Parameters:**
  - `actor` - The actor performing the action.
- **Returns:** `Promise<any>` - The response object.

#### object

*Introduced in: 1.0.0*

```typescript
public static object(data: any, stream: string, options?: StreamOptions): Put;
```

- **Description:** Create a new instance of the `Put` class with the specified data, stream and options.
- **Parameters:**
  - `putObjectCommandInput` - The PutObjectCommandInput object
- **Returns:** `Put` - A new instance of the `Put` class.

Usage:

```typescript
await actor.attemptsTo(
    Put.object(putObjectCommandInput),
);
```

#### withAbilityAlias

*Introduced in: 1.0.0*

```typescript
public withAbilityAlias(alias: string): Put;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Put` - Returns the current action.

Usage:

```typescript
await actor.attemptsTo(
    Put.object(putObjectCommandInput).withAbilityAlias('myAlias'),
);
```

#### orSkipOnFail

*Introduced in: 1.0.0*

```typescript
public get orSkipOnFail(): Put;
```

- **Description:** Allows to skip an action on fail.
- **Returns:** `Put` - Returns the current action.

Usage:

```typescript
await actor.attemptsTo(
    Put.object(PutObjectCommandInput).orSkipOnFail,
);

[Back to overview](../../screenplay_elements.md)