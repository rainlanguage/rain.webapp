"use client";

import { YamlData } from "../_types/yamlData";
import { useRouter } from "next/navigation"; // Correct import

export const DeploymentCard = ({
  deployment,
  slug,
}: {
  deployment: YamlData["gui"]["deployments"][0];
  slug: string;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${slug}`); // Change to `asPath` or `pathname`
    console.log("Deploying...");
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col gap-y-4 bg-white">
      <div className="text-lg">{deployment.name}</div>
      <div>{deployment.description}</div>
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        Deploy
      </button>
    </div>
  );
};
