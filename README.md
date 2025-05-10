### Boarding methods

Visualization to see different boarding methods!

Demo: https://nabraj.com/blog/boarding-methods/


##### Usage:

```
import React, { lazy, Suspense } from 'react';
const BoardingAnimation = lazy(() => import('./BoardingAnimation'));

<Suspense fallback={<div>Loading...</div>}>
  <BoardingAnimation />
</Suspense>
```
