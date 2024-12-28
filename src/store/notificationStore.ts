import { create } from 'zustand';
import type { Notification } from '../types';
import { getNotifications, markNotificationAsRead } from '../lib/api/notifications';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: Error | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
  fetchNotifications: async () => {
    set({ loading: true });
    try {
      const notifications = await getNotifications();
      set({
        notifications,
        unreadCount: notifications.filter(n => !n.read_at).length,
        loading: false,
      });
    } catch (error) {
      set({ error: error as Error, loading: false });
    }
  },
  markAsRead: async (id: string) => {
    try {
      await markNotificationAsRead(id);
      const notifications = get().notifications.map(n =>
        n.id === id ? { ...n, read_at: new Date().toISOString() } : n
      );
      set({
        notifications,
        unreadCount: notifications.filter(n => !n.read_at).length,
      });
    } catch (error) {
      set({ error: error as Error });
    }
  },
}));