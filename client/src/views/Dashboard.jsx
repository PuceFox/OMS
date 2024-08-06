export default function Dashboard() {
  const users = [
    {
      fullname: "John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      origin: "New York",
      destination: "Los Angeles",
      totalPax: 2,
      status: "Confirmed",
    },
    {
      fullname: "Jane Smith",
      email: "janesmith@example.com",
      phone: "987-654-3210",
      origin: "Chicago",
      destination: "San Francisco",
      totalPax: 1,
      status: "Pending",
    },
    // Tambahkan data pengguna lainnya sesuai kebutuhan
  ];
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Fullname</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Total Pax</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.origin}</td>
                  <td>{user.destination}</td>
                  <td>{user.totalPax}</td>
                  <td>{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
