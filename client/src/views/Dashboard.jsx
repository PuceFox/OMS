import { useMutation, useQuery } from "@apollo/client";
import { Card, Typography, Button } from "@material-tailwind/react";
import { MUTATION_FOLLOW_UP, QUERY_GET_ORDERS } from "../queries";
import formatPrice from "../utils/formatDollar";
import Loading from "../components/Loading";
import logo from "../assets/name.png";
import Toastify from "toastify-js";

const TABLE_HEAD = ["Fullname", "Email", "Phone Number", "Origin", "Destination", "Services", "Total Pax", "Total Price", "Aircraft", "Status", "Action"];

export default function Dashboard() {
  const { loading, error, data } = useQuery(QUERY_GET_ORDERS);
  const [followUp] = useMutation(MUTATION_FOLLOW_UP, {
    onError: (error) => {
      console.error("Mutation Error:", error);
    },
  });
  const handleFollowUp = async (id) => {
    try {
      await followUp({
        variables: {
          followUpMailId: id,
        },
      });
      Toastify({
        text: "Succes send Follow Up email",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #6e48aa, #9a6c0fe)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } catch (error) {
      console.log("FollowUp Error:", error);
    }
  };

  if (error) return <p>Error: {error.message}</p>;

  const tableRows = data?.getOrder;
  // console.log(tableRows);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Data</h2>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-full w-full min-h-screen bg-gradient-to-r from-[#fbc2eb] to-[#a6c0fe] p-4">
          <Loading />
        </div>
      ) : (
        <Card className="h-full w-full overflow-scroll">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-purple-300 p-4">
                    <Typography variant="small" color="blue-gray" className="font-bold leading-none text-white">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows?.map(({ _id, fullname, email, phoneNumber, origin, destination, service, pax, price, aircraft, status }, index) => {
                const isLast = index === tableRows.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={fullname}>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {fullname}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {phoneNumber}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                        {origin}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                        {destination}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                        {service}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                        {pax}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {price ? (
                        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                          {formatPrice(price)}
                        </Typography>
                      ) : (
                        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                          -
                        </Typography>
                      )}
                    </td>
                    <td className={classes}>
                      {aircraft ? (
                        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                          {aircraft}
                        </Typography>
                      ) : (
                        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                          Waiting
                        </Typography>
                      )}
                    </td>
                    <td className={classes}>
                      <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                        {status}
                      </Typography>
                    </td>

                    {status !== "Accepted" && status !== "Rejected" && (
                      <td className={classes}>
                        <Button as="a" href="#" variant="small" color="amber" className="font-bold" onClick={() => handleFollowUp(_id)}>
                          Follow Up
                        </Button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
