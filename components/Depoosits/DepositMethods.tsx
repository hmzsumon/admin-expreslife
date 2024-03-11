'use client';
import React, { useEffect } from 'react';
import { fetchBaseQueryError } from '@/redux/helpers';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SyncLoader } from 'react-spinners';
import {
	useActivateDepositMethodMutation,
	useGetDepositMethodsQuery,
} from '@/redux/features/deposit/depositApi';
import {
	addDepositMethod,
	removeDepositMethod,
} from '@/redux/features/deposit/depositSlice';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

const darkTheme = createTheme({
	palette: {
		mode: 'dark', // Set the mode to dark
		// You can further customize colors, typography, etc. here if needed
	},
});

const AllDepositMethods = () => {
	const { data, isLoading, isError, error } = useGetDepositMethodsQuery();
	const { methods } = data || [];

	const [
		activateDepositMethod,
		{
			isLoading: a_isLoading,
			isError: a_isError,
			isSuccess: a_isSuccess,
			error: a_error,
		},
	] = useActivateDepositMethodMutation();

	// handle activate
	const handleActivate = (id: string) => {
		activateDepositMethod(id);
	};

	const dispatch = useDispatch();

	// handle view methods
	const handleViewMethods = (wallets: any, username: any) => {
		dispatch(addDepositMethod({ username, wallets }));
	};

	useEffect(() => {
		if (a_isSuccess) {
			toast.success('Deposit method activated successfully');
		}
		if (a_isError) {
			toast.error((a_error as fetchBaseQueryError).data?.message);
		}
	}, [a_isSuccess, a_isError, a_error]);

	const columns: GridColDef[] = [
		{
			field: 'username',
			headerName: 'Username',
			width: 150,
		},

		{
			field: 'methods',
			headerName: 'Methods',
			width: 400,

			renderCell: (params: any) => {
				return (
					<div className=''>
						<h2>
							{params.row.methods.length} methods are available for{' '}
							{params.row.username}
						</h2>
					</div>
				);
			},
		},

		{
			field: 'is_active',
			headerName: 'Status',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='flex items-center justify-center'>
						{params.value ? (
							<span className='px-2 py-1 text-xs text-green-500 bg-green-100 rounded-full'>
								Active
							</span>
						) : (
							<span className='px-2 py-1 text-xs text-red-500 bg-red-100 rounded-full'>
								Inactive
							</span>
						)}
					</div>
				);
			},
		},
		{
			field: 'action',
			headerName: 'Action',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='flex items-center justify-center'>
						{params.row.is_active === true ? (
							<button className='px-2 py-1 text-xs text-white bg-red-500 rounded-full'>
								Deactivate
							</button>
						) : (
							<button
								className='px-2 py-1 text-xs text-white bg-green-500 rounded-full'
								onClick={() => handleActivate(params.row.id)}
							>
								Activate
							</button>
						)}
					</div>
				);
			},
		},

		// view methods button
		{
			field: 'view',
			headerName: 'View',
			width: 150,
			renderCell: (params) => {
				return (
					<div className='flex items-center justify-center'>
						<Link href='/deposit/wallets'>
							<button
								className='px-2 py-1 text-xs text-white rounded-full bg-primary'
								onClick={() =>
									handleViewMethods(params.row.methods, params.row.username)
								}
							>
								View
							</button>
						</Link>
					</div>
				);
			},
		},
	];

	const rows: any[] = [];

	methods &&
		methods.map((method: any) => {
			return rows.push({
				id: method._id,
				username: method.username,
				is_active: method.is_active,
				methods: method.wallets,
			});
		});
	return (
		<div>
			{isLoading ? (
				<div className='flex items-center justify-center '>
					<SyncLoader color='#EAB308' size={10} />
				</div>
			) : (
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
							/>
						</Box>
					</ThemeProvider>
				</div>
			)}
		</div>
	);
};

export default AllDepositMethods;
