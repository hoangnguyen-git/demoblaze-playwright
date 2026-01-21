import { APIRequestContext, APIResponse } from '@playwright/test';
import { Constants } from '../utilities/constants';

export class ApiHelper {
    private requestContext: APIRequestContext;
    private baseURL: string = Constants.API_BASE_URL; // Default base URL
    private static token: string | undefined = '';

    constructor(requestContext: APIRequestContext) {
        this.requestContext = requestContext;
    }

    private defaultHeaders: Record<string, string> = {
        Authorization: `Bearer ${ApiHelper.token}`,
    };

    private async mergeHeaders(headers: Record<string, string> = {}): Promise<Record<string, string>> {
        return {
            Authorization: `Bearer ${ApiHelper.token}`,
            'api-key': Constants.API_KEY,
            ...headers, // per-request headers override defaults
        };
    }

    private buildUrl(endpoint: string): string {
        // Ensure no duplicate slashes
        return `${this.baseURL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
    }

    async get(endpoint: string, headers: Record<string, string> = {}): Promise<APIResponse> {
        return await this.requestContext.get(this.buildUrl(endpoint), {
            headers: await this.mergeHeaders(headers),
        });
    }

    async post(endpoint: string, data: any, headers: Record<string, string> = {}): Promise<APIResponse> {
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
