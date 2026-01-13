import { ResponsiveModal } from '@/components/responsive-modal';
import { UploadButton } from '@/lib/uploadthing';
import { useRouter } from 'next/navigation';

interface BannerUploadModalProps {
	userId: string | null | undefined;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onComplete?: (userID: string | null | undefined) => Promise<void>;
}

export const BannerUploadModal = ({ userId, open, onOpenChange, onComplete }: BannerUploadModalProps) => {
	const router = useRouter();
	const onUploadComplete = (res: any) => {
		onOpenChange(false);
		router.refresh();
		onComplete?.(userId);
	};

	const onError = (error: Error) => {
		console.log('error', error);
	};

	return (
		<ResponsiveModal title="Upload a banner" open={open} onOpenChange={onOpenChange}>
			<UploadButton
				endpoint="bannerUploader"
				onClientUploadComplete={onUploadComplete}
				onUploadError={onError}
				className="ut-button bg-[#373737] text-white rounded-md px-4 py-2"
			/>
		</ResponsiveModal>
	);
};
