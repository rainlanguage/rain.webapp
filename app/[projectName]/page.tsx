import { fetchMetadata } from "frames.js/next";
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import { retrieveProjectData } from "../_services/buildProjectHome";
import { StrategyCard } from "../_components/StrategyCard";
import Markdown from "react-markdown";

// interface generateMetadataProps {
//   params: {
//     projectName: string;
//   };
// }

// export async function generateMetadata({
//   params,
// }: generateMetadataProps): Promise<Metadata> {
//   return {
//     title: "Frames Next.js Example",
//     other: {
//       ...(await fetchMetadata(
//         new URL(
//           `/frames/${params.projectName}`,
//           process.env.VERCEL_URL
//             ? `https://${process.env.VERCEL_URL}`
//             : "http://localhost:3000"
//         )
//       )),
//     },
//   };
// }

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
      <div className="col-span-2 prose p-4">
        <Markdown>{projectData.webappMDText}</Markdown>
      </div>
      <div className="flex flex-col gap-y-4 col-span-3 justify-start bg-gray-50 p-4">
        {projectData.yamlDatas.map((data) => (
          <StrategyCard data={data} />
        ))}
      </div>
    </div>
  );
}
