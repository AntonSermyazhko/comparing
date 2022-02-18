/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable @typescript-eslint/no-loop-func */
// import Scheduler from '../../../model/scheduler';
import { expect } from '@playwright/test';
import url from '../../helpers/getPageUrl';
import {
    fixtureReplace as fixture,
    testReplace as test
} from '../adapters/testcafeAdapter';

fixture`Playwright on TestCafe API - Page reload`
    .page(url(__dirname, '../container.html'));

test('Multiple tests and multiple pages', async ({ page }) => {
    const appointments = page.locator('.dx-scheduler-appointment');
    await appointments.waitFor({ state: 'visible', timeout: 200 });
    expect(await appointments.count())
        .toEqual(1);
}).before(() => {
    createWidget(
        'dxScheduler',
        {
            dataSource: {
                store: [
                    {
                        text: 'appt-0',
                        startDate: new Date(2021, 3, 26, 9, 30),
                        endDate: new Date(2021, 3, 26, 11, 30),
                    }, {
                        text: 'appt-1',
                        startDate: new Date(2021, 3, 27, 9, 30),
                        endDate: new Date(2021, 3, 27, 11, 30),
                    }, {
                        text: 'appt-2',
                        startDate: new Date(2021, 3, 28, 9, 30),
                        endDate: new Date(2021, 3, 28, 11, 30),
                    },
                ],
                postProcess: (items) => [items[0]],
            },
            views: ['workWeek'],
            currentView: 'workWeek',
            currentDate: new Date(2021, 3, 27),
            startDayHour: 9,
            endDayHour: 19,
            height: 600,
            width: 800,
        },
    );
});
