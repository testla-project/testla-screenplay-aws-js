[Back to overview](../../screenplay_elements.md)

# UseBatch

The `UseBatch` class is part of a testing library built on top of AWS Batch, implementing the Screenplay pattern. This class extends the `Ability` class from the '@testla/screenplay' library and provides methods to interact with Batch for testing purposes.

## Table of Contents

- [UseBatch](#usebatch)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
      - [getClient](#getclient)
      - [using](#using)
      - [as](#as)

## Class Overview

### Methods

#### getClient

*Introduced in: 1.0.0*

```typescript
public getClient(): BatchClient
```

- **Description:** Get the batch client associated with this instance.
- **Returns:** `BatchClient` - The AWS batch client.

Usage:

```typescript
// inside an actions performAs method
const batchClient = UseBatch.as(actor, this.abilityAlias).getClient();
// now you can use the client
```

#### using

```typescript
public static using(settings: AwsSettings): UseBatch
```

- **Description:** Initialize the `UseBatch` ability by passing an `AwsSettings` object.
- **Parameters:**
  - `settings` - The AWS Settings.
- **Returns:** `UseBatch` - The initialized `UseBatch` object.

Usage:

```typescript
actor.can(UseBatch.using(settings))
```

#### as

```typescript
public static as(actor: Actor, alias?: string): UseBatch
```

- **Description:** Use this ability as an actor.
- **Parameters:**
  - `actor` - The actor object.
  - `alias` - (Optional) The alias for the ability
- **Returns:** `UseBatch` - The ability to use batch as the actor, optionally with an alias name.

[Back to overview](../../screenplay_elements.md)