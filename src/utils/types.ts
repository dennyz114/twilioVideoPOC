export type Callback = (...args: any[]) => void

export type GetTokenFunction = () => Promise<{ data: { responseCode: string, token: string } }>
