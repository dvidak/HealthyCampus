import {
	Box,
	Collapse,
	IconButton,
	Input,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import SaveIcon from '@material-ui/icons/Save';
import { default as React, useState } from 'react';
import { University } from '../../../models/University';

interface Props {
	row: University;
	onSaveRow: (universityId: number, unitId: number, name: string) => void;
}

const UniversityRow = ({ row, onSaveRow }: Props) => {
	const [open, setOpen] = React.useState(false);
	const [name, setName] = useState<string | undefined>();

	const [inEditMode, setInEditMode] = useState({
		status: false,
		rowKey: null,
	});

	const onEditUnit = ({ id, currentName }: any) => {
		setInEditMode({
			status: true,
			rowKey: id,
		});
		setName(currentName);
	};

	const onSaveUnit = ({ universityId, unitId, newName }: any) => {
		onSaveRow(universityId, unitId, newName);
		setName(newName);
		setInEditMode({
			status: false,
			rowKey: null,
		});
	};

	const onCancelUnit = () => {
		setInEditMode({
			status: false,
			rowKey: null,
		});
		setName(undefined);
	};

	return (
		<>
			<TableRow className="table-row">
				<TableCell>
					<IconButton size="small" onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell>{row.name}</TableCell>
				<TableCell align="right"></TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open}>
						<Box margin={1}>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>Units</TableCell>
										<TableCell align="right"></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.units.map((unit) => (
										<TableRow key={unit.id}>
											<TableCell>
												{inEditMode.status && inEditMode.rowKey === unit.id ? (
													<Input
														color="secondary"
														fullWidth
														value={name}
														onChange={(event) => setName(event.target.value)}
													/>
												) : (
													unit.name
												)}
											</TableCell>
											<TableCell>
												{inEditMode.status && inEditMode.rowKey === unit.id ? (
													<>
														<IconButton
															color="secondary"
															onClick={() =>
																onSaveUnit({
																	universityId: row.id,
																	unitId: unit.id,
																	newName: name,
																})
															}
														>
															<SaveIcon />
														</IconButton>

														<IconButton
															color="secondary"
															onClick={onCancelUnit}
														>
															<ClearIcon />
														</IconButton>
													</>
												) : (
													<IconButton
														color="secondary"
														onClick={() =>
															onEditUnit({
																id: unit.id,
																currentName: unit.name,
															})
														}
													>
														<EditIcon />
													</IconButton>
												)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
};

export default UniversityRow;
