const bookApp = {};

const dbRef = firebase.database().ref();

dbRef.push('hello!');

bookApp.init = function(){
	bookApp.findBooks();
};

const goodreadsKey = '3Hm2ArDCENyN8Hp1Xu8GBQ';

bookApp.findBooks = function(){
$.ajax({
		url:"http://proxy.hackeryou.com",
		method:"GET",
		dataType:"json",
		data: {
			reqUrl:'https://www.goodreads.com/search/index.xml',
			params: {
				// q: "Zadie Smith",
				key: goodreadsKey,
				search: "author"
			},
			xmlToJSON: true,
		}
	}).then(function(res){
		const authorInfo = res.GoodreadsResponse.search.results.work;
		
		bookApp.displayInfo(authorInfo);
	});
};

bookApp.displayInfo = function(books) {
	books.forEach(function(authorInfo){
		const author = $('<h3>').text(authorInfo.best_book.author.name);
		const title = $('<h2>').text(authorInfo.best_book.title);
		const image = $('<img>').attr("src", authorInfo.best_book.image_url);
		const bookList = $('<div>').append(title, image, author);
		$('.booksToDiscover').append(bookList);
	});
};


$(function(){
	bookApp.init();
});