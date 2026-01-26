[Back to overview](../../screenplay_elements.md)

# Get

The `Get` class provides a convenient way to get objects from S3. This class extends the `Action` class. 

## Table of Contents

- [Get](#get)
  - [Table of Contents](#table-of-contents)
  - [Class Overview](#class-overview)
    - [Extends](#extends)
    - [Methods](#methods)
      - [performAs](#performas)
      - [object](#object)
      - [objectTags](#objecttags)
      - [asText](#astext)
      - [asJson](#asjson)
      - [withAbilityAlias](#withabilityalias)
      - [orSkipOnFail](#orskiponfail)

## Class Overview

### Extends

This class extends the `Action` class, providing a specific implementation for getting objects from S3.

### Methods

#### performAs

```typescript
public async performAs(actor: Actor): Promise<any>;
```

- **Description:** Get an object from S3. If not specified otherwise returns the raw GetObjectCommandOutput.
- **Parameters:**
  - `actor` - The actor performing the action.
- **Returns:** `Promise<any>` - The response object.

#### object

*Introduced in: 1.0.0*

```typescript
public static object(getObjectCommandInput): Get;
```

- **Description:** Create a new instance of the `Get` class with the specified getObjectCommandInput.
- **Parameters:**
  - `getObjectCommandInput` - The GetObjectCommandInput object.
- **Returns:** `Get` - A new instance of the `Get` class.

Usage:

```typescript
await actor.attemptsTo(
    Get.object(getObjectCommandInput),
);
```

#### objectTags

*Introduced in: 1.0.0*

```typescript
public static objectTags(getObjectTaggingCommandInput): Get;
```

- **Description:** Create a new instance of the `Get` class with the specified getObjectTaggingCommandInput.
- **Parameters:**
  - `getObjectTaggingCommandInput` - The GetObjectTaggingCommandInput object.
- **Returns:** `Get` - A new instance of the `Get` class.

Usage:

```typescript
await actor.attemptsTo(
    Get.objectTags(getObjectTaggingCommandInput),
);
```

#### asText

*Introduced in: 1.0.0*

```typescript
public get asText(): Get;
```

- **Description:** Turn the result into plain text.
- **Returns:** `Get` - Returns the current action.

Usage:

```typescript
await actor.attemptsTo(
    Get.object(getObjectCommandInput).asText,
);
```

#### asJson

*Introduced in: 1.0.0*

```typescript
public get asJson(): Get;
```

- **Description:** Turn the result into a JSON object (by trying to parse the content).
- **Returns:** `Get` - Returns the current action.

Usage:

```typescript
await actor.attemptsTo(
    Get.object(getObjectCommandInput).asJson,
);
```

#### withAbilityAlias

*Introduced in: 1.0.0*

```typescript
public withAbilityAlias(alias: string): Get;
```

- **Description:** Defines the ability alias to be used during execution.
- **Parameters:**
  - `alias` - The alias.
- **Returns:** `Get` - Returns the current action.

Usage:

```typescript
await actor.attemptsTo(
    Get.object(getObjectCommandInput).withAbilityAlias('myAlias'),
);
```

#### orSkipOnFail

*Introduced in: 1.0.0*

```typescript
public get orSkipOnFail(): Get;
```

- **Description:** Allows to skip an action on fail.
- **Returns:** `Get` - Returns the current action.

Usage:

```typescript
await actor.attemptsTo(
    Get.object(getObjectCommandInput).orSkipOnFail,
);
```

[Back to overview](../../screenplay_elements.md)