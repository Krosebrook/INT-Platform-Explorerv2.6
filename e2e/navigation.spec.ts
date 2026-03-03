import { test, expect } from '@playwright/test';

const NAV_ITEMS = [
  { label: 'Explorer', path: '/explorer', group: 'Discover' },
  { label: 'Comparison', path: '/comparison', group: 'Discover' },
  { label: 'Matrix', path: '/matrix', group: 'Discover' },
  { label: 'Intelligence Engine', path: '/intelligence', group: 'Discover' },
  { label: 'Saved Stacks', path: '/stacks', group: 'Discover' },
  { label: 'ROI Calculator', path: '/roi', group: 'Evaluate' },
  { label: 'Assessment', path: '/assessment', group: 'Evaluate' },
  { label: 'Strategy', path: '/strategy', group: 'Evaluate' },
  { label: 'RFP Generator', path: '/rfp', group: 'Evaluate' },
  { label: 'Profile Builder', path: '/profile-builder', group: 'Build' },
  { label: 'Agent Builder', path: '/agent-builder', group: 'Build' },
  { label: 'System Baseline', path: '/baseline', group: 'Build' },
  { label: 'Dashboard', path: '/dashboard', group: 'Operate' },
  { label: 'Analytics', path: '/analytics', group: 'Operate' },
  { label: 'Deployment', path: '/deployment', group: 'Operate' },
  { label: 'Governance', path: '/governance', group: 'Operate' },
  { label: 'Collaboration', path: '/collaboration', group: 'Operate' },
  { label: 'Microsoft', path: '/ecosystem', group: 'Ecosystem' },
  { label: 'App Marketplace', path: '/marketplace', group: 'Ecosystem' },
  { label: 'MCP Tools', path: '/mcp-tools', group: 'Ecosystem' },
  { label: 'Knowledge Base', path: '/knowledge', group: 'Resources' },
  { label: 'Best Practices', path: '/best-practices', group: 'Resources' },
  { label: 'Feature Guides', path: '/feature-guides', group: 'Resources' },
  { label: 'Operations Manual', path: '/operations', group: 'Resources' },
  { label: 'Reference Library', path: '/reference', group: 'Resources' },
  { label: 'FAQ', path: '/faq', group: 'Resources' },
  { label: 'Settings', path: '/settings', group: 'Settings' },
] as const;

test.describe('Sidebar Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-testid="text-app-title"]')).toBeVisible();
  });

  test('app loads and shows sidebar', async ({ page }) => {
    const sidebar = page.locator('[data-slot="sidebar"]');
    await expect(sidebar).toBeAttached();
    await expect(page.locator('[data-testid="text-app-title"]')).toHaveText('INT Platform Explorer');
    for (const groupLabel of ['Discover', 'Evaluate', 'Build', 'Operate', 'Ecosystem', 'Resources', 'Settings']) {
      await expect(page.locator('[data-sidebar="group-label"]', { hasText: groupLabel })).toBeAttached();
    }
  });

  test('default route redirects to /explorer', async ({ page }) => {
    await expect(page).toHaveURL(/\/explorer$/);
  });

  test.describe('Route navigation via sidebar', () => {
    for (const item of NAV_ITEMS) {
      test(`navigates to ${item.path} when clicking "${item.label}"`, async ({ page }) => {
        const menuButton = page.locator('[data-sidebar="menu-button"]', { hasText: item.label });
        if (!(await menuButton.isVisible())) {
          const groupLabel = page.locator('[data-sidebar="group-label"]', { hasText: item.group });
          await groupLabel.click();
          await expect(menuButton).toBeVisible();
        }
        await menuButton.click();
        await expect(page).toHaveURL(new RegExp(`${item.path}$`));
        await expect(page.locator('#main-content')).toBeVisible();
        await expect(menuButton).toHaveAttribute('data-active', 'true');
      });
    }
  });

  test('sidebar collapse and expand', async ({ page }) => {
    const sidebar = page.locator('[data-slot="sidebar"]');
    await expect(sidebar).toHaveAttribute('data-state', 'expanded');
    await page.locator('[data-sidebar="trigger"]').click();
    await expect(sidebar).toHaveAttribute('data-state', 'collapsed');
    await page.locator('[data-sidebar="trigger"]').click();
    await expect(sidebar).toHaveAttribute('data-state', 'expanded');
  });

  test('sidebar active state highlights current route', async ({ page }) => {
    const explorerButton = page.locator('[data-sidebar="menu-button"]', { hasText: 'Explorer' });
    await expect(explorerButton).toHaveAttribute('data-active', 'true');

    const matrixButton = page.locator('[data-sidebar="menu-button"]', { hasText: 'Matrix' });
    await matrixButton.click();
    await expect(page).toHaveURL(/\/matrix$/);
    await expect(matrixButton).toHaveAttribute('data-active', 'true');
    await expect(explorerButton).toHaveAttribute('data-active', 'false');
  });
});
