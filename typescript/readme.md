## how to

`npm install`

`npm run node-votes`

built using observables

use function: `getVotedNodes(voterId: userAddress)` where `voterId` is the address of the voter as a `string`

```typescript
getVotedNodes(userAddress).subscribe((votes) => {
...
});
```
