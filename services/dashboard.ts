export const fetchDashboard = async () => {
  try {
    const { data = [] } = await (await fetch("/api/traffic")).json();

    return [data, null];
  } catch (e) {
    console.log(e, "Erro Fe");
    return [[], "Error Fetching  Data" + e];
  }
};
