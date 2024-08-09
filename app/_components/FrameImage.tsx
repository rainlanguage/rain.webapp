export const FrameImage = ({ currentState }: any) => {
  // Total steps are the number of fields + 4 (deployment, deposit, review, and done)
  // TODO: calculate this all dynamically based on fields for more accurate progress bar
  const totalStepCount = 5;
  let currentStepCount = 0;
  if (currentState.currentStep === "deployment") {
    currentStepCount = 1;
  } else if (currentState.currentStep === "fields") {
    currentStepCount = 2;
  } else if (currentState.currentStep === "deposit") {
    currentStepCount = 3;
  } else if (currentState.currentStep === "review") {
    currentStepCount = 4;
  } else if (currentState.currentStep === "done") {
    currentStepCount = 5;
  }

  return (
    <div
    className={`flex items-center justify-center`}
    tw={`flex items-center justify-center`}
    style={{
      alignItems: "center",
      backgroundSize: "100% 100%",
      flexDirection: "column",
      flexWrap: "nowrap",
      height: "100%",
      justifyContent: "center",
      textAlign: "left",
      width: "100%",
    }}
    >
      <div
        className="flex"
        tw="absolute"
        style={{
          top: 10,
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            height: 20,
            width: "90%",
            display: "flex",
            borderRadius: 10,
          }}
          className="bg-white"
          tw="bg-white"
        >
          <div
            style={{
              backgroundColor: "green",
              display: "flex",
              height: 20,
              borderRadius: 10,
              width: `${(currentStepCount / totalStepCount) * 100}%`,
            }}
          />
        </div>
      </div>
      <div
        style={{
          fontSize: 60,
          fontStyle: "normal",
          letterSpacing: "-0.025em",
          lineHeight: 1.4,
          marginTop: 30,
          padding: "0 120px",
          whiteSpace: "pre-wrap",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {currentState.currentStep === "start" ? currentState.strategyName : ""}
        {currentState.currentStep === "deployment" ? "Choose a deployment" : ""}
        {currentState.currentStep === "fields" && currentState.deploymentOption
          ? currentState.deploymentOption.fields[
              Object.keys(currentState.bindings).length
            ].description
          : ""}
        {currentState.currentStep === "deposit"
          ? "Choose your deposit amount"
          : ""}
        {currentState.currentStep === "review" ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                textAlign: "center",
                textDecoration: "underline",
                justifyContent: "center",
              }}
            >
              Review your choices
            </div>
            <div style={{ display: "flex" }}>
              Deployment: {currentState.deploymentOption.name}
            </div>
            {Object.keys(currentState.bindings).map((binding: string) => (
              <div key={binding} style={{ display: "flex" }}>
                {
                  currentState.deploymentOption.fields.find(
                    (field: any) => field.binding === binding
                  ).name
                }
                : {currentState.bindings[binding]}
              </div>
            ))}
            <div style={{ display: "flex" }}>
              Deposit: {currentState.deposit}
            </div>
          </div>
        ) : (
          ""
        )}
        {currentState.currentStep === "done" ? "Done!" : ""}
      </div>
      {currentState.error ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span style={{ color: "red", fontSize: 50 }}>
            {currentState.error}
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
