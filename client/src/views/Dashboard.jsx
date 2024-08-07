import { Card, Typography, Button } from "@material-tailwind/react";

const TABLE_HEAD = ["Fullname", "Email", "Phone Number", "Origin", "Destination", "Services", "Total Pax", "Total Price", "Status", "Action"];

const TABLE_ROWS = [
  {
    fullname: "John Doe",
    phonenumber: "+628123456789",
    email: "johndoe@example.com",
    origin: "Jakarta",
    services: "Tour Package",
    destination: "Bandung",
    status: "on risif",
    total_pax: 4,
    total_price: 2000000,
  },
  {
    fullname: "John Doe",
    phonenumber: "+628123456789",
    email: "johndoe@example.com",
    origin: "Jakarta",
    services: "Tour Package",
    destination: "Bandung",
    status: "on risif",
    total_pax: 4,
    total_price: 2000000,
  },
];
export default function Dashboard() {
  return (
    <>
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
              {TABLE_ROWS.map(({ fullname, email, phonenumber, origin, destination, services, total_pax, total_price, status }, index) => {
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
                        {status}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Button as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                        test
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
}
