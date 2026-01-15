[Back to overview](../../screenplay_elements.md)

# List

The `List` class provides a convenient way to list objects from S3. This class extends the `Action` class. 

## Table of Contents

- [List](#list)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Extends](#extends)
    - [Methods](#methods)
      - [performAs](#performas)
      - [objects](#object)
      - [withAbilityAlias](#withabilityalias)
      - [orSkipOnFail](#orskiponfail)

## Class Overview

### Extends

This class extends the `Action` class, providing a specific implementation for listing objects from S3.

### Methods

#### performAs

```typescript
public async performAs(actor: Actor): Promise<ListObjectsV2CommandOutput>;
```

- **Description:** Lists objects from S3.
- **Parameters:**
  - `actor` - The actor performing the action.
- **Returns:** `Promise<ListObjectsV2CommandOutput>` - The response object.

#### objects

*Introduced in: 1.0.0*

```typescript
public static objects(listObjectsCommandInput): List;
```

- **Description:** Create a new instance of the `List` class with the specified stream and options.
- **Parameters:**
  - `listObjectsCommandInput` - The ListObjectsV2CommandInput object.
- **Returns:** `List` - A new instance of the `List` class.

Usage:

```typescript
await actor.attemptsTo(
    List.objects(getObjectCommandInput),
);
```

#### asText

*Introduced in: 1.0.0*

```typescript
public get asText(): List;
```

- **Description:** Turn the result into plain text array of all object keys.
- **Returns:** `List` - Returns the current action.

Usage:

```typescript
await actor.attemptsTo(
    List.objects(glistObjectsCommandInput).asText,
);
```

#### asJson

*Introduced in: 1.0.0*

```typescript
public get asJson(): List;
```

- **Description:** Turn the list into a JSON object array.
- **Returns:** `List` - Returns the current action.

Usage:

```typescript
await actor.attemptsTo(
    List.objects(listObjectsCommandInput).asJson,
);
```

#### withAbilityAlias

*Introduced in: 1.0.0*

```typescript
public withAbilityAlias(alias: string): List;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `List` - Returns the current action.

Usage:

```typescript
await actor.attemptsTo(
    List.objects(getObjectCommandInput).withAbilityAlias('myAlias'),
);
```

#### orSkipOnFail

*Introduced in: 1.0.0*

```typescript
public get orSkipOnFail(): List;
```

- **Description:** Allows to skip an action on fail.
- **Returns:** `List` - Returns the current action.

Usage:

```typescript
await actor.attemptsTo(
    List.objects(getObjectCommandInput).orSkipOnFail,
);
```

[Back to overview](../../screenplay_elements.md)