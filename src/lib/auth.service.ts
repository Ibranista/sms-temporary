import { IUser } from '@/_types/user.interface';
import api from './services.api';

export const authService = {
  async login({ phoneNumber, password }: { phoneNumber: string; password: string }) {
    try {
      const user = await api.post('/user/login', {
        phoneNumber,
        password,
      });
      return user.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw Error(err?.response?.data?.message ? err.response.data.message : 'Error logging in');
    }
  },

  async register({
    phoneNumber,
    password,
    otp,
    images,
  }: {
    phoneNumber: string;
    password: string;
    otp: string;
    images: string;
  }) {
    try {
      const formData = new FormData();
      formData.append('phoneNumber', phoneNumber);
      formData.append('password', password);
      formData.append('otp', otp);

      if (images) {
        formData.append('images[]', images);
      }

      const user = await api.post('/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return user.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw Error(
        err?.response?.data?.message ? err.response.data.message : 'Error registering in'
      );
    }
  },

  async sendOtp({ phoneNumber }: { phoneNumber: string }) {
    try {
      const otp = await api.post(`/otp/sendotp?phoneNumber=${phoneNumber}`);
      return otp.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw Error(
        err?.response?.data?.message ? err.response.data.message : 'Error sending otp in'
      );
    }
  },

  async sendOtpForForgetPassword({ phoneNumber }: { phoneNumber: string }) {
    try {
      const otp = await api.post(`/otp/sendForgotPasswordOtp?phoneNumber=${phoneNumber}`);
      return otp.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw Error(
        err?.response?.data?.message ? err.response.data.message : 'Error sending otp in'
      );
    }
  },

  async changePassword({
    phoneNumber,
    password,
    confirmPassword,
    otp,
  }: {
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    otp: string;
  }) {
    try {
      const verifyOtp = await api.post(`/user/resetpassword`, {
        phoneNumber,
        password,
        verifiedPassword: confirmPassword,
        otp,
      });
      return verifyOtp.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw Error(
        err?.response?.data?.message ? err.response.data.message : 'Error changing password'
      );
    }
  },

  async getUserData(): Promise<IUser> {
    try {
      const user = await api.get(`/user/user`);
      return user.data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      throw Error(
        err?.response?.data?.message ? err.response.data.message : 'Error changing password'
      );
    }
  },
};
