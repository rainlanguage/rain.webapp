import { retrieveProjectData } from "../_services/buildProjectHome";
import { StrategyCard } from "../_components/StrategyCard";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface homeProps {
  params: {
    projectName: string;
  };
}

export default async function ProjectHome({ params }: homeProps) {
  const projectData = await retrieveProjectData(params.projectName);
  console.log(projectData);

  return (
    <div className="grid grid-cols-5 flex-grow w-full">
      <div className="col-span-2 prose p-8 border-r border-gray-100">
        <Markdown rehypePlugins={[rehypeRaw]}>
          {projectData.webappMDText}
        </Markdown>
      </div>
      <div className="flex flex-col gap-y-4 col-span-3 justify-start bg-gray-50 p-8">
        {projectData.yamlDatas.map((data) => (
          <StrategyCard data={data} />
        ))}
      </div>
    </div>
  );
}
