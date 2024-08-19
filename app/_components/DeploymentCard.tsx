import { YamlData } from "../_types/yamlData";

export const DeploymentCard = async ({deployment}: {deployment: YamlData['gui']['deployments'][0]}) => {
    return (
        <div className="border rounded-lg p-4">
            <div>{deployment.name}</div>
            <div>deployment description goes here</div>
        </div>
    )
}