import pkg from 'pg';

const { Client } = pkg;

const uri = process.env.DATABASE_URI || process.argv[2];
if (!uri) {
  console.error('DATABASE_URI not provided. Set env or pass as first arg.');
  process.exit(1);
}

async function listPublicTables(client) {
  const { rows } = await client.query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_type='BASE TABLE'"
  );
  return rows.map((r) => r.table_name);
}

async function verifyCounts(client, tables) {
  for (const t of tables) {
    const res = await client.query('SELECT COUNT(*)::int AS n FROM "' + t + '"');
    console.log(t.padEnd(32), res.rows[0].n);
  }
}

async function main() {
  const client = new Client({ connectionString: uri });
  await client.connect();

  const tables = await listPublicTables(client);
  if (tables.length === 0) {
    console.log('No public base tables found.');
    await client.end();
    return;
  }

  // Truncate all tables, reset identities, cascade to dependent tables
  const truncateSql = 'TRUNCATE ' + tables.map((t) => '"' + t + '"').join(', ') + ' RESTART IDENTITY CASCADE;';
  await client.query(truncateSql);
  console.log(`Truncated ${tables.length} tables with RESTART IDENTITY CASCADE.`);

  // Verify counts after truncation
  await verifyCounts(client, tables);

  await client.end();
}

main().catch((e) => {
  console.error(e.stack || e);
  process.exit(1);
});