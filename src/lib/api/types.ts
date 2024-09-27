import {AxiosResponse} from 'axios';

export type XHR = Promise<AxiosResponse>;
export interface HttpClient {
  xhr: XHR;
  abortRequest?: Function;
}
