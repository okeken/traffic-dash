import prisma from "../lib/prisma";
export const fetchDashboard = async (): Promise<[[], string]> => {
  const data = (await prisma.traffic.findMany({
    include: {
      pages: true,
    },
  })) as [];

  try {
    return [data, ""];
  } catch (e) {
    console.log(e, "Erro Fe");
    return [[], "Error Fetching  Data"];
  }
};
