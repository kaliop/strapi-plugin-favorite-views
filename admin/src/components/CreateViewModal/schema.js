import { z } from 'zod';

import CONST from '../../CONST';

export const createViewSchema = z
  .object({
    name: z.string().min(1).max(32),
    visibility: z.enum(Object.values(CONST.VIEWS_VISIBILITY)),
    roles: z.array(z.string())
  })
  .refine(
    (data) => {
      return !(data.visibility === CONST.VIEWS_VISIBILITY.ROLES && data.roles.length === 0);
    },
    {
      path: ['roles']
    }
  );
