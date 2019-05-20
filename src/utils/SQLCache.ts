import { InMemoryLRUCache } from 'apollo-server-caching';
import sequelize = require('sequelize');

export default class SQLCache {
  private cache: InMemoryLRUCache<string>;
  constructor(cache = new InMemoryLRUCache()) {
    this.cache = cache;
  }

  public getCached<TFindOptions>(
    func: (opts: sequelize.FindOptions<TFindOptions>) => any,
    query: sequelize.FindOptions<TFindOptions>,
  ): Promise<any> {
    const key = `${func.name}:${JSON.stringify(query)}`;
    return this.cache.get(key).then(entry => {
      if (entry) {
        return Promise.resolve(entry);
      }
      return func(query).then(value => {
        this.cache.set(key, value);
        return value;
      });
    });
  }
}
