import { APIRequestContext, APIResponse } from '@playwright/test';
import { Constants } from '../utilities/constants';
import { expect } from '../pages/base-page';
import axios from 'axios';
import { ApiPath } from './api-path';
import { Utility } from '../utilities/utils';
export class ApiHelper {
  private requestContext: APIRequestContext;
  private baseURL: string = Constants.API_BASE_URL; // Default base URL
  private static token: string | undefined;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  private defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  private async mergeHeaders(headers: Record<string, string> = {}): Promise<Record<string, string>> {
    return {
      ...headers, // per-request headers override defaults
    };
  }

  private buildUrl(endpoint: string): string {
    // Ensure no duplicate slashes
    return `${this.baseURL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
  }

  private static async fetchToken(username: string = Constants.USERNAME, password: string = Constants.PASSWORD): Promise<string> {
    const encryptPassword = Utility.encodePassword(password);
    const res = await axios.post(Constants.API_BASE_URL + ApiPath.login, {
      username: username,
      password: encryptPassword,
    });


    expect(res.status).toBe(200);

    const bodyText = res.data;

    // Validate response format
    expect(bodyText).toContain('Auth_token:');

    // Extract token value
    const token = bodyText.split('Auth_token:')[1].trim();

    expect(token).toBeTruthy();
    return token;
  }

  static async getToken(): Promise<string> {
    if (!this.token) {
      this.token = await this.fetchToken();
    }
    return this.token;
  }

  async get(endpoint: string, headers: Record<string, string> = {}): Promise<APIResponse> {
    return await this.requestContext.get(this.buildUrl(endpoint), {
      headers: await this.mergeHeaders(headers),
    });
  }

  async post(endpoint: string, data?: any, headers: Record<string, string> = {}): Promise<APIResponse> {
    return await this.requestContext.post(this.buildUrl(endpoint), {
      headers: await this.mergeHeaders(headers),
      data,
    });
  }

  async put(endpoint: string, data: any, headers: Record<string, string> = {}): Promise<APIResponse> {
    return await this.requestContext.put(this.buildUrl(endpoint), {
      headers: await this.mergeHeaders(headers),
      data,
    });
  }

  async delete(endpoint: string, headers: Record<string, string> = {}): Promise<APIResponse> {
    return await this.requestContext.delete(this.buildUrl(endpoint), {
      headers: await this.mergeHeaders(headers),
    });
  }

  // Optional: update baseURL at runtime
  setBaseURL(url: string): void {
    this.baseURL = url;
  }

  // Optional: update default headers at runtime
  setDefaultHeader(key: string, value: string): void {
    this.defaultHeaders[key] = value;
  }
}
