export interface MockCredential {
  userId: string;
  name: string;
  type: string;
  typeVersion: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Ported verbatim (shape + sample entries) from
// continuum-workbench/workflow-editor-extension/.../CredentialRenderer.tsx
export const MOCK_CREDENTIALS: Record<string, MockCredential[]> = {
  BASIC: [
    {
      userId: 'anonymous',
      name: 'admin-basic-auth',
      type: 'BASIC',
      typeVersion: '1.0.0',
      description: 'Admin credentials for internal APIs',
      createdAt: '2026-04-24T10:00:00Z',
      updatedAt: '2026-04-24T10:00:00Z',
    },
    {
      userId: 'anonymous',
      name: 'service-account',
      type: 'BASIC',
      typeVersion: '1.0.0',
      description: 'Service account for batch jobs',
      createdAt: '2026-04-24T11:00:00Z',
      updatedAt: '2026-04-24T11:00:00Z',
    },
  ],
  TOKEN: [
    {
      userId: 'anonymous',
      name: 'github-token',
      type: 'TOKEN',
      typeVersion: '1.0.0',
      description: 'GitHub API access token',
      createdAt: '2026-04-24T12:00:00Z',
      updatedAt: '2026-04-24T12:00:00Z',
    },
    {
      userId: 'anonymous',
      name: 'openai-api-key',
      type: 'TOKEN',
      typeVersion: '1.0.0',
      description: 'OpenAI API key for LLM calls',
      createdAt: '2026-04-24T13:00:00Z',
      updatedAt: '2026-04-24T13:00:00Z',
    },
  ],
  GENERIC: [
    {
      userId: 'anonymous',
      name: 'basic-api-creds',
      type: 'GENERIC',
      typeVersion: '1.0.0',
      description: 'Generic API credentials',
      createdAt: '2026-04-24T19:14:21Z',
      updatedAt: '2026-04-24T19:14:21Z',
    },
  ],
};

export function getMockCredentials(type?: string): MockCredential[] {
  if (type) {
    return MOCK_CREDENTIALS[type] || [];
  }
  return Object.values(MOCK_CREDENTIALS).flat();
}
