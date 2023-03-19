$(document).ready(function() {
    var postsDiv = $("#posts");

    $.getJSON("posts.json", function(data) {
        $.each(data.posts, function(i, post) {
            var postDiv = $("<div>").addClass("post");
            var postLink = $("<a>").attr("href", post.url);
            var postImg = $("<img>").attr("src", post.img);
            var postTitle = $("<h3>").text(post.title);
            var postAuthor = $("<p>").addClass("author").text("by " + post.author);
            var postDate = $("<p>").addClass("date").text(post.date);
            var postExcerpt = $("<p>").addClass("excerpt").text(post.excerpt);

            postLink.append(postImg);
            postDiv.append(postLink);
            postDiv.append(postTitle);
            postDiv.append(postAuthor);
            postDiv.append(postDate);
            postDiv.append(postExcerpt);
            postsDiv.append(postDiv);
        });
    });
});