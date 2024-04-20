import { getBucket } from '@extend-chrome/storage';

interface MyBucket {
  selectedSpaceId: string | null;
}

const bucket = getBucket<MyBucket>('my_bucket', 'sync');

export const useChromeStorage = () => {
  return {
    bucket,
  }
};