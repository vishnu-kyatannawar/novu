import { UserSession } from '@novu/testing';
import { expect } from 'chai';
import { NotificationTemplateEntity } from '@novu/dal';

import { getPreference } from './helpers';

describe('Get Subscribers preferences - /subscribers/preferences/:subscriberId (GET)', function () {
  let session: UserSession;
  let template: NotificationTemplateEntity;

  beforeEach(async () => {
    session = new UserSession();
    await session.initialize();
    template = await session.createTemplate({
      noFeedId: true,
    });
  });

  it('should get subscriber preferences', async function () {
    const response = await getPreference(session);

    const data = response.data.data[0];

    expect(data.preference.channels.email).to.equal(true);
    expect(data.preference.channels.in_app).to.equal(true);
  });
});
