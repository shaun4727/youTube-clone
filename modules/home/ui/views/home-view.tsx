import { CategoriesSection } from '../sections/category-section';
import { HomeVideosSection } from '../sections/home-videos-section';

interface HomeViewProps {
	categoryId?: string;
}

export const HomeView = ({ categoryId }: HomeViewProps) => {
	return (
		<div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6 border ">
			<CategoriesSection categoryId={categoryId} />
			<div>
				<h1 className="text-2xl font-bold">Home</h1>
				<p className="text-xs text-muted-foreground">Videos from your favorite creators</p>
			</div>

			<HomeVideosSection categoryId={categoryId} />
		</div>
	);
};
