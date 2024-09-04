import { StrategyFile } from "../_services/buildProjectHome";
import { DeploymentCard } from "./DeploymentCard";

export const StrategyCard = ({ data }: { data: StrategyFile }) => {
  return (
    <div className="flex flex-col gap-y-3 mb-8">
      <div className="font-bold text-2xl">{data.yamlData.gui.name}</div>
      <div>{data.yamlData.gui.description}</div>
      <div className="grid grid-cols-3 gap-4">
        {data.yamlData.gui.deployments.map((deployment) => (
          <DeploymentCard deployment={deployment} slug={data.fileName} />
        ))}
      </div>
    </div>
  );
};
