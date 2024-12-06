import { api } from '../api';

export interface Notification {
  _id: string;
  message: string;
  type: 'system' | 'alert' | 'info';
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<Notification[], void>({
      query: () => 'notifications',
      providesTags: ['Notifications'],
    }),
    markAsRead: builder.mutation<Notification, string>({
      query: (id) => ({
        url: `notifications/${id}/read`,
        method: 'PUT',
      }),
      invalidatesTags: ['Notifications'],
    }),
    createSystemNotification: builder.mutation<
      Notification,
      { message: string; type?: string; store?: string }
    >({
      query: (data) => ({
        url: 'notifications/system',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Notifications'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useCreateSystemNotificationMutation,
} = notificationApi;