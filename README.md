# auto-assignment

## Example

```yaml
name: Test

on:
    pull_request:
        types: [opened]

jobs:
    test:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - uses: kyoya0819/auto-assignment@v1
              with:
                  token: ${{ secrets.GITHUB_TOKEN }}
                  user: '["kyoya0819"]'
```

(C) kyoya0819 2020