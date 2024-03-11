'use client';
import { fetchBaseQueryError } from '@/redux/helpers';
import { toast } from 'react-toastify';
import { useAddDepositMethodMutation } from '@/redux/features/deposit/depositApi';
import React, { useEffect, useState } from 'react';
import Resizer from 'react-image-file-resizer';
import { ScaleLoader } from 'react-spinners';
import AllDepositMethods from '@/components/Depoosits/DepositMethods';
import ImageUpload from '@/components/Upload/image-upload';
import Wallets from '@/components/Depoosits/Wallets';

const DepositMethods = () => {
	const [addDepositMethod, { isLoading, isSuccess, isError, error }] =
		useAddDepositMethodMutation();
	const [username, setUsername] = useState('');
	const [usernameError, setUsernameError] = useState(false);

	const [inputError, setInputError] = useState('');

	const [walletAddress, setWalletAddress] = useState('');
	const [walletName, setWalletName] = useState('');
	const [imageUrl, setImageUrl] = useState<string>('');
	const [minDeposit, setMinDeposit] = useState<number>(0);
	const [networkFee, setNetworkFee] = useState<number>(0);
	const [blocks, setBlocks] = useState<number>(0);
	const [wallets, setWallets] = useState([] as any);

	const wallet = {
		wallet_name: walletName,
		wallet_address: walletAddress,
		qr_code_url: imageUrl,
		minimum_deposit: minDeposit,
		network_fee: networkFee,
		blocks: blocks,
		wallet_id: walletName.toLocaleLowerCase().split(' ').join('_'),
	};

	// handle change
	const handleChange = (e: any) => {
		const { name, value } = e.target;
		switch (name) {
			case 'username':
				setUsername(value);
				break;

			default:
				break;
		}
	};

	//handle submit wallet
	const handleSubmitWallet = () => {
		setWallets((prevWallets: any) => [...prevWallets, wallet]); // Push the wallet object directly into the array
		// console.log(wallets);
		setWalletName('');
		setWalletAddress('');
		setImageUrl('');
		setMinDeposit(0);
		setNetworkFee(0);
		setBlocks(0);
	};

	// handle submit
	const handleSubmit = (e: any) => {
		e.preventDefault();

		if (!username) {
			setUsernameError(true);
			setInputError('Username is required');
			return;
		}

		// if (!walletAddress) {
		// 	setTrxAddressError(true);
		// 	setInputError('Wallet Address is required');
		// 	return;
		// }

		const data = {
			username,
			wallets,
		};

		console.log(data);

		addDepositMethod(data);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('Deposit method added successfully');
			setUsername('');
			setWalletAddress('');
			setWalletName('');
			setImageUrl('');
			setWallets([]);
		}

		if (isError && error) {
			toast.error((error as fetchBaseQueryError).data?.message);
		}
	}, [isSuccess, isError, error]);

	return (
		<div>
			<div className='grid grid-cols-1'>
				{/* <!-- Input Fields --> */}
				<div className='bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark'>
					<div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
						<h3 className='font-medium text-black dark:text-white'>
							Add Deposit Method
						</h3>
					</div>

					{/* <!-- Username --> */}
					<div className='flex flex-col gap-3 p-6.5'>
						<div>
							<label className='block mb-3 text-black dark:text-white'>
								Username
							</label>
							<input
								type='text'
								placeholder='Username'
								name='username'
								value={username}
								onChange={handleChange}
								className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
							/>
							{usernameError && (
								<small className='text-red-500'>{inputError}</small>
							)}
						</div>
					</div>

					{/* Start Wallets */}
					<Wallets
						wallets={wallets}
						setWallets={setWallets}
						username={username}
					/>
					{/* Ends Wallets */}

					<div className='p-4 m-4 border-[1.5px] border-stroke dark:border-form-strokedark rounded-md '>
						{/*Star File Upload 2 */}

						<ImageUpload
							imageUrl={imageUrl}
							setImageUrl={setImageUrl}
							walletName={walletName}
							setWalletName={setWalletName}
							walletAddress={walletAddress}
							setWalletAddress={setWalletAddress}
							minDeposit={minDeposit}
							setMinDeposit={setMinDeposit}
							networkFee={networkFee}
							setNetworkFee={setNetworkFee}
							blocks={blocks}
							setBlocks={setBlocks}
						/>

						{/*End File Upload 2 */}
						{/*Wallet Submit Button */}
						<div className=' gap-5.5 px-4 mt-2 '>
							<button
								className='items-center justify-center px-4 py-2 font-medium text-center text-white rounded bg-orange hover:bg-opacity-90 '
								onClick={handleSubmitWallet}
							>
								Create Wallet
							</button>
						</div>
						{/* End Wallet Submit Button */}
					</div>

					{/* Submit Button */}
					<div className='flex flex-col gap-5.5 p-6.5'>
						<button
							className='items-center justify-center px-10 py-4 font-medium text-center text-white rounded bg-primary hover:bg-opacity-90 lg:px-8 xl:px-10'
							onClick={handleSubmit}
						>
							Submit
						</button>
					</div>
				</div>
			</div>

			<div className='my-6'>
				<AllDepositMethods />
			</div>
		</div>
	);
};

export default DepositMethods;
