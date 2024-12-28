import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';

export function useAuth() {
  const { user, loading, error, setUser, setError } = useAuthStore();

  useEffect(() => {
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          try {
            const { data: profile } = await supabase
              .from('users')
              .select('*')
              .eq('id', session?.user?.id)
              .maybeSingle();
            
            setUser(profile);
          } catch (error) {
            setError(error as Error);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setError]);

  return { user, loading, error };
}