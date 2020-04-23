$(document).ready(function(){

    initializeFAQPopUp();

    function initializeFAQPopUp() {
        var popUpcontent = '<div id="faq-popup" class="faq-overlay"><div class="faq-popup"><div class="popup-header"><h2>Frequently Asked Questions</h2><a class="close faq-popup-close" href="#">&times;</a><div class="faq-searchbar-wrapper"><div class="faq-search-input-wrapper"><input type="search" class="faq-searchbar" placeholder="Search..."><button type="submit" class="SearchBar__searchButton__1Ck2b" style="background-color:transparent;" data-reactid="54"><svg width="17" height="17" viewBox="336 14 17 17" xmlns="http://www.w3.org/2000/svg"><g opacity=".7" fill="none" fill-rule="evenodd" transform="matrix(-1 0 0 1 352 15)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M11 11l3.494 3.494"></path><circle cx="6" cy="6" r="6"></circle></g></svg></button></div></div></div><div class="main-content"><div class="box" id = "qns-box"><ul class="question-list">';
        var qnsListForShopper = $.map(questionAnswerForShopper, function (value, index) {
            return ('<div class="qns-list"><li id="link-for-shopper-question-' + index + '"><a href=#question-shopper-' + index + ' class="question-link">' + value.qns + '</a></li></div>');
        });
        var qnsListForSeller = $.map(questionAnswerForSeller, function (value, index) {
            return ('<div class="qns-list"> <li id="link-for-seller-question-' + index + '"><a href=#question-seller-' + index + ' class="question-link">' + value.qns + '</a></li></div>');
        });
        var qnsListString = '<li id="qnsHeadForShopper"><a href="#qnsAnsHeadForShopper">I am a Swappzy Shopper</a></li>';
        $.each(qnsListForShopper, function () {
            qnsListString += this;
        });
        qnsListString += '<br/><li id="qnsHeadForSeller"><a href="#qnsAnsHeadForSeller">I am a Swappzy Seller</a></li>';
        $.each(qnsListForSeller, function () {
            qnsListString += this;
        });
        var popUpcontent1 = '</ul></div><div class="content1 padding-25">';
        var qnsAnsListForSeller = $.map(questionAnswerForSeller, function (value, index) {
            return ('<div class="box" id="question-seller-' + index + '">' + '\n<div class="question">' + value.qns + '</div>\n<div class="answer">' + value.ans + '</div>\n<div class="top-link"><span class="fa fa-arrow-up navigate-top">TOP</span>\n</div></div>');
        });
        var qnsAnsListForShopper = $.map(questionAnswerForShopper, function (value, index) {
            return ('<div class="box" id="question-shopper-' + index + '">' + '\n<div class="question" id="">' + value.qns + '</div>\n<div class="answer">' + value.ans + '</div>\n<div class="top-link"><span class="fa fa-arrow-up navigate-top">TOP</span>\n</div></div>');
        });
        var qnsAnsListString = '<div class="box faq-category-title" id="qnsAnsHeadForShopper"><span>I am a Swappzy Shopper</span></div>';
        $.each(qnsAnsListForShopper, function () {
            qnsAnsListString += this || '';
        });
        qnsAnsListString += '<div class="box faq-category-title" id="qnsAnsHeadForSeller"><span>I am a Swappzy Seller</span></div>';
        $.each(qnsAnsListForSeller, function () {
            qnsAnsListString += this || '';
        });
        var popUpcontent2 = '</div></div></div><a class= "faq-popup-trigger hide" href=#faq-popup>FAQs</a></div><div class="col-sm-12 col-xs-6"></div>';
        $('body').append(popUpcontent + qnsListString + popUpcontent1 + qnsAnsListString + popUpcontent2);
        $(".faq-popup-close").click(function () {
            $("body").removeClass("faq-open");
        });
        $("#faq-popup ul li a").click(function (e) {
            e.preventDefault();
            elemId = $(this).attr("href");
            $(elemId).scrollTop(0);
            $('#faq-popup .main-content').animate({scrollTop: $(elemId).offset().top - $("#qns-box").offset().top}, 500);
        });
        $(".navigate-top").click(function (e) {
            e.preventDefault();
            $('#faq-popup .main-content').animate({scrollTop: 0}, 500);
        });

        $(".faq-popup-trigger").click(function(){
            $("body").addClass("faq-open");
        });

        $(".faq-searchbar").on('input propertychange paste', function () {
            var searchKey = $(this).val();
            var matchedFaqForSeller = 0;
            var matchedFaqForShopper = 0;
            $.each(questionAnswerForSeller, function (index, value) {
                if (value.qns.toLowerCase().includes(searchKey.toLowerCase()) || value.ans.toLowerCase().includes(searchKey.toLowerCase())) {
                    $("#question-seller-" + index).show();
                    $("#link-for-seller-question-" + index).show();
                    matchedFaqForSeller++;
                }
                else {
                    $("#question-seller-" + index).hide();
                    $("#link-for-seller-question-" + index).hide()
                }
            });
            $.each(questionAnswerForShopper, function (index, value) {
                if (value.qns.toLowerCase().includes(searchKey.toLowerCase()) || value.ans.toLowerCase().includes(searchKey.toLowerCase())) {
                    $("#question-shopper-" + index).show();
                    $("#link-for-shopper-question-" + index).show();
                    matchedFaqForShopper++;
                }
                else {
                    $("#question-shopper-" + index).hide();
                    $("#link-for-shopper-question-" + index).hide();
                }
            });
            if (matchedFaqForSeller == 0) {
                $("#faqTitleSeller").hide();
                $("#qnsAnsHeadForSeller").hide();
                $("#qnsHeadForSeller").hide();
            }
            else {
                $("#faqTitleSeller").show();
                $("#qnsAnsHeadForSeller").show();
                $("#qnsHeadForSeller").show();
            }
            if (matchedFaqForShopper == 0) {
                $("#faqTitleShopper").hide();
                $("#qnsAnsHeadForShopper").hide();
                $("#qnsHeadForShopper").hide();
            }
            else {
                $("#faqTitleShopper").show();
                $("#qnsAnsHeadForShopper").show();
                $("#qnsHeadForShopper").show();
            }
            $('#faq-popup .main-content').animate({scrollTop: 0}, 500);
        });

        setInterval(function () {
            $('a[href="https://swappzy.sharetribe.com/#faq-popup"]').attr("href", "#faq-popup");
        }, 500);

        var url = window.location.href;
        if (url.search('#faq-popup') > 0) {
            setTimeout(function () {
                $(".faq-popup-trigger")[0].click();
            }, 400);
        }

    }
});
