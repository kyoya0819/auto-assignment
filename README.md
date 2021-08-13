# auto-assignment

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