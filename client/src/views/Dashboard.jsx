import { useQuery } from "@apollo/client";
import { Card, Typography, Button } from "@material-tailwind/react";
import { QUERY_GET_ORDERS } from "../queries";

const TABLE_HEAD = ["Fullname", "Email", "Phone Number", "Origin", "Destination", "Services", "Total Pax", "Total Price", "Aircraft", "Status", "Action"];

const TABLE_ROWS = [
  {
    fullname: "John Doe",
    phonenumber: "+628123456789",
    email: "johndoe@example.com",
    origin: "Jakarta",
    services: "Tour Package",
    destination: "Bandung",
    status: "on received",
    total_pax: 4,
    total_price: 2000000,
    aircraft: "Legacy 600",
  },
  {
    fullname: "John Doe",
    phonenumber: "+628123456789",
    email: "johndoe@example.com",
    origin: "Jakarta",
    services: "Tour Package",
    destination: "Bandung",
    status: "on received",
    total_pax: 4,
    total_price: 2000000,
    aircraft: "Hawker 900",
  },
];
export default function Dashboard() {
  const { loading, error, data } = useQuery(QUERY_GET_ORDERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const tableRows = data.getOrder;
  console.log(tableRows);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map(({ fullname, email, phonenumber, origin, destination, services, total_pax, total_price, aircraft, status }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
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
                      {phonenumber}
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
                      {services}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                      {total_pax}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                      {total_price}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                      {aircraft}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                      {status}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Button as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                      follow up
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
