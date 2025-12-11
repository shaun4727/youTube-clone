import { deleteVideoSchemaOnReady, updateVideoSchema, updateVideoSchemaOnReady } from '@/data/videos';
import { mux } from '@/lib/mux';
import { headers } from 'next/headers';

const SIGNING_SECRET = process.env.MUX_WEBHOOK_SECRET;

import {
	VideoAssetCreatedWebhookEvent,
	VideoAssetDeletedWebhookEvent,
	VideoAssetErroredWebhookEvent,
	VideoAssetReadyWebhookEvent,
	VideoAssetTrackReadyWebhookEvent,
} from '@mux/mux-node/resources/webhooks';

type WebhookEvent =
	| VideoAssetCreatedWebhookEvent
	| VideoAssetReadyWebhookEvent
	| VideoAssetErroredWebhookEvent
	| VideoAssetTrackReadyWebhookEvent
	| VideoAssetDeletedWebhookEvent;

export const POST = async (request: Request) => {
	if (!SIGNING_SECRET) {
		throw new Error('MUX_WEBHOOK_SECRET is not set');
	}

	const headersPayload = await headers();
	const muxSignature = headersPayload.get('mux-signature');

	if (!muxSignature) {
		return new Response('No signature found', { status: 401 });
	}

	const payload = await request.json();
	const body = JSON.stringify(payload);

	mux.webhooks.verifySignature(body, { 'mux-signature': muxSignature }, SIGNING_SECRET);

	switch (payload.type as WebhookEvent['type']) {
		case 'video.asset.created': {
			const data = payload.data as VideoAssetCreatedWebhookEvent['data'];

			if (!data.upload_id) {
				return new Response('No upload ID found', { status: 400 });
			}

			await updateVideoSchema(data.upload_id, data.id, data.status);
			break;
		}
		case 'video.asset.ready': {
			const data = payload.data as VideoAssetReadyWebhookEvent['data'];
			const playbackId = data.playback_ids?.[0].id;

			if (!data.upload_id) {
				return new Response('Missing upload ID', { status: 400 });
			}

			if (!playbackId) {
				return new Response('Missing playback ID', { status: 400 });
			}

			const thumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg`;
			const previewUrl = `https://image.mux.com/${playbackId}/animated.gif`;

			const duration = data.duration ? Math.round(data.duration * 1000) : 0;

			await updateVideoSchemaOnReady({
				whereField: { key: 'muxUploadId', value: data.upload_id },
				data: {
					muxStatus: data.status,
					muxPlaybackId: playbackId,
					muxAssetId: data.id,
					thumbnailUrl: thumbnailUrl,
					previewUrl: previewUrl,
					duration: duration,
				},
				selectFields: {
					id: true,
					name: true,
					muxAssetId: true,
					muxStatus: true,
				},
			});
			break;
		}

		case 'video.asset.errored': {
			const data = payload.data as VideoAssetErroredWebhookEvent['data'];

			if (!data.upload_id) {
				return new Response('Missing upload ID', { status: 400 });
			}

			await updateVideoSchemaOnReady({
				whereField: { key: 'muxUploadId', value: data.upload_id },
				data: {
					muxStatus: data.status,
				},
				selectFields: {
					id: true,
					name: true,
					muxAssetId: true,
					muxStatus: true,
				},
			});
			break;
		}

		case 'video.asset.deleted': {
			const data = payload.data as VideoAssetDeletedWebhookEvent['data'];

			if (!data.upload_id) {
				return new Response('Missing upload ID', { status: 400 });
			}

			await deleteVideoSchemaOnReady({
				whereField: { key: 'muxUploadId', value: data.upload_id },
				selectFields: {
					id: true,
					name: true,
					muxAssetId: true,
					muxStatus: true,
				},
			});
		}

		case 'video.asset.track.ready': {
			const data = payload.data as VideoAssetTrackReadyWebhookEvent['data'] & {
				asset_id: string;
			};

			const assetId = data.asset_id;
			const trackId = data.id;
			const status = data.status;

			if (!data.asset_id) {
				return new Response('Missing asset ID', { status: 400 });
			}

			await updateVideoSchemaOnReady({
				whereField: { key: 'muxAssetId', value: assetId },
				data: {
					muxTrackId: trackId,
					muxTrackStatus: status,
				},
				selectFields: {
					id: true,
					name: true,
					muxAssetId: true,
					muxStatus: true,
				},
			});
		}
	}

	return new Response('Webhook received', { status: 200 });
};
