import { ResponsiveModal } from '@/components/responsive-modal';
import { UploadButton } from '@/lib/uploadthing';
import { useRouter } from 'next/navigation';

interface ThumbnailUploadModalProps {
	videoId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export const ThumbnailUploadModal = ({ videoId, open, onOpenChange }: ThumbnailUploadModalProps) => {
	const router = useRouter();
	const onUploadComplete = (res: any) => {
		onOpenChange(false);
		router.refresh();
	};

	const onError = (error: Error) => {
		console.log('error', error);
	};

	return (
		<ResponsiveModal title="Upload a thumbnail" open={open} onOpenChange={onOpenChange}>
			{/* <UploadDropzone
				endpoint="thumbnailUploader"
				input={{ videoId }}
				onClientUploadComplete={onUploadComplete}
				onUploadError={onError}
			/> */}
			<UploadButton
				endpoint="thumbnailUploader"
				onClientUploadComplete={onUploadComplete}
				input={{ videoId }}
				onUploadError={onError}
				className="ut-button bg-[#373737] text-white rounded-md px-4 py-2"
			/>
		</ResponsiveModal>
	);
};
