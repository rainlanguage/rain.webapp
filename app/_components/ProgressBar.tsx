export const ProgressBar = ({ currentState }: any) => {
	// Total steps are the number of fields + 4 (deployment, deposit, review, and done)
	// TODO: calculate this all dynamically based on fields for more accurate progress bar
	const totalStepCount = 5;
	let currentStepCount = 0;
	if (currentState.currentStep === 'deployment') {
		currentStepCount = 1;
	} else if (currentState.currentStep === 'fields') {
		currentStepCount = 2;
	} else if (currentState.currentStep === 'deposit') {
		currentStepCount = 3;
	} else if (currentState.currentStep === 'review') {
		currentStepCount = 4;
	} else if (currentState.currentStep === 'done') {
		currentStepCount = 5;
	}

	return (
		<div className="flex w-full" tw="absolute w-full flex">
			<div tw="h-[20px] flex w-full" className="lg:h-8 h-4 w-full">
				<div
					style={{
						display: 'flex',
						width: `${(currentStepCount / totalStepCount) * 100}%`
					}}
					tw="h-[20px] flex bg-blue-500"
					className="transition-all h-2 lg:h-3 bg-blue-600"
				/>
			</div>
		</div>
	);
};
