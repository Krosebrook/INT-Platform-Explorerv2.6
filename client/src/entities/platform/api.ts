import { useQuery } from '@tanstack/react-query';
import type { Platform } from './model';
import { platforms } from './data';

export function usePlatforms() {
  return useQuery<Platform[]>({
    queryKey: ['/api/platforms'],
    initialData: platforms,
  });
}

export function usePlatform(id: string) {
  return useQuery<Platform | undefined>({
    queryKey: ['/api/platforms', id],
    initialData: platforms.find(p => p.id === id),
  });
}
