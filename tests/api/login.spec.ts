import { Utility } from './../../utilities/utils';
import { ApiPath } from '../../api/api-path';
import { expect, test } from '../../pages/base-page';
import { Constants } from '../../utilities/constants';
test.describe(
  'API - Login',
  {
    tag: ['@login', '@regression'],
  },
  () => {
    test(
      'API - login with valid credentials',
      {
        tag: ['@smoke'],
      },
      async ({ apiHelper }) => {
        const encryptPassword = Utility.encodePassword(Constants.PASSWORD);
        const response = await apiHelper.post(ApiPath.login, {
          username: Constants.USERNAME,
          password: encryptPassword,
        });

        expect(response.status()).toBe(200);

        const bodyText = await response.text();

        // Validate response format
        expect(bodyText).toContain('Auth_token:');

        // Extract token value
        const token = bodyText.split('Auth_token:')[1].trim();

        expect(token).toBeTruthy();
      },
    );
  },
);
