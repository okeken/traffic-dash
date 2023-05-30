import prisma from "../../../lib/prisma";
import NextCors from "nextjs-cors";
import type { NextApiRequest, NextApiResponse } from "next";

interface createdTraffic {
  createdAt: string;
  updatedAt: string;
  id: string;
  userIdentifier: string;
  referrer: string;
  page: string;
  organicSource: string;
  view: number;
}
type Data = {
  name?: string;
  message?: string;
  data?: createdTraffic;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await NextCors(req, res, {
    // Options
    methods: ["POST"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userIdentifier, referrer, page, organicSource } = req.body;

  try {
    const trafficData = (await prisma.traffic
      .findFirst({
        where: { userIdentifier },
      })
      .then(async (data) => {
        if (data) {
          const updated = await prisma.traffic.update({
            where: {
              id: data.id,
            },
            data: {
              view: +data.view + 1,
            },
          });
          return updated;
        } else {
          const created = await prisma.traffic.create({
            data: {
              page,
              referrer,
              userIdentifier,
              view: 1,
              //   @ts-ignore
              organicSource,
            },
          });
          return created;
        }
      })) as createdTraffic;

    return res.status(200).json({ data: trafficData });
  } catch (e) {
    return res.status(500).json({
      error: "Server Error",
    });
  }
}
