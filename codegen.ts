import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'src/shared/api/schema.graphql',
  documents: ['src/**/*.graphql'],
  generates: {
    'src/shared/api/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        scalars: {
          DateTime: 'string',
        },
        enumsAsTypes: true,
        skipTypename: true,
      },
    },
    'src/shared/api/generated/graphql-rtk.ts': {
      preset: 'import-types',
      presetConfig: {
        typesPath: './graphql',
      },
      plugins: ['typescript-rtk-query'],
      config: {
        importBaseApiFrom: '@/shared/api/rtkQuery',
        importBaseApiAlternateName: 'rtkQueryApi',
        exportHooks: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
