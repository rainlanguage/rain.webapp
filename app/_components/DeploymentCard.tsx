import { YamlData } from "../_types/yamlData";

export const DeploymentCard = async ({deployment}: {deployment: YamlData['gui']['deployments'][0]}) => {
    return (
        <div className="border rounded-lg p-4 flex flex-col gap-y-4 bg-white">
            <div className="text-lg">{deployment.name}</div>
            <div>deployment description goes here</div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
                Deploy
            </button>    
        </div>
    )
}