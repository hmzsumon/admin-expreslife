'use client';
import React, { use, useEffect } from 'react';
import { removeDepositMethod } from '@/redux/features/deposit/depositSlice';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, GridColDef, gridClasses } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaHandPointLeft } from 'react-icons/fa';

const darkTheme = createTheme({
	palette: {
		mode: 'dark', // Set the mode to dark
		// You can further customize colors, typography, etc. here if needed
	},
});

const Wallets = () => {
	const router = useRouter();
	const { method } = useSelector((state: any) => state.deposit);
	const { wallets, username } = method || { wallets: [], username: '' };
	const dispatch = useDispatch();
	// useEffect(() => {
	// 	return () => {
	// 		dispatch(removeDepositMethod(undefined));
	// 	};
	// }, [dispatch]);

	const columns: GridColDef[] = [
		{
			field: 'wallet_name',
			headerName: 'Wallet Name',
			width: 150,
		},

		{
			field: 'wallet_address',
			headerName: 'Wallet Address',
			width: 400,

			renderCell: (params) => {
				return <div className='flex items-center'>{params.value}</div>;
			},
		},

		{
			field: 'imgUrl',
			headerName: 'QR Code',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='flex items-center justify-center'>
						<Image
							src={params.value}
							alt='qr-code'
							width={100}
							height={100}
							layout='fixed'
							objectFit='cover'
							className='rounded-md'
						/>
					</div>
				);
			},
		},
	];

	const rows: any[] = [];
	wallets.forEach((wallet: any) => {
		rows.push({
			id: wallet._id,
			wallet_name: wallet.wallet_name,
			wallet_address: wallet.wallet_address,
			imgUrl: wallet.qr_code_url,
		});
	});

	return (
		<div>
			<div className='flex items-center justify-between px-2 py-2 bg-gray-800'>
				<button
					className='flex items-center gap-2 px-2 py-1 text-white bg-blue-500 rounded-full'
					onClick={() => router.back()}
				>
					<FaHandPointLeft />
					Back
				</button>
				<div className='flex items-center justify-center w-full h-16 bg-gray-800 rounded-lg dark:bg-form-inputdark'>
					<h1 className='text-center '>
						<span className='uppercase '>{username}</span> {}
						Wallets
					</h1>
				</div>
			</div>

			<div className='px-2 mt-4 '>
				<ThemeProvider theme={darkTheme}>
					<Box sx={{ height: 400, width: '100%' }}>
						<DataGrid
							rows={rows}
							columns={columns}
							initialState={{
								pagination: {
									paginationModel: {
										pageSize: 5,
									},
								},
							}}
							pageSizeOptions={[5]}
							disableRowSelectionOnClick
							getRowHeight={() => 'auto'}
							sx={{
								[`& .${gridClasses.cell}`]: {
									py: 1,
								},
							}}
						/>
					</Box>
				</ThemeProvider>
			</div>
		</div>
	);
};

export default Wallets;
