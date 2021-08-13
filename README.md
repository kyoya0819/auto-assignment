# auto-assignment

## Arguments

| name    | description                              | required | default         | format            |
|:--------|:-----------------------------------------|:---------|:----------------|:------------------|
| `token` | GitHub token                             | `true`   | -               | `string`          |
| `users` | Users name of the person to be assigned. | `true`   | -               | `json` (`string`) |
| `count` | Number of Users to be assigned.          | `false`  | Number of users | `number`/`string` |

## Example

```yaml
name: AutoAssignment

on:
    pull_request:
        types: [opened]

jobs:
    assignment:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - uses: kyoya0819/auto-assignment@v1.2.0
              with:
                  token: ${{ secrets.GITHUB_TOKEN }}
                  users: '["YOUR USERNAME"]'
```

## LICENSE

MIT LICENSE