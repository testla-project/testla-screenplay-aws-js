[Back to overview](../../screenplay_elements.md)

# UseKinesis

The `UseKinesis` class is part of a testing library built on top of AWS Kinesis, implementing the Screenplay pattern. This class extends the `Ability` class from the '@testla/screenplay' library and provides methods to interact with Kinesis for testing purposes.

## Table of Contents

- [UseKinesis](#usekinesis)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Methods](#methods)
      - [getRequestContext](#getrequestcontext)
      - [using](#using)
      - [as](#as)

## Class Overview

### Methods

#### getClient

*Introduced in: 1.0.0*

```typescript
public getClient(): KinesisClient
```

- **Description:** Get the kinesis client associated with this instance.
- **Returns:** `KinesisClient` - The AWS kinesis client.

#### using

```typescript
public static using(settings: AwsSettings): UseKinesis
```

- **Description:** Initialize the `UseKinesis` ability by passing an `AwsSettings` object.
- **Parameters:**
  - `settings` - The AWS Settings.
- **Returns:** `UseKinesis` - The initialized `UseKinesis` object.

#### as

```typescript
public static as(actor: Actor, alias?: string): UseKinesis
```

- **Description:** Use this ability as an actor.
- **Parameters:**
  - `actor` - The actor object.
  - `alias` - (Optional) The alias for the ability
- **Returns:** `UseKinesis` - The ability to use Kinesis as the actor, optionally with an alias name.

[Back to overview](../../screenplay_elements.md)