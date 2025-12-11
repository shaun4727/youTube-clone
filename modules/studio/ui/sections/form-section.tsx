'use client';

import { SingleVideoType } from '@/types';

export const FormSection = ({ video }: { video: SingleVideoType }) => {
	return <>{JSON.stringify(video)}</>;
};
