import { useState } from 'react';
import { FrameState } from '../_types/frame';
import { cn } from '@/lib/utils';
import { Button } from 'flowbite-react';
import { compress } from '../_services/compress';

interface ShareStateAsUrlProps {
	currentState: FrameState;
}

const ShareStateAsUrl: React.FC<ShareStateAsUrlProps> = ({ currentState }) => {
	const [showTooltip, setShowTooltip] = useState(false);

	const handleClick = () => {
		setShowTooltip(true);
		getUrlWithState();

		setTimeout(() => {
			setShowTooltip(false);
		}, 5000);
	};

	const getUrlWithState = async () => {
		const url = new URL(window.location.href);
		const jsonString = JSON.stringify(currentState);
		const compressed = await compress(jsonString);
		url.searchParams.set('currentState', compressed);
		navigator.clipboard.writeText(url.href);
	};

	return (
		<div className="lg:relative">
			<Button color="primary" size="sm" onClick={handleClick}>
				Share these choices
			</Button>
			<div
				className={cn(
					'text-sm absolute lg:-top-2 bottom-0 -translate-y-[100%] left-1/2 -translate-x-1/2 text-center whitespace-nowrap py-2 px-4 border bg-white shadow-sm rounded-full pointer-events-none transition-opacity duration-200 flex items-center',
					showTooltip ? 'opacity-100' : 'opacity-0'
				)}
			>
				Shareable URL copied to clipboard
			</div>
		</div>
	);
};

export default ShareStateAsUrl;
