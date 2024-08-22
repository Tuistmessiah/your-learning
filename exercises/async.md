### Exercise 1: Basic Error Handling with Missing Query Parameter

**Level: Easy**

**Objective:** Create a new endpoint that expects a query parameter `name`. If the `name` parameter is missing, return an error message using `try` and `catch`.

**Instructions:**

1. Create a new `GET` endpoint `/greet`.
2. Expect a query parameter `name`.
3. If the `name` parameter is missing, throw an error.
4. Catch the error and return a 400 status with an appropriate error message.
5. If the `name` is provided, return a greeting message like "Hello, [name]!".

**Solution:**

```javascript
...
```

### Exercise 2: Parsing JSON Input with Error Handling

**Level: Medium**

**Objective:** Create a `POST` endpoint that expects a JSON body. If the body cannot be parsed (invalid JSON), catch the error and respond with an appropriate error message.

**Instructions:**

1. Create a new `POST` endpoint `/submit`.
2. Expect a JSON body with a `data` field.
3. If the JSON is invalid, catch the error and return a 400 status with an appropriate error message.
4. If the JSON is valid, return a success message with the received `data`.

**Solution:**

```javascript
...

```

### Exercise 3: Simulated Database Error Handling

**Level: Hard**

**Objective:** Create a new endpoint that simulates a database operation. If the "database" fails, catch the error and respond appropriately.

**Instructions:**

1. Create a new `GET` endpoint `/fetch-data`.
2. Simulate a database operation by generating a random number. If the number is less than 0.5, simulate a "database failure" by throwing an error.
3. Catch the error and return a 500 status with a "Database error" message.
4. If the "database" succeeds, return some mock data.

**Solution:**

```javascript
...

```
