import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { GET_DataAi, GET_REPORT } from "../queries";
import { useQuery } from "@apollo/client";
import { marked } from "marked";
import parse from "html-react-parser";
// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Report() {
  const { loading, error, data } = useQuery(GET_REPORT);

  const { loading: loadingAI, error: errorAI, data: dataAI } = useQuery(GET_DataAi);

  const chart = data?.getOrderChart;

  const chartConfig = {
    type: "pie",
    width: 500,
    height: 500,
    series: [chart?.totalAccept, chart?.totalReject, chart?.totalPending, chart?.totalNego],
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: true,
      },
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
      legend: {
        show: true,
      },
      labels: [`Total Accept : ${chart?.totalAccept}`, `Total Reject : ${chart?.totalReject} `, `Total Pending : ${chart?.totalPending}`, `Total Nego : ${chart?.totalNego}`],
    },
  };

  const customRenderer = (htmlString) => {
    return parse(htmlString, {
      replace: (domNode) => {
        if (domNode.name === "p") {
          domNode.attribs.class = "mb-4 text-gray-700";
        }
        if (domNode.name === "h1") {
          domNode.attribs.class = "text-2xl font-bold mb-2";
        }
        if (domNode.name === "h2") {
          domNode.attribs.class = "text-xl font-bold mb-2";
        }
        if (domNode.name === "h3") {
          domNode.attribs.class = "text-lg font-bold mb-2";
        }
        if (domNode.name === "ul") {
          domNode.attribs.class = "list-disc pl-5 mb-4";
        }
        if (domNode.name === "ol") {
          domNode.attribs.class = "list-decimal pl-5 mb-4";
        }
        if (domNode.name === "li") {
          domNode.attribs.class = "mb-2";
        }
      },
    });
  };

  return (
    <div>
      <Card>
        <CardHeader floated={false} shadow={false} color="transparent" className="flex flex-col gap-4 rounded-none md:flex-row md:items-center">
          <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
            <Square3Stack3DIcon className="h-6 w-6" />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray">
              Pie Chart
            </Typography>
            <Typography variant="small" color="gray" className="max-w-sm font-normal">
              Visualize your data in a simple way using the @material-tailwind/react chart plugin.
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="mt-4 grid place-items-center px-2">
          <Chart {...chartConfig} />
          <Typography variant="h6" color="blue-gray" className="mr-32">
            Total: {chart?.totalRequest}
          </Typography>
        </CardBody>
      </Card>

      <Card className="mt-10">
        {loadingAI ? (
          <Typography variant="h6" color="blue-gray" className="mr-32">
            Loading...
          </Typography>
        ) : (
          <>
            <CardHeader floated={false} shadow={false} color="transparent" className="flex flex-col gap-4 rounded-none md:flex-row md:items-center">
              <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                <Square3Stack3DIcon className="h-6 w-6" />
              </div>
              <div>
                <Typography variant="h6" color="blue-gray">
                  AI Report
                </Typography>
                <Typography variant="small" color="gray" className="max-w-sm font-normal">
                  Generated by AI based on your data.
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="mt-4 grid place-items-center px-2">
              <Typography variant="h6" color="blue-gray" className="mr-32">
                {customRenderer(marked.parse(dataAI?.getPromptedAI))}
              </Typography>
            </CardBody>
          </>
        )}
      </Card>
    </div>
  );
}
