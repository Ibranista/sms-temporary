import {
  IBuyTicketResponse,
  IPaymentMethod,
  ITicket,
  ITicketValidityResponse,
} from '@/_types/payment.interface';
import api from './services.api';

export const paymentService = {
  async payment(): Promise<PaymentResponse> {
    try {
      const response = await api.post(`/user/checkout`);
      return response.data.data;
    } catch (error: unknown) {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      throw new Error((error as any)?.response?.data?.message || 'An error occurred');
    }
  },

  async buyTicket(
    body: Record<string, unknown>,
    selectedPaymentMethodID: string
  ): Promise<IBuyTicketResponse> {
    try {
      const response = await api.post(`/pay/initialize`, {
        ...body,
        event: '6708f8c5a924c80e86d287ec',
        paymentMethod: selectedPaymentMethodID,
      });
      return response.data.data;
    } catch (error: unknown) {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      throw new Error((error as any)?.response?.data?.message || 'An error occurred');
    }
  },

  async getMyTickets(): Promise<ITicket[]> {
    try {
      const response = await api.get(`/ticket/myTickets`);
      return response.data.data.tickets;
    } catch (error: unknown) {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      throw new Error((error as any)?.response?.data?.message || 'An error occurred');
    }
  },

  async checkTicketValidity(ticketId: string): Promise<ITicketValidityResponse> {
    try {
      const response = await api.post(`/user/admin/checkTicket`, { ticketId });
      return { message: response.data.message };
    } catch (error: unknown) {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      throw new Error((error as any)?.response?.data?.message || 'An error occurred');
    }
  },

  async getPaymentMethods(): Promise<IPaymentMethod[]> {
    try {
      const response = await api.get(`paymentMethod?status=Active`);
      return response.data.data.paymentMethods.map((method: any) => ({
        name: method.name,
        url: method.logoSecureUrl[0],
        _id: method._id,
      }));
    } catch (error: unknown) {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      throw new Error((error as any)?.response?.data?.message || 'An error occurred');
    }
  },
};
