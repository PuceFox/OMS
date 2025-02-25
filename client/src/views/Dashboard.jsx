import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  Card,
  Typography,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  MUTATION_FOLLOW_UP,
  QUERY_GET_ORDERS,
  QUERY_ORDER_BY_ID,
  UPDATE_ORDER_DATA,
} from "../queries";
import formatPrice from "../utils/formatDollar";
import Loading from "../components/Loading";
import Toastify from "toastify-js";
import { useEffect, useState } from "react";
import Paging from "../components/Paging";
import { formatDate } from "../utils/formatDate";
import { Link } from "react-router-dom";

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
  "Date",
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

  
  const [
    getOrderById,
    { loading: orderIdLoading, error: orderIdError, data: orderIdData },
  ] = useLazyQuery(QUERY_ORDER_BY_ID);
  
  const [rejectNego] = useMutation(UPDATE_ORDER_DATA, {
    onError: (error) => {
      console.error("Mutation Error:", error);
    },
    refetchQueries: [QUERY_GET_ORDERS]
  });
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [nameSort, setNameSort] = useState(0); // default sorting by name
  const [dateSort, setDateSort] = useState(0); // default sorting order

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
  const handleNego = async (id) => {
    try {
      await getOrderById({
        variables: {
          getOrderByIdId: id,
        },
        onCompleted: (data) => {
          rejectNego({
            variables: {
              updateOrderDataId: id,
              price: data?.getOrderById?.price,
              aircraft: data?.getOrderById?.aircraft,
              status: "Rejected",
              reason: "Rejected after negotiation due to no update from user",
            },
            onCompleted: (data) => {
              Toastify({
                text: "Negotiation Order Rejected",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                  background: "linear-gradient(to right, #ff0000, #cc0000)",
                },
                onClick: function () {},
              }).showToast();
            }
          });   
        }
      });
    } catch (error) {
      console.log("Nego Reject Error:", error);
    }
  };
  useEffect(() => {
    console.log("USE EFFECT TRIGGERED");
    fetchOrders({
      variables: {
        page: page,
        filterStatus: statusFilter,
        filterService: serviceFilter,
        sortByName: nameSort,
        sortByDate: dateSort,
      },
    });
  }, [page, statusFilter, nameSort, dateSort, serviceFilter]);

  const tableRows = tableData?.getOrder.orders;
  // console.log(tableRows?.length, "DATA");
  // console.log(page, "PAGE");
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
              onChange={(e) => setStatusFilter(e)}
              className="flex-1"
            >
              <Option value="">All</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Paid">Paid</Option>
              <Option value="Nego Sent">Nego Sent</Option>
              <Option value="Negotiation">Negotiation</Option>
              <Option value="Rejected">Rejected</Option>
            </Select>
            <Select
              label="Filter by Service"
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e)}
              className="flex-1"
            >
              <Option value="">All</Option>
              <Option value="VIP">VIP</Option>
              <Option value="Medevac">Medevac</Option>
              <Option value="City-tour">City-tour</Option>
            </Select>
          </div>
          {/* Sorting - Second row */}
          <div className="flex gap-4 w-full">
            <Select
              label="Sort by Name"
              value={nameSort}
              onChange={(e) => {
                setNameSort(Number(e));
              }}
              className="flex-1"
            >
              <Option value={0}>None</Option>
              <Option value={1}>A-Z</Option>
              <Option value={-1}>Z-A</Option>
            </Select>
            <Select
              label="Sort by Date"
              onChange={(e) => {
                setDateSort(Number(e));
              }}
              className="flex-1"
            >
              <Option value="0">None</Option>
              <Option value="1">Oldest</Option>
              <Option value="-1">Latest</Option>
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
                      className="font-bold leading-none text-white text-center"
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
                    updatedAt,
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
                          className="font-normal text-center"
                        >
                          {index + 1 + (page - 1) * 10}{" "}
                          {/* Adjust based on current page */}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-left"
                        >
                          {fullname}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-center"
                        >
                          {email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-center"
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
                          className="font-normal text-center"
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
                          className="font-normal text-center"
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
                          className="font-normal text-center"
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
                          className="font-normal text-center"
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
                            className="font-normal text-center"
                          >
                            {formatPrice(price)}
                          </Typography>
                        ) : (
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-center"
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
                            className="font-normal text-center"
                          >
                            {aircraft}
                          </Typography>
                        ) : (
                          <Typography
                            as="a"
                            href="#"
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-center"
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
                          className="font-normal text-center"
                        >
                          {status}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-normal text-center"
                        >
                          {formatDate(updatedAt)}
                        </Typography>
                      </td>
                      {status === "Negotiation" && (
                        <td className={classes}>
                          <Link
                            to={`/update/${_id}`}
                            className="text-white bg-blue-500 p-2 rounded-md"
                          >
                            <Button
                              as="a"
                              href="#"
                              size="sm"
                              color="blue"
                              className="font-bold"
                            >
                              Update
                            </Button>
                          </Link>
                        </td>
                      )}
                      {status !== "Accepted" &&
                        status !== "Rejected" &&
                        status !== "Paid" &&
                        status !== "Negotiation" &&
                        status !== "Nego Sent" && (
                          <td className={classes}>
                            <Button
                              as="a"
                              href="#"
                              size="sm"
                              color="amber"
                              className="font-bold"
                              onClick={() => handleFollowUp(_id)}
                            >
                              Follow Up
                            </Button>
                          </td>
                        )}
                      {status === "Nego Sent" && (
                        <td className={classes}>
                          <Button
                            as="a"
                            href="#"
                            size="sm"
                            color="red"
                            className="font-bold px-7"
                            onClick={() => handleNego(_id)}
                          >
                            Reject
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
