"use client";

import { YamlData } from "../_types/yamlData";
import { useRouter } from "next/navigation";

export const DeploymentCard = ({
  deployment,
  slug,
}: {
  deployment: YamlData["gui"]["deployments"][0];
  slug: string;
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${slug}/${deployment.deployment}`);
    console.log("Deploying...");
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col gap-y-8 bg-white justify-between">
      <div className="flex flex-col gap-y-4">
        <div className="text-lg font-semibold">{deployment.name}</div>
        <div className="text-gray-500">{deployment.description}</div>
      </div>
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        Deploy
      </button>
    </div>
  );
};
