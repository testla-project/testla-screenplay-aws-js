[Back to overview](../../screenplay_elements.md)

# Put

The `Put` class provides a convenient way to put messages on a kinesis stream. This class extends the `Action` class.

## Table of Contents

- [Put](#put)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Extends](#extends)
    - [Methods](#methods)
      - [performAs](#performas)
      - [recordTo](#recordTo)
      - [recordsTo](#recordsto)
      - [withAbilityAlias](#withabilityalias)
      - [orSkipOnFail](#orskiponfail)

## Class Overview

### Extends

This class extends the `Action` class, providing a specific implementation for putting messages to a kinesis stream.

### Methods

#### performAs

```typescript
public async performAs(actor: Actor): Promise<any>;
```

- **Description:** Puts message(s) on a kinesis stream.
- **Parameters:**
  - `actor` - The actor performing the action.
- **Returns:** `Promise<any>` - The response object.

#### recordTo

*Introduced in: 1.0.0*

```typescript
public static recordTo(data: any, stream: string, options?: StreamOptions): Put;
```

- **Description:** Create a new instance of the `Put` class with the specified data, stream and options.
- **Parameters:**
  - `data` - the data to be sent as a message to the stream
  - `stream` - stream name or arn (can be controlled via options streamIdentifier).
  - `options` (optional) - The options object to provide streamIdentifier or partitionKey
- **Returns:** `Put` - A new instance of the `Put` class.

#### recordsTo

*Introduced in: 1.0.0*

```typescript
public static recordsTo(data: any[], stream: string, options?: StreamOptions): Put;
```

- **Description:** Create a new instance of the `Put` class with the specified data array, stream and options.
- **Parameters:**
  - `data` - the data array to be sent as messages to the stream
  - `stream` - stream name or arn (can be controlled via options streamIdentifier).
  - `options` (optional) - The options object to provide streamIdentifier or partitionKey
- **Returns:** `Put` - A new instance of the `Put` class.

#### withAbilityAlias

*Introduced in: 1.0.0*

```typescript
public withAbilityAlias(alias: string): Put;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Put` - Returns the current action.

#### orSkipOnFail

*Introduced in: 1.0.0*

```typescript
public get orSkipOnFail(): Put;
```

- **Description:** Allows to skip an action on fail.
- **Returns:** `Put` - Returns the current action.

[Back to overview](../../screenplay_elements.md)