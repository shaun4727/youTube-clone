import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlaylistAddModal } from '@/modules/playlists/components/playlist-add-modal';
import { ListPlusIcon, MoreVerticalIcon, ShareIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface VideoMenuProps {
	videoId: string;
	variant?: 'ghost' | 'secondary';
	onRemove?: (e: React.MouseEvent<HTMLDivElement>, videoId: string) => void;
}

// TODO: implement whats left
export const VideoMenu = ({ videoId, variant, onRemove }: VideoMenuProps) => {
	const [isOpenPlaylistAddModal, setIsOpenPlaylistAddModal] = useState(false);
	const onShare = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		const fullUrl = `${process.env.VERCEL_URL || 'http://localhost:3000'}/videos/${videoId}`;

		navigator.clipboard.writeText(fullUrl);
		toast.success('Link copied to the clipboard');
	};

	return (
		<>
			<PlaylistAddModal
				open={isOpenPlaylistAddModal}
				onOpenChange={setIsOpenPlaylistAddModal}
				videoId={videoId}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant={variant} size="icon" className="rounded-full">
						<MoreVerticalIcon />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={onShare}>
						<ShareIcon className="mr-2 size-4" />
						Share
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setIsOpenPlaylistAddModal(true)}>
						<ListPlusIcon className="mr-2 size-4" />
						Add to playlist
					</DropdownMenuItem>
					{onRemove && (
						<DropdownMenuItem onClick={(e) => onRemove(e, videoId)}>
							<Trash2Icon className="mr-2 size-4" />
							Remove
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
