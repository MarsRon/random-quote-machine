import { Button, makeStyles, Paper, TextField } from '@material-ui/core'
import { useState } from 'react'
import Header from './Header'
import { WebhookClient, MessageEmbed } from 'discord.js'
const useStyles = makeStyles({
	center: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		height: '100vh',
		flexDirection: 'column',
	},
})
const webhook = new WebhookClient(
	'821278232610996274',
	'YySOToxTogqQsmUH6WUFSe3Gs7PtZbh2IhWLwqsuzmeRc_zn-6BbFsCxs6dttA71VmjW'
)

export default function Suggest() {
	const [quote, setQuote] = useState(null)
	const [author, setAuthor] = useState(null)
	const classes = useStyles()
	return (
		<div>
			<Header />
			<Paper className={classes.center}>
				<TextField
					label="Quote"
					variant="outlined"
					color="primary"
					onChange={(v) => {
						setQuote(v.target.value)
					}}
				/>
				<TextField
					label="Author"
					variant="outlined"
					color="primary"
					onChange={(v) => {
						setAuthor(v.target.value)
					}}
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={() => {
						const message = new MessageEmbed()
							.setDescription(
								`${quote}\n - ${author}\n\`\`\`json\n{"quote": ${quote}, "author": ${author}}\`\`\``
							)
							.setColor('#FFB6C1')
						webhook.send(message).then(() => {
							alert('Thanks for the suggestion!')
						})
					}}
				>
					Send
				</Button>
			</Paper>
		</div>
	)
}
