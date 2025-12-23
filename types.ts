
export type MemeStyle = 'realistic' | 'cartoon' | 'gta';

export interface MemeGeneratorState {
  loading: boolean;
  resultUrl: string | null;
  error: string | null;
}
