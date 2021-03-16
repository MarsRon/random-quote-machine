const { floor, random } = Math;

const colors = ["#16a085", "#27ae60", "#2c3e50", "#f39c12", "#e74c3c", "#9b59b6", "#FB6964", "#342224", "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

let quotes;

function getQuote() {
	const { quote, author } = quotes[floor(random() * quotes.length)];

	$(".quote-text").animate({ opacity: 0 }, 500, function () {
		$(this).animate({ opacity: 1 }, 500);
		$("#text").text(quote);
	});
	$(".quote-author").animate({ opacity: 0 }, 500, function () {
		$(this).animate({ opacity: 1 }, 500);
		$("#author").html(author);
	});

	const color = colors[floor(random() * colors.length)];
	$("html body").animate({ backgroundColor: color, color }, 1000);
	$(".button").animate({ backgroundColor: color }, 1000);
	
	$("#tweet-quote").attr("href", `https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(`'${quote}' ${author}`)}`);
	$("#tumblr-quote").attr("href", `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${encodeURIComponent(author)}&content=${encodeURIComponent(quote)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`);	
}

$(document).ready(() => {
	$.ajax({
		headers: { Accept: "application/json" },
		url: "https://raw.githubusercontent.com/MarsRon/random-quote-machine/master/quotes.json",
		success(jsonQuotes) {
			if (typeof jsonQuotes === "string") quotes = JSON.parse(jsonQuotes);
		}
	})
	.then(getQuote);

	$("#new-quote").on("click", getQuote);
});