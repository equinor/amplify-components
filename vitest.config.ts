import viteTsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [viteTsconfigPaths() as any],
  test: {
server: {
  deps: {
    inline: ['@equinor/subsurface-app-management']
  }
},
    globals: true,
    environment: 'jsdom',
    passWithNoTests: true,
    setupFiles: ['src/tests/setupTests.ts', 'src/tests/browserMocks.ts'],
    exclude: [
      'dist',
      'node_modules',
      'src/tests',
      'src/intro.stories.mdx',
      'src/**/*.docs.mdx',
      'src/storybook',
    ],
    coverage: {
      enabled: true,
      provider: 'v8',
      include: ['src/**/*'],
      exclude: [
        'src/**/*.d.ts',
        'src/tests',
        'src/types',
        'src/**/*.test.ts',
        'src/**/*.types.ts',
        'src/**/*.test.tsx',
        'src/**/*.stories.tsx',
        'src/**/*.docs.mdx',
        'src/**/stories/**',
        'src/**/index.ts',
        'src/components/DataDisplay/Tutorial/HighlightBlocks/*',
        'src/components/Inputs/FieldSelector.tsx',
        'src/components/Inputs/TextField.tsx',
        'src/components/Feature/*',
        'src/components/Feedback/Skeleton/**',
        'src/atoms/utils/auth_environment.ts',
        'src/atoms/utils/export.ts',
        'src/atoms/utils/UtilStory.tsx',
        'src/providers/AuthProvider/**',
        'src/hooks/useSignalRMessages.ts',
        'src/hooks/useOnScreenMultiple.ts',
        'src/components/Navigation/TopBar/Resources/FeedbackForm/**',
        'src/storybook',
      ],
      reporter: [
        'text-summary',
        'html',
        ['json-summary', { file: 'coverage.json' }],
      ],
      reportOnFailure: true,
      thresholds: {
        perFile: true,
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
});
