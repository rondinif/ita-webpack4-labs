# rf-automatic-change-committed-state-action

This action is for experimental purpose only
The status of the action is "UNDER DEVELOPMENT"
Please do not use in production. 

1. The action greets `who-to-greet` ( it's a way to test that it can recevive `input parameter` ), 
1. The action prints other informations for debugging purposes, 
1. The action use information provided by the issue comment received as an event
and when possible make an automatic changes the sources of the project

## Inputs

### `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

## Outputs

### `time`

The time we greeted you.

## Example usage

```yaml
    - name: Reduce Action Event into Store
      uses: ./.github/actions/rf-automatic-change-committed-state-action

      with:
        who-to-greet: 'rondinif'
```
for example see: `.github/workflows/issues.yml` 


# bot-side hydration
`server-side hydration`
