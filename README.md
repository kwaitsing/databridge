# databridge-pack

easy-to-use wrapper for redis and mongodb, only works with bun.sh or deno

## Functions

> connectDatabase

connect to a mongoDB with given url

usage:

```typescript
import { connectDatabase } from databridge

const db = await connectDatabase('mongodb://username:password@localhost:27017')
```

Then use `db` as you wish, just like a normal mongodb client

> connectCache

connect to a redis server with given url

usage:

```typescript
import { connectDatabase } from databridge

const db = await connectDatabase('redis://tsingkwai:foobared@awesome.redis.server:6380')
```

Then use `db` as you wish, just like a normal redis client