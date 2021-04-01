import {
	Backdrop,
	Button,
	CircularProgress,
	makeStyles,
	Paper,
} from '@material-ui/core'
import { useState } from 'react'
import useSWR from 'swr'
import Header from './Header'
import Quote from './Quote'
const fetcher = (...args) => fetch(...args).then((res) => res.json())
const useStyles = makeStyles({
	center: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		height: '100vh',
		flexDirection: 'column',
	},
	quoteBox: {
		backgroundColor: '#4f4f4f',
		borderRadius: '10px',
		width: '80vw',
		height: '60vh',
	},
})

function randomArray(a) {
	return a[Math.floor(a.length * Math.random())]
}

export default function Main() {
	const classes = useStyles()
	const [quote, setQuote] = useState(null)
	const { data, error } = useSWR(
		'https://raw.githubusercontent.com/MarsRon/random-quote-machine/master/quotes.json',
		fetcher,
		{
			onSuccess(data) {
				if (!quote) {
					setQuote(randomArray(data))
				}
			},
		}
	)
	if (!data || !quote) {
		return (
			<Backdrop open={true}>
				<CircularProgress color="inherit" />
			</Backdrop>
		)
	}
	if (error) {
		return <div>There was an error while fetching quotes!</div>
	}
	return (
		<div>
			<Header />
			<Paper className={classes.center}>
				<div className={`${classes.quoteBox} ${classes.center}`}>
					<Quote author={quote.author} quote={quote.quote} />
				</div>
				<Button
					color="primary"
					variant="contained"
					onClick={() => {
						setQuote(randomArray(data))
					}}
				>
					Get a new quote!
				</Button>
			</Paper>
		</div>
	)
}
