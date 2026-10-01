import { Course, Book, PpdbRegistration, Contact } from '@/types/admin';

type CacheItem<T> = {
  data: T;
  timestamp: number;
};

class AdminCache {
  private cache: Record<string, CacheItem<any>> = {};
  private TTL = 1000 * 60 * 5; // 5 minutes

  get<T>(key: string): T | null {
    const item = this.cache[key];
    if (!item) return null;
    if (Date.now() - item.timestamp > this.TTL) {
      delete this.cache[key];
      return null;
    }
    return item.data;
  }

  set<T>(key: string, data: T): void {
    this.cache[key] = {
      data,
      timestamp: Date.now(),
    };
  }

  flush(keyPrefix?: string): void {
    if (!keyPrefix) {
      this.cache = {};
      return;
    }
    for (const key in this.cache) {
      if (key.startsWith(keyPrefix)) {
        delete this.cache[key];
      }
    }
  }
}

export const adminCache = new AdminCache();
