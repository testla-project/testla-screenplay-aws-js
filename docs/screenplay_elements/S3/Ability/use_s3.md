[Back to overview](../../screenplay_elements.md)

# UseS3

The `UseS3` class is part of a testing library built on top of AWS S3, implementing the Screenplay pattern. This class extends the `Ability` class from the '@testla/screenplay' library and provides methods to interact with S3 for testing purposes.

## Table of Contents

- [UseS3](#uses3)
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
public getClient(): S3Client
```

- **Description:** Get the s3 client associated with this instance.
- **Returns:** `S3Client` - The AWS S3 client.

Usage:

```typescript
// inside an actions performAs method
const s3Client = UseS3.as(actor, this.abilityAlias).getClient();
// now you can use the client
```

#### using

```typescript
public static using(settings: AwsSettings): UseS3
```

- **Description:** Initialize the `UseS3` ability by passing an `AwsSettings` object.
- **Parameters:**
  - `settings` - The AWS Settings.
- **Returns:** `UseS3` - The initialized `UseS3` object.

Usage:

```typescript
actor.can(UseS3.using(settings))
```

#### as

```typescript
public static as(actor: Actor, alias?: string): UseS3
```

- **Description:** Use this ability as an actor.
- **Parameters:**
  - `actor` - The actor object.
  - `alias` - (Optional) The alias for the ability
- **Returns:** `UseS3` - The ability to use S3 as the actor, optionally with an alias name.

[Back to overview](../../screenplay_elements.md)