import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuthUI } from '@/context/user-context';
import { ReactionType } from '@/generated/prisma/enums';
import { cn } from '@/lib/utils';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface VideoReactionProps {
	videoId: string;
	likes: number;
	dislikes: number;
	viewerReaction: ReactionType;
}

export const VideoReactions = ({ videoId, likes, dislikes, viewerReaction }: VideoReactionProps) => {
	const { userInfo } = useAuthUI();
	const router = useRouter();

	const createVideoReaction = async (reactionType: ReactionType) => {
		try {
			let toastId: string | number = '1';

			const formPayload = {
				userId: userInfo?.id,
				videoId: videoId,
				type: reactionType,
			};

			const res = await fetch('/api/video-reaction', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formPayload),
			});

			if (res.status == 200) {
				toastId = toast.success('Video reaction created successfully!', { id: toastId });
				router.refresh();
			} else {
				toast.error('Video reaction creation failed!', { id: toastId });
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="flex items-center flex-none">
			<Button
				variant="secondary"
				className="rounded-l-full rounded-r-none gap-2 pr-4"
				onClick={() => createVideoReaction('like')}
			>
				<ThumbsUpIcon className={cn('size-5', viewerReaction === 'like' && 'fill-black')} />
				{likes}
			</Button>
			<Separator orientation="vertical" className="h-7" />
			<Button
				variant="secondary"
				className="rounded-l-none rounded-r-full pl-3"
				onClick={() => createVideoReaction('dislike')}
			>
				<ThumbsDownIcon className={cn('size-5', viewerReaction === 'dislike' && 'fill-black')} />
				{dislikes}
			</Button>
		</div>
	);
};
