import logo from "@/assets/images/logo-zeno-product-manager.png";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
        <Image src={logo} alt="Zeno Product Manager Logo" width={200} height={200} />
        <h1 className="text-2xl font-bold">Welcome to the Zeno Product Manager</h1>
    </div>
  );
}
