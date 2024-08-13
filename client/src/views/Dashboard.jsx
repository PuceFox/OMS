import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Card,
  Typography,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { MUTATION_FOLLOW_UP, QUERY_GET_ORDERS } from "../queries";
import formatPrice from "../utils/formatDollar";
import Loading from "../components/Loading";
import Toastify from "toastify-js";
import { useEffect, useState } from "react";
import Paging from "../components/Paging";

const TABLE_HEAD = [
  "No",
  "Name",
  "Email",
  "Phone Number",
  "Origin",
  "Destination",
  "Services",
  "Total Pax",
  "Total Price",
  "Aircraft",
  "Status",
  "Action",
];

export default function Dashboard() {
  const [
    fetchOrders,
    { loading: tableLoading, error: tableError, data: tableData },
  ] = useLazyQuery(QUERY_GET_ORDERS);
  const [followUp] = useMutation(MUTATION_FOLLOW_UP, {
    onError: (error) => {
      console.error("Mutation Error:", error);
    },
  });

  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [sortField, setSortField] = useState("name"); // default sorting by name
  const [sortOrder, setSortOrder] = useState("ASC"); // default sorting order

  let totalPage = 1;

  const handleFollowUp = async (id) => {
    try {
      await followUp({
        variables: {
          followUpMailId: id,
        },
      });
      Toastify({
        text: "Success Send Follow Up Email",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #6e48aa, #9a6c0fe)",
        },
        onClick: function () {},
      }).showToast();
    } catch (error) {
      console.log("FollowUp Error:", error);
    }
  };

  useEffect(() => {
    fetchOrders({
      variables: {
        page: page,
        statusFilter,
        serviceFilter,
        sortField,
        sortOrder,
      },
    });
  }, [page, statusFilter, serviceFilter, sortField, sortOrder]);

  const tableRows = tableData?.getOrder.orders;
  console.log(tableRows?.length, "DATA");
  console.log(page, "PAGE");
  if (tableData) totalPage = tableData?.getOrder.totalPage;
  if (tableError) return <p>Error: {tableError.message}</p>;

  return (
    <div className="min-h-screen p-4 bg-gradient-to-r from-[#fbc2eb] to-[#a6c0fe]">
      <div className="flex items-center justify-between mb-8">
        {/* Filters and Sorting */}
        <Card className="flex flex-wrap gap-4 p-4 w-min max-w-screen-lg">
          {/* Filters - First row */}
          <div className="flex gap-4 w-full mb-4">
            <Select
              label="Filter by Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1"
            >
              <Option value="">All</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Accepted">Accepted</Option>
              <Option value="Rejected">Rejected</Option>
            </Select>
            <Select
              label="Filter by Service"
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="flex-1"
            >
              <Option value="">All</Option>
              <Option value="Service 1">Service 1</Option>
              <Option value="Service 2">Service 2</Option>
              <Option value="Service 3">Service 3</Option>
            </Select>
          </div>
          {/* Sorting - Second row */}
          <div className="flex gap-4 w-full">
            <Select
              label="Sort by Name"
              value={sortField === "name" ? sortOrder : ""}
              onChange={(e) => {
                if (e.target.value === "ASC" || e.target.value === "DESC") {
                  setSortField("name");
                  setSortOrder(e.target.value);
                }
              }}
              className="flex-1"
            >
              <Option value="">None</Option>
              <Option value="ASC">Ascending</Option>
              <Option value="DESC">Descending</Option>
            </Select>
            <Select
              label="Sort by Created At"
              value={sortField === "createdAt" ? sortOrder : ""}
              onChange={(e) => {
                if (e.target.value === "ASC" || e.target.value === "DESC") {
                  setSortField("createdAt");
                  setSortOrder(e.target.value);
                }
              }}
              className="flex-1"
            >
              <Option value="">None</Option>
              <Option value="ASC">Ascending</Option>
              <Option value="DESC">Descending</Option>
            </Select>
          </div>
        </Card>
      </div>
      {tableLoading ? (
        <div className="flex items-center justify-center h-full w-full min-h-screen">
          <Loading />
        </div>
      ) : (
        <Card className="h-full w-full overflow-scroll">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-purple-300 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none text-white"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows?.map(
                (
                  {
                    _id,
                    fullname,
                    email,
                    phoneNumber,
                    origin,
                    destination,
                    service,
                    pax,
                    price,
                    aircraft,
                    status,
                  },
                  index
                ) => {
                  const isLast = index === tableRows.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index + 1 + (page - 1) * 10}{" "}
                          {/* Adjust based on current page */}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {fullname}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {phoneNumber}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {origin}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {destination}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {service}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {pax}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {price ? (
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            {formatPrice(price)}
                          </Typography>
                        ) : (
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            -
                          </Typography>
                        )}
                      </td>
                      <td className={classes}>
                        {aircraft ? (
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            {aircraft}
                          </Typography>
                        ) : (
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            Waiting
                          </Typography>
                        )}
                      </td>
                      <td className={classes}>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {status}
                        </Typography>
                      </td>
                      {status !== "Accepted" && status !== "Rejected" && (
                        <td className={classes}>
                          <Button
                            as="a"
                            href="#"
                            variant="small"
                            color="amber"
                            className="font-bold"
                            onClick={() => handleFollowUp(_id)}
                          >
                            Follow Up
                          </Button>
                        </td>
                      )}
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </Card>
      )}
      {/* Paging component */}
      <div className="mt-4 flex justify-center">
        <Paging page={page} totalPage={totalPage} setPage={setPage} />
      </div>
    </div>
  );
}
