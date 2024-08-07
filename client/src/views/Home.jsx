import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [searchParams] = useSearchParams();
  console.log(searchParams.code);

  return <>Ini Halaman Home</>;
}
