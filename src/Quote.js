import { makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles({
	quote: {
		fontSize: '3vw',
		marginTop: '0',
	},
	author: {
		fontSize: '1.5vw',
	},
	centerText: {
		textAlign: 'center',
	},
})
export default function Quote({ quote, author }) {
	const classes = useStyles()
	return (
		<div className={classes.centerText}>
			<blockquote>
				<Typography className={classes.quote}>"{quote}"</Typography>
			</blockquote>
			<Typography className={classes.author}>- {author}</Typography>
		</div>
	)
}
