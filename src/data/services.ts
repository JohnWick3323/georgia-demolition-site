export type { SubService, MainService } from './services/types';

import { residentialService } from './services/residential';
import { postDemolitionService } from './services/post-demolition';
import { coreDemolitionService } from './services/core-demolition';
import { specializedDemolitionService } from './services/specialized-demolition';
import { ancillaryDemolitionService } from './services/ancillary-demolition';

export const mainServices = [
  residentialService,
  postDemolitionService,
  coreDemolitionService,
  specializedDemolitionService,
  ancillaryDemolitionService,
];
