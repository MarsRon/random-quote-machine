const { floor, random } = Math;

const colors = ["#16a085", "#27ae60", "#2c3e50", "#f39c12", "#e74c3c", "#9b59b6", "#FB6964", "#342224", "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

let quotes, color, lastIndex;
let suggesting = false;

function getQuote() {
	let index;
	do {
		index = floor(random() * quotes.length);
	} while (index === lastIndex);
	lastIndex = index;

	const { quote, author } = quotes[index];

	$(".quote-text").animate({ opacity: 0 }, 500, function () {
		$(this).animate({ opacity: 1 }, 500);
		$("#text").text(quote);
	});
	$(".quote-author").animate({ opacity: 0 }, 500, function () {
		$(this).animate({ opacity: 1 }, 500);
		$("#author").html(author);
	});

	color = colors[floor(random() * colors.length)];
	$("html,body").animate({ backgroundColor: color, color }, 1000);
	$(".button").animate({ backgroundColor: color }, 1000);
	
	$("#tweet-quote").attr("href", `https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(`'${quote}' ${author}`)}`);
	$("#tumblr-quote").attr("href", `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${encodeURIComponent(author)}&content=${encodeURIComponent(quote)}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`);	
}

function suggestQuote() {
	$("#input-text").attr("style", "color: " + color);
	$("#input-author").attr("style", "color: " + color);
	$("#cancel-quote").attr("style", "background-color: " + color);
	$("#submit-quote").attr("style", "background-color: " + color);
	$("#text").attr("style", "display:none");
	$("#author").attr("style", "display:none");
	$("#new-quote").attr("style", "display:none");
	$("#suggest-quote").attr("style", "display:none");
}

function cancelSuggest() {
	$("#input-text").attr("style", "display:none").val("");
	$("#input-author").attr("style", "display:none").val("");
	$("#cancel-quote").attr("style", "display:none");
	$("#submit-quote").attr("style", "display:none");
	$("#text").removeAttr("style");
	$("#author").removeAttr("style");
	$("#new-quote").attr("style", "background-color: " + color);
	$("#suggest-quote").attr("style", "background-color: " + color);
}

function submitSuggest() {
	const quote = $("#input-text").val().trim(), author = $("#input-author").val().trim();
	if (quote === "" || author === "") return;
	const xhr = new XMLHttpRequest();
	xhr.open("POST", "https://discord.com/api/webhooks/821278232610996274/YySOToxTogqQsmUH6WUFSe3Gs7PtZbh2IhWLwqsuzmeRc_zn-6BbFsCxs6dttA71VmjW", true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(JSON.stringify({embeds:[{description:`"${quote}"\n- ${author}\n\`\`\`json\n{"quote":"${quote}","author":"${author}"}\`\`\``,color:2793983}]}));
	cancelSuggest();
	alert("Thanks for suggesting a quote!");
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
	$("#suggest-quote").on("click", suggestQuote);
	$("#cancel-quote").on("click", cancelSuggest);
	$("#submit-quote").on("click", submitSuggest);
});