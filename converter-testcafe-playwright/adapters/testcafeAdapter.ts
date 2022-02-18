import { test } from '@playwright/test';

class FixtureAdapter {
    name: string;
    pageName: string;
    beforeCallback: (t?: any) => any;
    beforeEachCallback: (t?: any) => any;
    afterEachCallback: (t?: any) => any;

    setName(name: string) {
        this.name = name;
    }

    page(pageName: string) { this.pageName = pageName; }

    afterEach(fn: (t: any) => any) {
        this.afterEachCallback = fn;
    }

    before(fn: (t: any) => any) {
        this.beforeCallback = fn;
    }

    beforeEach(fn: (t: any) => any) {
        this.beforeEachCallback = fn;
    }
};

class TestAdapter extends FixtureAdapter {
}

const fixtureAdapter: FixtureAdapter = new FixtureAdapter();

const testAdapter: TestAdapter = new TestAdapter();

export const fixtureReplace = (name): FixtureAdapter => {
    fixtureAdapter.setName(name);
    return fixtureAdapter;
}

export const testReplace = (name, testFn: (t?: any) => Promise<void>): TestAdapter => {
    testAdapter.setName(name);

    test.describe(fixtureAdapter.name, async () => {
        test.beforeEach(async ({page}) => {
            await page.goto(fixtureAdapter.pageName);

            const beforeCallback = testAdapter.beforeCallback ||
                testAdapter.beforeEachCallback ||
                fixtureAdapter.beforeCallback ||
                fixtureAdapter.beforeEachCallback;
            if(beforeCallback) {
                page.pause();
                await page.evaluate(beforeCallback);
            }
        });

        await test(name, testFn);
    });

    return testAdapter;
};
