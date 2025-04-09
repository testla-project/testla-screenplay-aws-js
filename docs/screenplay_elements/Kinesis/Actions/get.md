[Back to overview](../../screenplay_elements.md)

# Get

The `Get` class provides a convenient way to read messages from a kinesis stream. This class extends the `Action` class. 

## Table of Contents

- [Get](#get)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Extends](#extends)
    - [Methods](#methods)
      - [performAs](#performas)
      - [recordsFrom](#recordsfrom)
      - [startingAt](#startingat)
      - [withAbilityAlias](#withabilityalias)
      - [orSkipOnFail](#orskiponfail)

## Class Overview

### Extends

This class extends the `Action` class, providing a specific implementation for getting messages from a kinesis stream.

### Methods

#### performAs

```typescript
public async performAs(actor: Actor): Promise<any>;
```

- **Description:** Gets messages from a kinesis stream.
- **Parameters:**
  - `actor` - The actor performing the action.
- **Returns:** `Promise<any>` - The response object.

#### recordsFrom

*Introduced in: 1.0.0*

```typescript
public static recordsFrom(stream: string, options?: StreamOptions): Get;
```

- **Description:** Create a new instance of the `Get` class with the specified stream and options.
- **Parameters:**
  - `stream` - stream name or arn (can be controlled via options streamIdentifier).
  - `options` (optional) - The options object to provide streamIdentifier or partitionKey
- **Returns:** `Get` - A new instance of the `Get` class.

#### startingAt

*Introduced in: 1.0.0*

```typescript
public startingAt(startTime: Date): Get;
```

- **Description:** Sets the start from which the records are read.
- **Parameters:**
  - `startTime` - Date object
- **Returns:** `Get` - The updated instance of the `Get` class.

#### withAbilityAlias

*Introduced in: 1.0.0*

```typescript
public withAbilityAlias(alias: string): Get;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Get` - Returns the current action.

#### orSkipOnFail

*Introduced in: 1.0.0*

```typescript
public get orSkipOnFail(): Get;
```

- **Description:** Allows to skip an action on fail.
- **Returns:** `Get` - Returns the current action.

[Back to overview](../../screenplay_elements.md)