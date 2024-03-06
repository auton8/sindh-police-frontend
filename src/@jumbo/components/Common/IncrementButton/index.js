import React from 'react';
import { Popover, Box, Typography, Button, Paper } from '@material-ui/core'
import './style.css'
import { useState } from 'react';

const TooltipTitleContent = ({ dismissTooltip, onRequestUpgrade }) => {
	return (
		<Box style={{ position: "relative" }}>
			<Paper elevation={3}>
				<Box padding={"10px"}>
					<Typography variant="body1" gutterBottom>
						Upgrade to premium to unlock additional features!
					</Typography>
					<Box display="flex" justifyContent="flex-end" mt={2}>
						<Button color="default" variant="text" onClick={dismissTooltip}>
							Dismiss
						</Button>
						<Button color="primary" variant="contained" onClick={onRequestUpgrade}>
							Contact Sales
						</Button>
					</Box>
				</Box>
				<Box
					sx={{
						position: 'absolute',
						top: '-10px',
						left: '50%',
						transform: 'translateX(-50%)',
						width: '20px',
						height: '20px',
						background: '#fff',
						clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
					}}
				/>
			</Paper>
		</Box>
	)
}
function IncrementInput({
	onChange = console.log,
	min = 0,
	max = 999999999999999999999999999999999999,
	initialValue = 1,
	inputClassName = '',
	onRequestUpgrade = console.log,
	disabled = false,
	isDecimal = false,
}) {
	const [count, setCount] = React.useState(initialValue);
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const handleInputChange = (event) => {
		let value = Number(event.target.value);
		if (!isNaN(value)) {
			if (isDecimal) {
				setCount(value);
				onChange(value);
			} else {
				if (!isNaN(value) && value >= min && value <= max) {
					value = value.toFixed(0)
					setCount(value);
					onChange(value);
				}
			}
		}
	};
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "clickable-tooltip" : undefined;

	const closeTooltip = () => {
		if (tooltipOpen) {
			setTooltipOpen(false)
		}
	}
	const handleIncrement = (e) => {
		if (count < max) {
			setCount(count + 1);
			onChange(count + 1);
			closeTooltip();
		} else {
			handleClick(e)
		}
	};

	const handleDecrement = () => {
		if (count > min) {
			setCount(count - 1);
			onChange(count - 1);
			closeTooltip();
		}
	};

	const handleRequestUpgrade = () => {
		onRequestUpgrade();
		closeTooltip();
	}

	return (
		<div className="increment-decrement-container">
			<button className="increment-decrement-button" onClick={handleDecrement} disabled={disabled}>
				-
			</button>
			<input
				className={"increment-decrement-input" + " " + inputClassName}
				type="number"
				value={count}
				onChange={handleInputChange}
				min={min}
				max={max}
				disabled={disabled}
			/>
			<button className="increment-decrement-button" onClick={handleIncrement} disabled={disabled}>
				+
			</button>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center"
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center"
				}}
				classes={{
					root: "increment-popover-root",
					popper: "increment-popover-container"
				}}
			>
				<TooltipTitleContent dismissTooltip={handleClose} onRequestUpgrade={handleRequestUpgrade} />
			</Popover>
		</div>
	)
}

export default IncrementInput