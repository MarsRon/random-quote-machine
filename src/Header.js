import {
	AppBar,
	IconButton,
	Toolbar,
	Typography,
	makeStyles,
	MenuItem,
	Menu,
	Breadcrumbs,
} from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import React from 'react'
import { Link as ReactLink, useLocation } from 'react-router-dom'
const useStyles = makeStyles({
	title: {
		flexGrow: 1,
		color: '#FFF',
	},
	text: {
		padding: '10px',
	},
	github: {
		color: '#FFF',
	},
	bar: {
		position: 'fixed',
	},
})

export default function Header() {
	const classes = useStyles()
	const location = useLocation()
	const [anchorEl, setAnchorEl] = React.useState(null)
	const open = Boolean(anchorEl)

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	return (
		<AppBar position="static" className={classes.bar}>
			<Toolbar>
				<div>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={handleMenu}
					>
						<MenuIcon />
					</IconButton>
					<Menu
						id="simple-menu"
						keepMounted
						open={open}
						onClose={handleClose}
						anchorEl={anchorEl}
					>
						<MenuItem component={ReactLink} to="">
							Main
						</MenuItem>
						<MenuItem component={ReactLink} to="suggest">
							Suggest a quote
						</MenuItem>
					</Menu>
				</div>

				<Breadcrumbs className={classes.title}>
					<Typography color="inherit">{window.location.hostname}</Typography>
					<Typography>{location.pathname.substring(1)}</Typography>
				</Breadcrumbs>
			</Toolbar>
		</AppBar>
	)
}
