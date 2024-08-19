import { YamlData } from "../_types/yamlData"
import { DeploymentCard } from "./DeploymentCard"

export const StrategyCard = ({data}: {data: YamlData['gui']}) => {
    return (
    <div className="flex flex-col gap-y-3 mb-8">
        <div className="font-bold text-2xl">{data.name}</div>
        <div>{data.description}</div>
        <div className="grid grid-cols-3 gap-4">
            {data.deployments.map(deployment => (<DeploymentCard deployment={deployment} />))}
        </div>
    </div>
    )
}