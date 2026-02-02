
export interface DogPun {
  text: string;
  author: string;
}

export enum AppState {
  IDLE = 'IDLE',
  ASKING = 'ASKING',
  SUCCESS = 'SUCCESS'
}
