# auto-assignment

## Example

```yaml
name: Test

on:
    pull_request:
        types: [opened]

jobs:
    assignment:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - uses: kyoya0819/auto-assignment@v1.0.2
              with:
                  token: ${{ secrets.GITHUB_TOKEN }}
                  user: '["YOUR USERNAME"]'
```

## LICENSE

MIT LICENSE
