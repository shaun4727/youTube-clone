'use client';

import { individualPlaylist } from '@/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { PlaylistHeaderSection } from '../sections/playlist-header-section';
import { VideosSection } from '../sections/videos-section';

interface VideosViewProps {
	playlistId: string;
}

export const VideosView = ({ playlistId }: VideosViewProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [playlistInfo, setPlaylistInfo] = useState<individualPlaylist>({
		playlistInfoWithLimit: {
			name: '',
			videos: [],
		},
		hasNextPage: false,
	});

	const getIndividualPlaylistInfo = async (offset: number = 0) => {
		try {
			setIsLoading(true);
			const res = await fetch(`/api/individual-playlist?playlistId=${playlistId}&number=${offset}`, {
				method: 'GET',
			});
			setIsLoading(false);

			const result = await res.json();
			setPlaylistInfo(result);
		} catch (err) {
			console.log(err);
		}
	};

	const resetPlaylistInfoStateOnDelete = async () => {
		try {
			const response = await fetch(
				`/api/individual-playlist?playlistId=${playlistInfo.playlistInfoWithLimit.id}`,
				{
					method: 'DELETE',
				},
			);

			if (response.status == 200) {
				setPlaylistInfo({
					playlistInfoWithLimit: {
						name: '',
						videos: [],
					},
					hasNextPage: false,
				});
				toast.success('Playlist deleted successfully!', { id: 1 });
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getIndividualPlaylistInfo();
	}, [playlistId]);

	return (
		<div className="max-w-3xl mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6 border ">
			<PlaylistHeaderSection playlistInfo={playlistInfo} removePlaylistMethod={resetPlaylistInfoStateOnDelete} />
			<VideosSection
				playlistInfo={playlistInfo}
				getIndividualPlaylistInfo={getIndividualPlaylistInfo}
				isLoading={isLoading}
			/>
		</div>
	);
};
