import Image from 'next/image';
import React from 'react';

const Wallets = ({ wallets, setWallets, username }: any) => {
	return (
		<div>
			{wallets.length > 0 && (
				<div className='px-4 '>
					<div className='my-10 rounded-t-md  border-t-[1.5px] border-r-[1.5px] border-l-[1.5px] border-stroke dark:border-form-strokedark'>
						<h1 className='mt-2 text-2xl font-bold text-center'>
							Wallets for {username}
						</h1>

						<div className='w-full my-4'>
							<div className='grid grid-cols-4 gap-4 text-center text-gray-500 list-none border-b dark:text-gray-400 border-stroke dark:border-form-strokedark'>
								<li>Wallet Name</li>
								<li>Wallet Address</li>
								<li>Qr-Code</li>
								<li>Cancel</li>
							</div>

							{wallets.map((wallet: any, index: number) => (
								<div
									key={index}
									className='grid grid-cols-4 gap-4 p-4 text-center list-none border-b border-stroke dark:border-form-strokedark'
								>
									<li>{wallet.wallet_name}</li>
									<li className='text-xs '>{wallet.wallet_address}</li>
									<li className=''>
										<Image
											src={wallet.qr_code_url}
											alt='Picture of the author'
											width={100}
											height={100}
											className='mx-auto rounded-lg'
										/>
									</li>
									<li>
										<button
											className='text-red-500'
											onClick={() => {
												setWallets((prevWallets: any) =>
													prevWallets.filter((_: any, i: number) => i !== index)
												);
											}}
										>
											Cancel
										</button>
									</li>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Wallets;
