'use client';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { PlaylistCreateModal } from '../components/playlist-create-modal';
import { PlaylistsSection } from '../sections/playlist-section';

export const PlaylistsView = () => {
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [refreshPage, setRefreshPage] = useState(0);

	const reloadThePage = () => {
		setRefreshPage((prev) => prev + 1);
	};
	return (
		<div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
			<PlaylistCreateModal
				open={createModalOpen}
				onOpenChange={setCreateModalOpen}
				reloadThePage={reloadThePage}
			/>
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-bold">Playlists</h1>
					<p className="text-xs text-muted-foreground">Collections you have created</p>
				</div>
				<Button variant="outline" size="icon" className="rounded-full" onClick={() => setCreateModalOpen(true)}>
					<PlusIcon />
				</Button>
			</div>
			<PlaylistsSection key={refreshPage} />
		</div>
	);
};
