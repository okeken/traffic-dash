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
  data?: any;
  error?: string;
};

const getHandler = async (req: NextApiRequest) => {
  try {
    const traffic = await prisma.traffic.findMany({
      include: {
        pages: true,
      },
    });
    return traffic;
  } catch (e) {
    throw e;
  }
};

const postHandler = async (req: NextApiRequest) => {
  req.body = JSON.parse(req.body ?? {});
  const { userIdentifier, referrer, page } = req.body;

  try {
    const trafficInfo = prisma.traffic
      .findFirst({
        where: { userIdentifier },
      })
      .then(async (data) => {
        if (data) {
          await prisma.page
            .findFirst({
              where: {
                title: page,
              },
            })
            .then(async (info) => {
              if (info) {
                await prisma.page.update({
                  where: {
                    id: info.id,
                  },
                  data: {
                    views: +info.views + 1,
                  },
                });
              } else {
                await prisma.page.create({
                  data: {
                    title: page ? page : "unown",
                    views: 1,
                    sourceId: data.id,
                  },
                });
              }
            });

          const updated = await prisma.traffic.update({
            where: {
              id: data.id,
            },
            data: {
              views: +data.views + 1,
            },
          });
          return updated;
        } else {
          const created = await prisma.traffic.create({
            data: {
              pages: {
                create: {
                  title: page,
                  views: 1,
                },
              },
              referrer,
              userIdentifier,
              views: 1,
            },
          });
          return created;
        }
      });

    const allTraffic = await prisma.allTraffic.findMany();
    let data = allTraffic?.[0];
    let updates: any;
    if (!data) {
      updates = prisma.allTraffic.create({
        data: {
          totalCount: 1,
        },
      });
    } else {
      updates = prisma.allTraffic.update({
        where: {
          id: data.id,
        },
        data: {
          totalCount: +data.totalCount + 1,
        },
      });
    }
    console.log(data, "ALL DATA VIEW");
    const [trafficData] = await Promise.all([trafficInfo, updates]);
    return trafficData;
  } catch (e) {
    throw e;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await NextCors(req, res, {
    // Options
    methods: ["POST", "GET"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  try {
    if (req.method == "POST") {
      const post = await postHandler(req);
      return res.status(201).json({ data: post });
    }

    if (req.method == "GET") {
      const get = await getHandler(req);
      return res.status(201).json({ data: get });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (e) {
    return res.status(500).json({
      error: "Server Error",
    });
  }
}
