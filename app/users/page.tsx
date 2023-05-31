import { Card, Title, Text } from "@tremor/react";
// import { queryBuilder } from '../lib/planetscale';
import Search from "../search";
import UsersTable from "../table";

export const dynamic = "force-dynamic";

export default async function IndexPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? "";
  const users = [] as any;
  // const users = await queryBuilder
  //   .selectFrom('users')
  //   .select(['id', 'username', 'email'])
  //   .where('username', 'like', `%${search}%`)
  //   .execute();

  // await queryBuilder.insertInto("traffics").values([])

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A list of users retrieved .</Text>
      <Search />
      <Card className="mt-6">
        {/* @ts-expect-error Server Component */}
        <UsersTable users={users} />
      </Card>
    </main>
  );
}
