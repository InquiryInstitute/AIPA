import { test, expect } from '@playwright/test';

/**
 * Ch1 Lab 3: Knowledge Graph Explorer
 *
 * Verifies the explorer UI loads, displays the graph, and supports querying.
 * Use with: npx playwright test tests/ch01/lab-03.spec.ts --trace on
 *
 * For student submissions: set LAB_BASE_URL to the explorer's URL (e.g., http://localhost:8080)
 * and ensure the app has data-testid attributes: graph-viz, query-input, query-submit, results.
 */

test.describe('Ch1 Lab 3: Knowledge Graph Explorer', () => {
  test('explorer loads, displays graph, and runs queries', async ({ page }) => {
    // Use fixture path when no LAB_BASE_URL; otherwise student app is at baseURL root
    const path = process.env.LAB_BASE_URL ? '/' : '/ch01-explorer/';

    await test.step('Load the explorer and confirm graph displays', async () => {
      await page.goto(path);
      const graph = page.locator('[data-testid="graph-viz"]');
      await expect(graph).toBeVisible({ timeout: 10000 });
      // Graph should contain nodes or visualization area
      await expect(graph).toHaveCount(1);
    });

    await test.step('Run a query and verify results update', async () => {
      const queryInput = page.locator('[data-testid="query-input"]');
      const querySubmit = page.locator('[data-testid="query-submit"]');
      const results = page.locator('[data-testid="results"]');

      await expect(queryInput).toBeVisible();
      await expect(querySubmit).toBeVisible();

      await queryInput.fill('author:Smith');
      await querySubmit.click();

      await expect(results).toBeVisible();
      await expect(results).not.toContainText('Results will appear here');
      // Results should show query response (Smith or similar)
      await expect(results).toContainText(/Smith|query|result/i);
    });

    await test.step('Confirm acceptance criteria: explorer launches, query works', async () => {
      // Re-verify graph is still visible after query
      await expect(page.locator('[data-testid="graph-viz"]')).toBeVisible();
    });
  });
});
