import { useEffect } from 'react';
import { useRouter } from 'expo-router';
export default function CodewordTabRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/help');
  }, []);
  return null;
}
