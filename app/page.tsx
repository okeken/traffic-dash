import { Card, Grid, Flex, Metric, Text, Title, BarList } from "@tremor/react";
import { fetchDashboard } from "../services/dashboard";
import Chart from "./chart";
import KpiChart from "./kpiChart";

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

export default async function PlaygroundPage() {
  const [response = [], error] = await fetchDashboard();
  interface IData {
    id: string;
    views: string;
    title: string;
  }
  const dataFormat = (data: IData[] = []) => {
    return data.map((info) => ({ name: info.title, value: +info.views }));
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <KpiChart />

      <Grid className="mt-8 gap-6" numColsSm={2} numColsLg={3}>
        {response?.length &&
          response.map((item: any) => (
            <Card key={item.id}>
              <Title>
                <span className="capitalize">{item.referrer}</span>
              </Title>
              <Flex
                className="space-x-2"
                justifyContent="start"
                alignItems="baseline"
              >
                <Metric>{item.views}</Metric>
                <Text>Total views</Text>
              </Flex>
              <Flex className="mt-6">
                <Text>Pages</Text>
                <Text className="text-right">Views</Text>
              </Flex>
              <BarList
                className="mt-2"
                data={dataFormat(item.pages)}
                valueFormatter={dataFormatter}
              />
            </Card>
          ))}
      </Grid>
      <Chart />
    </main>
  );
}
