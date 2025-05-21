[Back to overview](../guides.md)

# Writing tests

Testla tests are simple, they
- perform tasks, and
- ask about the state against expectations

There is no need to wait for anything prior to performing a task. 

You will learn:
- How to write the first test
- How to perform tasks and actions
- How to use questions

# First test
Take a look at the following example to see how to write a test. 

```typescript
test.describe('Check message on kinesis stream', () => {
    // The test uses the defined Actor Andy from the fixture
    test('is on stream', async ({ Andy }) => {
        // Reads messages from stream
        const records = await Andy.attemptsTo(Get.recordsFrom('my-stream'));
        // Asks if a given message is on the stream
        await Andy.asks(Collection.includes.entry(records, recordToFind));
    });
});
```
[Back to overview](../guides.md)
