declare global {
  namespace App {
    interface Platform {
      env: {
        KV: KVNamespace;
        CDN: R2Bucket;
      };
      cf: IncomingRequestCfProperties;
      ctx: ExecutionContext;
      caches: CacheStorage;
    }
  }
}

export {};