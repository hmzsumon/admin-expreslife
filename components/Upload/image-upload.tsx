'use client';

import { UploadButton, UploadDropzone } from '@/lib/uploadthing';
import Image from 'next/image';
import { useState } from 'react';

const ImageUpload = ({
	imageUrl,
	setImageUrl,
	walletName,
	setWalletName,
	walletAddress,
	setWalletAddress,
	minDeposit,
	setMinDeposit,
	networkFee,
	setNetworkFee,
	blocks,
	setBlocks,
}: {
	imageUrl: string;
	setImageUrl: (value: string) => void;
	walletName: string;
	setWalletName: (value: string) => void;
	walletAddress: string;
	setWalletAddress: (value: string) => void;
	minDeposit: number;
	setMinDeposit: (value: number) => void;
	networkFee: number;
	setNetworkFee: (value: number) => void;
	blocks: number;
	setBlocks: (value: number) => void;
}) => {
	const [fileName, setFileName] = useState<string>('');
	// handle change
	const handleChange = (e: any) => {
		const { name, value } = e.target;
		switch (name) {
			case 'walletName':
				setWalletName(value);
				break;
			case 'walletAddress':
				setWalletAddress(value);
				break;
			case 'minDeposit':
				setMinDeposit(value);
				break;
			case 'networkFee':
				setNetworkFee(value);
				break;
			case 'blocks':
				setBlocks(value);
				break;

			default:
				break;
		}
	};
	return (
		<main className='px-4'>
			{/*Start Wallet name */}
			<div className='my-2'>
				<label className='block mb-3 text-black dark:text-white'>
					Wallet Name
				</label>
				<input
					type='text'
					placeholder='Wallet Name'
					name='walletName'
					value={walletName}
					onChange={handleChange}
					className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
				/>
			</div>
			{/*End Wallet address */}
			{/*Start Wallet address */}
			<div className='my-2'>
				<label className='block mb-3 text-black dark:text-white'>
					Wallet Address
				</label>
				<input
					type='text'
					placeholder='Wallet Address'
					name='walletAddress'
					value={walletAddress}
					onChange={handleChange}
					className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
				/>
			</div>

			{/* Start Min, fee and blocks */}
			<div className='grid grid-cols-3 gap-2'>
				<div className='my-2'>
					<label className='block mb-3 text-black dark:text-white'>
						Minimum Deposit
					</label>
					<input
						type='number'
						placeholder='Minimum Deposit'
						name='minDeposit'
						value={minDeposit}
						onChange={handleChange}
						className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
					/>
				</div>

				<div className='my-2'>
					<label className='block mb-3 text-black dark:text-white'>
						Network Fee
					</label>
					<input
						type='number'
						placeholder='Network Fee'
						name='networkFee'
						value={networkFee}
						onChange={handleChange}
						className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
					/>
				</div>

				<div className='my-2'>
					<label className='block mb-3 text-black dark:text-white'>
						Blocks
					</label>
					<input
						type='number'
						placeholder='Blocks'
						name='blocks'
						value={blocks}
						onChange={handleChange}
						className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
					/>
				</div>
			</div>
			{/* Start Min, fee and blocks */}

			{/*End Wallet address */}
			{imageUrl ? (
				<div>
					<div>
						<Image
							src={imageUrl}
							alt='wallet'
							width={200}
							height={200}
							className='h-20 rounded-lg w-200 ring-2 ring-blue-500'
						/>
						<small className='text-center text-black dark:text-white'>
							{fileName}
						</small>
					</div>
					{/* cancel imag button */}
					<button
						onClick={() => setImageUrl('')}
						className='p-2 my-2 text-white bg-red-500 rounded-lg'
					>
						Change Image
					</button>
				</div>
			) : (
				<UploadDropzone
					className='mt-4 bg-slate-800 ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300 ut-button:ut-uploading:bg-blue ut-button:ut-uploading:text-slate-800 ut-button:ut-uploading:hover:bg-red-400 ut-button:bg-blue '
					endpoint='imageUploader'
					onClientUploadComplete={(res) => {
						// Do something with the response
						console.log('Files: ', res);
						alert('Upload Completed');
						setImageUrl(res[0].url);
						setFileName(res[0].name);
					}}
					onUploadError={(error: Error) => {
						// Do something with the error.
						alert(`ERROR! ${error.message}`);
					}}
				/>
			)}
		</main>
	);
};

export default ImageUpload;
