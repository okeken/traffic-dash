"use client";
import {
  BadgeDelta,
  Card,
  Grid,
  DeltaType,
  Flex,
  Metric,
  ProgressBar,
  Text,
  Title,
  BarList,
} from "@tremor/react";
import { fetchDashboard } from "../services/dashboard";
import Chart from "./chart";

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

const categories: {
  title: string;
  metric: string;
  metricPrev: string;
}[] = [
  {
    title: "Sales",
    metric: "$ 12,699",
    metricPrev: "$ 9,456",
  },
  {
    title: "Profit",
    metric: "$40,598",
    metricPrev: "$ 45,564",
  },
  {
    title: "Customers",
    metric: "1,072",
    metricPrev: "856",
  },
];

type Kpi = {
  title: string;
  metric: string;
  progress: number;
  target: string;
  delta: string;
  deltaType: DeltaType;
};

const kpiData: Kpi[] = [
  {
    title: "Sales",
    metric: "$ 12,699",
    progress: 15.9,
    target: "$ 80,000",
    delta: "13.2%",
    deltaType: "moderateIncrease",
  },
  {
    title: "Profit",
    metric: "$ 45,564",
    progress: 36.5,
    target: "$ 125,000",
    delta: "23.9%",
    deltaType: "increase",
  },
  {
    title: "Customers",
    metric: "1,072",
    progress: 53.6,
    target: "2,000",
    delta: "10.1%",
    deltaType: "moderateDecrease",
  },
];

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
      <Grid numColsLg={3} className="mt-6 gap-6">
        {kpiData.map((item) => (
          <Card key={item.title}>
            <Flex alignItems="start">
              <div className="truncate">
                <Text>{item.title}</Text>
                <Metric className="truncate">{item.metric}</Metric>
              </div>
              <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta>
            </Flex>
            <Flex className="mt-4 space-x-2">
              <Text className="truncate">{`${item.progress}% (${item.metric})`}</Text>
              <Text>{item.target}</Text>
            </Flex>
            <ProgressBar percentageValue={item.progress} className="mt-2" />
          </Card>
        ))}
      </Grid>

      <Grid className="mt-8 gap-6" numColsSm={2} numColsLg={3}>
        {response.map((item: any) => (
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
