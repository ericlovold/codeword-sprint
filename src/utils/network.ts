import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export type NetworkStatus = {
  isConnected: boolean;
  connectionType: string;
  isInternetReachable: boolean;
};

export const getNetworkStatus = async (): Promise<NetworkStatus> => {
  const state = await NetInfo.fetch();

  return {
    isConnected: state.isConnected ?? false,
    connectionType: state.type,
    isInternetReachable: state.isInternetReachable ?? false,
  };
};

export const subscribeToNetworkStatus = (
  callback: (status: NetworkStatus) => void,
): (() => void) => {
  const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
    callback({
      isConnected: state.isConnected ?? false,
      connectionType: state.type,
      isInternetReachable: state.isInternetReachable ?? false,
    });
  });

  return unsubscribe;
};

export const isNetworkAvailable = async (): Promise<boolean> => {
  const status = await getNetworkStatus();
  return status.isConnected && status.isInternetReachable;
};

export async function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  let t: any;
  const timeout = new Promise<never>((_, reject) => {
    t = setTimeout(() => reject(new Error(`Request timed out after ${ms}ms`)), ms);
  });
  try {
    return await Promise.race([p, timeout]);
  } finally {
    clearTimeout(t);
  }
}
