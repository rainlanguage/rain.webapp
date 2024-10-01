import StrategyAnalytics from '@/app/_components/StrategyAnalytics';

interface props {
	params: {
		transactionId: string;
	};
}

const Home = ({ params: { transactionId } }: props) => {
	return <StrategyAnalytics transactionId={transactionId} />;
};

export default Home;
