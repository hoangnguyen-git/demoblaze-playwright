import { expect } from "../pages/base-page";
import { Constants } from "../utilities/constants";
import { Utility } from "../utilities/utils";
import { ApiHelper } from "./api-helper";
import { ApiPath } from "./api-path";

export class ApiAction {
    public apiHelper: ApiHelper;

    constructor(apiHelper: ApiHelper) {
        this.apiHelper = apiHelper;
    }

    async login(username: string = Constants.USERNAME, password: string = Constants.PASSWORD): Promise<void> {
        const encryptPassword = Utility.encodePassword(password);
        const res = await this.apiHelper.post(ApiPath.login, {
            username: username,
            password: encryptPassword,
        });

        expect(res.ok()).toBeTruthy();

        expect(res.status()).toBe(200);

        const bodyText = await res.text();

        // Validate response format
        expect(bodyText).toContain('Auth_token:');

        // Extract token value
        const token = bodyText.split('Auth_token:')[1].trim();

        expect(token).toBeTruthy();
    }

    async viewCart(): Promise<any[]> {
        const res = await this.apiHelper.post(ApiPath.viewCart,
            {
                cookie: await ApiHelper.getToken(),
                flag: true
            }
        );
        expect(res.ok()).toBeTruthy();

        const body = await res.json();
        return body.Items ?? [];
    }

    async deleteItem(itemId: string): Promise<void> {
        const res = await this.apiHelper.post(ApiPath.deleteItem, {
            id: itemId,
        });

        expect(res.ok()).toBeTruthy();
    }

    async clearCart(username: string = Constants.USERNAME, password: string = Constants.PASSWORD): Promise<void> {
        const items = await this.viewCart();

        for (const item of items) {
            await this.deleteItem(item.id);
        }
    }
}
