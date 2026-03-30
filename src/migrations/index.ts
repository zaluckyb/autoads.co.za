import * as migration_20260113_124938_fix_advertisements_schema from './20260113_124938_fix_advertisements_schema';
import * as migration_20260127_121313_add_views_to_posts from './20260127_121313_add_views_to_posts';

export const migrations = [
  {
    up: migration_20260113_124938_fix_advertisements_schema.up,
    down: migration_20260113_124938_fix_advertisements_schema.down,
    name: '20260113_124938_fix_advertisements_schema',
  },
  {
    up: migration_20260127_121313_add_views_to_posts.up,
    down: migration_20260127_121313_add_views_to_posts.down,
    name: '20260127_121313_add_views_to_posts'
  },
];
