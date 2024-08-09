import { Button, Radio } from "@material-tailwind/react";
import formatPrice from "../utils/formatDollar";

import { useParams } from "react-router-dom";

export function RejectOrder({ route }) {
  const { orderId } = useParams();
  //   console.log(orderId);

  //   const data = {
  //     _id: "66b4a0aeed2e1c5f2e0b702b",
  //     fullname: "jajang",
  //     email: "jajang@mail.com",
  //     phoneNumber: "12345",
  //     origin: "DJJ",
  //     destination: "BTJ",
  //     service: "VIP",
  //     aircraft: "Gulfstream G150",
  //     price: "5000",
  //   };
  //   console.log(data);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-purple-800 p-6">
          <h1 className="text-3xl font-bold text-white">Tell Us Why You Decline ?</h1>
        </div>
        <form>
          <div className="p-6">
            <div className="grid ">
              <Radio name="type" label="I change my mind" value="I change my mind" />
              <Radio name="type" label="Price is to Expensive" value="Price is to Expensive" />
              <Radio name="type" label="Deterioration" value="Deterioration" />
            </div>
          </div>
          <div className="p-6 m-auto  w-fit">
            <Button type="submit" className="w-full bg-green-600">
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
