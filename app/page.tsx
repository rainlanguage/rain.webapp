import { fetchMetadata } from "frames.js/next";
import { Metadata } from "next";
import { FrameImage } from "./UI/FrameImage";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Frames Next.js Example",
    other: {
      ...(await fetchMetadata(
        new URL(
          "/frames",
          process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000"
        )
      )),
    },
  };
}

export default async function Home() {
  const buttons: any[] = [];
  return (
    <>
      <div className="w-1/4 ml-10">
        <FrameImage
          currentState={{
            strategyName: "DCA into WFLR",
            currentStep: "start",
            deploymentOption: undefined,
            bindings: {},
            deposit: undefined,
            buttonPage: 0,
            showTextInput: false,
            error: undefined,
          }}
        />
      </div>
      {/* {...buttons.map((button) => (
        <div key={button}>
          <Button
            onClick={() => {
              window.location.href = `/frames?buttonPage=${button}`;
            }}
          >
            {button}
          </Button>
        </div>
      ))} */}
    </>
  );
}
