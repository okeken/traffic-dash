import prisma from "../../../lib/prisma";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const allTraffic = (await prisma.allTraffic.findMany())[0]?.totalCount ?? 0;
    const traffic = await prisma.traffic.findMany();
    const google = traffic.filter((data) =>
      data.organicSource.toLocaleLowerCase().includes("google")
    );

    const bing = traffic.filter((data) =>
      data.organicSource.toLocaleLowerCase().includes("bing")
    );

    const yahoo = traffic.filter((data) =>
      data.organicSource.toLocaleLowerCase().includes("yahoo")
    );

    const directTraffic = traffic.filter((data) =>
      data.organicSource.toLocaleLowerCase().includes("direct traffic")
    );

    const data = {
      allTraffic,
      yahoo,
      directTraffic,
      bing,
      google,
    };
    res.status(200).json({ data });
  } catch (e) {
    return res.status(500).json({ error: "Serer Error" });
  }
}
