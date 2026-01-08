'use client';

import { useAuthUI } from '@/context/user-context';
import { Playlists } from '@/types';
import { useEffect, useState } from 'react';
import { PlaylistGridCard } from '../components/playlist-grid-card';

export const PlaylistsSection = () => {
	const [offset, setOffset] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const { userInfo: user } = useAuthUI();
	const [playList, setPlayList] = useState<Playlists[]>();

	const getPlaylists = async (currentOffset = 0, initialLoad = true) => {
		if (!user) {
			return;
		}
		const count = currentOffset * 5;
		setIsLoading(true);
		const res = await fetch(`/api/playlist-api?userId=${user?.id}`, {
			method: 'GET',
		});
		setIsLoading(false);

		const response = await res.json();

		setPlayList(response);
	};

	const fetchNextVideoPage = () => {
		setOffset((prev) => prev + 1);

		getPlaylists(offset, false);
	};

	useEffect(() => {
		getPlaylists();
	}, [user]);

	return (
		<>
			<div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
				{playList?.map((playlist) => (
					<PlaylistGridCard data={playlist} key={playlist.id} />
				))}
			</div>
		</>
	);
};
