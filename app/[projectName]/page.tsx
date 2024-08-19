import { fetchMetadata } from "frames.js/next";
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import { retrieveProjectData } from "../_services/buildProjectHome";
import { StrategyCard } from "../_components/StrategyCard";

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
    <div className="grid grid-cols-5 px-8 flex-grow mt-4 w-full">
        <div className="col-span-2">{projectData.webappMDText}</div>
        <div className="flex flex-col gap-y-4 col-span-3 justify-start">
            {projectData.yamlDatas.map(yaml => (<StrategyCard data={yaml.gui} />))}
        </div>
    </div>
  );
}
