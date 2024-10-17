import StrategyAnalytics from '@/app/_components/StrategyAnalytics';

interface props {
	params: {
		orderHash: string;
	};
}

const Home = ({ params: { orderHash } }: props) => {
	const [id, network] = orderHash.split('-');
	return <StrategyAnalytics orderHash={id} network={network} />;
};

export default Home;
