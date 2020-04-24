$(document).ready(function () {
    var JSONBLOB_URL = 'https://extendsclass.com/api/json-storage/bin/dbcceeb';

    if ($(".home-fluid-thumbnail-grid-narrow").length || $(".home-listings").length) {

        var listingData = {};
        const request = new XMLHttpRequest();
        request.open("GET", JSONBLOB_URL, true);
        request.onreadystatechange = function () {
            if (request.responseText.length) {
                listingData = JSON.parse(request.responseText);
                customizeListing();
            }
        };
        request.send();

        function customizeListing() {
            if ($(".home-fluid-thumbnail-grid-narrow").length) {
                function customizeGrid() {
                    if (JSON.stringify(listingData) != "{}") {
                        $(".home-fluid-thumbnail-grid").css("visibility", "visible");
                        $(".home-fluid-thumbnail-grid-item").each(function (index) {
                            if (!$(this).hasClass("customized")) {

                                $(".home-fluid-thumbnail-grid-author-avatar").remove();
                                $(".home-fluid-thumbnail-grid-author-name").remove();

                                var title = $(this).find(".fluid-thumbnail-grid-image-title");
                                var authorContainer = $(this).find(".home-fluid-thumbnail-grid-author");
                                var authorLink = $(this).find(".home-fluid-thumbnail-grid-author-name");
                                var priceTag = $(this).find(".fluid-thumbnail-grid-image-price-container");
                                var listingUrl = $(this).find(".fluid-thumbnail-grid-image-item-link").attr("href");
                                var listingImageContainer = $(this).find(".fluid-thumbnail-grid-image-image-container");
                                var listingId = fetchListingId(listingUrl);
                                var listingInfo = listingData[listingId];

                                priceTag.children().wrapAll("<div class='price-text'></div>");
                                $(this).children().wrapAll("<a href='" + listingUrl + "'> </a>");


                                if (listingInfo) {
                                    locationDetails = listingInfo.location;

                                    if ($(this).find(".home-fluid-thumbnail-grid-details-distance").length) {
                                        locationDetails += "| <b>" + $(this).find(".home-fluid-thumbnail-grid-details-distance").text() + '</b>';
                                    }


                                    priceTag.append("<div class='city-label'> <div class='text-part'>" + locationDetails + "</div></div>");

                                    addImageSlider($(this), listingInfo.listingImages, listingId);

                                    listingImageContainer.append("<span class='listing-condition'>" + listingInfo.condition + "</span>");
                                }

                                authorContainer.prepend(title);
                                authorContainer.append(priceTag);

                                authorContainer.find(".info-container").prepend(authorLink);

                                $(this).addClass("customized");
                            }
                        });
                    }
                }

                function addImageSlider(elm, images, listingId) {
                    imageContainer = elm.find(".fluid-thumbnail-grid-image-image-container");
                    imageContainer.empty();
                    slideShowId = 'slideshow-' + listingId;
                    $(images).each(function () {
                        imageContainer.append('<img class="' + slideShowId + ' fluid-thumbnail-grid-image-image" src="' + this + '">')
                    });
                    $('.' + slideShowId).not(":first").addClass('hide');
                    $('.' + slideShowId).first().addClass('visible');

                    if ($(images).length > 1) {
                        imageContainer.append('<a class="prev">&#10094;</a>');
                        imageContainer.append('<a class="next">&#10095;</a>');
                    }
                    imageContainer.attr("data-slideShowId", slideShowId);
                }


                setInterval(customizeGrid, 1000);


                $("body").on('click', '.next', function (e) {
                    e.preventDefault();
                    showSlides($(this).parent(), 1);
                })

                $("body").on('click', '.prev', function (e) {
                    e.preventDefault();
                    showSlides($(this).parent(), -1);
                })

                function showSlides(container, threshold) {
                    var allImages = container.find("img");
                    var visibleImage = container.find("img.visible");
                    var visibleImageIndex = $('.' + container.attr("data-slideshowid")).index(visibleImage);

                    firstImageIndex = 0;
                    lastImageIndex = allImages.length - 1;
                    nextPosition = visibleImageIndex + threshold;

                    if (nextPosition < firstImageIndex) {
                        nextPosition = lastImageIndex; // selecting last image
                    }

                    if (nextPosition > lastImageIndex) {
                        nextPosition = firstImageIndex; // selecting last image
                    }
                    $(visibleImage).removeClass("visible").addClass("hide");
                    $(allImages[nextPosition]).removeClass("hide").addClass("visible");
                }
            }

            if ($(".home-listings").length) {
                function customizeListView() {
                    if (JSON.stringify(listingData) != "{}") {
                        $(".home-list-item").each(function (index) {
                            if (!$(this).hasClass("customized")) {
                                var url = $(this).children().find(".home-list-title a").attr("href");
                                var listingId = fetchListingId(url);
                                var listingInfo = listingData[listingId];
                                if (listingInfo) {
                                    locationDetails = listingInfo.location;
                                    if (parseInt(listingInfo.condition) > 0) {
                                        locationDetails += " | " + listingInfo.condition + " sf"
                                    }
                                    cityLabel = "<div class='city-label'> <div class='text-part'>" + locationDetails + "</div></div>";
                                    $(this).children().find(".home-list-price-mobile").append(cityLabel);
                                    $(this).children().find(".home-list-avatar").append(cityLabel)

                                }
                                $(this).addClass("customized");
                                $(this).children().wrapAll("<a href='" + url + "'> </a>");
                            }
                        });

                        // same process when location search, class has different names
                        $(".browsing-list-item").each(function (index) {
                            if (!$(this).hasClass("customized")) {
                                var url = $(this).children().find(".browsing-list-item-title a").attr("href");
                                var listingId = fetchListingId(url);
                                var listingInfo = listingData[listingId];
                                if (listingInfo) {
                                    locationDetails = listingInfo.location;
                                    if (parseInt(listingInfo.condition) > 0) {
                                        locationDetails += " | " + listingInfo.condition + " sf"
                                    }
                                    cityLabel = "<div class='city-label'> <div class='text-part'>" + locationDetails + "</div></div>";
                                    $(this).children().find(".browsing-list-item-price-mobile").append(cityLabel);
                                    $(this).children().find(".browsing-list-item-author").append(cityLabel);

                                }
                                $(this).addClass("customized");
                                $(this).children().wrapAll("<a href='" + url + "'> </a>");
                            }
                        });


                    }
                }

                setInterval(customizeListView, 1000);
            }

        }

        function fetchListingId(url) {
            var listingId = url.substring(
                url.lastIndexOf("/listings/") + 1,
                url.indexOf("-")
            ).replace("listings/", '').trim();

            return listingId;
        }
    }
});
