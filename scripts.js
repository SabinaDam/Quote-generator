const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loader

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote

function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);

    //Check if Author field is blank and replace it with 'Unknown'

    if (!quote.author) {
        authorText.textContent = 'Unknown';
    }else{
        // Split the author's name by space and take the first part
        const authorParts = quote.author.split (',');
        authorText.textContent = authorParts[0]; 
    }


    //Check Quote lenght to deternine styling

    if(quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get quotes from API

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch error here
        console.error('Error fetching quotes:', error);
    }
}

//Tweet quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load

getQuotes();

