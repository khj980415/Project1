$(function(){
    let famillyCheck;
    let agreeCheck;
    let searchCheck;
    let totalLi=$("header #desktop > ul > li").length;
    let tabCheck=false;
    let winw=0;

	let bgVideo=document.getElementById("bgVideo");

	bgVideo.addEventListener("loadeddata", function(){
		bgVideo.play();
	});

	$("#sec3 .slider .category li:first-child").addClass("active");

	let videoList=[];
	let videoName=["video1", "video2", "video3"];

	for(let i=0; i<videoName.length; i++){
		videoList.push(document.getElementById(videoName[i]));

		videoList[i].addEventListener("loadeddata", function(e){
			e.target.pause();
		});

		videoList[i].addEventListener("ended", function(e){
			e.target.currentTime=0;
			e.target.play();
		});
	}

	let videoN=0;

	function videoInteraction(n){
		console.log("videoInteraction", n);

		for(let i=0; i<videoList.length; i++){
			if(i === n){
				videoList[i].play();
			}
			else{
				videoList[i].pause();
			}
		}
	}

	const mainSwiper = new Swiper(".mainSwiper", {
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,
		on: {
			init: function(){
				setTimeout(() => videoInteraction(videoN), 1000);
			},
			slideChangeTransitionEnd: function(){
				videoN=this.realIndex;

				if(videoN !== 3){
					videoInteraction(videoN);
				}
			}
		}
});

let subSwiper = new Swiper(".subSwiper", {
            slidesPerView: 1.3,
            spaceBetween: 20,
    breakpoints: {
        1130: {
        slidesPerView: 3,
        spaceBetween: 70,
        grid: {
            rows: 1,
            },
        },
        750: {
            slidesPerView: 2,
            spaceBetween: 70,
            grid: {
                rows: 2,
                fill: "row",
                },
        },
    },
});

        $("header #desktop > ul > li").hover(
            function(){
                $(this).addClass("active");
                $(".nav_bg").show();
                $("#desktop").addClass("active");
            },

            function(){
                $("header #desktop > ul > li").removeClass("active");
                $(".nav_bg").hide();
                $("#desktop").removeClass("active");
            }
        );

        $("header #desktop > ul > li").focusin(function(){
                $(this).addClass("active");
                $(".nav_bg").show();
                $("#desktop").addClass("active");
            });

        $("header #desktop > ul > li li:last-child").focusout(function(){
            $(this).parent().parent().removeClass("active");
            if($(this).parent().parent().index() === totalLi-1){
            $(".nav_bg").hide();
            $("#desktop").removeClass("active");
            }
        });

        $("header .tab").click(function(){
            $("header .search_area").removeClass("active");
            $("header .utils .search").removeClass("active");

            if(!tabCheck){
                $(this).addClass("active");
                $("header #mobile").show();
                $("body").addClass("fixed");
            }
            else{
                $(this).removeClass("active");
                $("header #mobile").hide();
                $("body").removeClass("fixed");
            }

			tabCheck=$("header .tab").hasClass("active");
        });

        $(window).resize(function(){
            winw=$(window).width();
            if(winw > 1340 && tabCheck){
                $("header .tab").removeClass("active");
                $("header #mobile").hide();
                $("body").removeClass("fixed");
            }
        });

        $("header > #mobile > ul > li").click(function(e){
            e.preventDefault();
            if(!$(this).hasClass("active")){
            $("header > #mobile > ul > li").removeClass("active");
            $(this).addClass("active");
            $("header #mobile li ul").slideUp(300);
            $(this).find("ul").slideDown(300);
            }
            else{
            $(this).removeClass("active");
            $(this).find("ul").slideUp(300);
            }
        });

        $("header .utils .search").click(function(e){
            e.preventDefault();
            searchCheck=$("header .search_area").hasClass("active");
            $("header .tab").removeClass("active");
            $("header #mobile").hide();
            if(searchCheck){
                $("header .search_area").removeClass("active");
                $(this).removeClass("active");
            }
            else{
                $("header .search_area").addClass("active");
                $(this).addClass("active");
                
            }
        });

        $("footer .familly").click(function(e){
        e.preventDefault();
        $("footer .familly ul").toggle();
        famillyCheck=$(this).hasClass("active");
        if(famillyCheck){
            $(this).removeClass("active");
        }
        else{
            $(this).addClass("active");
        }
    });
    $("footer .agree_area").click(function(e){
        e.preventDefault();
            agreeCheck=$("footer .check").hasClass("on");
            if(agreeCheck){
                $("footer .check").removeClass("on");
                $("input[name='hidden_agree']").prop({checked: false});
            }
            else{
                $("footer .check").addClass("on");
                $("input[name='hidden_agree']").prop({checked: true});
            }
    });
    $("#main .navigation a").hover(
        function(){
            $(this).css({opacity: 1});
        },
        function(){
            $(this).css({opacity: 0});
        },
    );
    
    $("#main .navigation .prev").click(function(e){
        e.preventDefault();
        mainSwiper.slidePrev();
    });
    $("#main .navigation .next").click(function(e){
        e.preventDefault();
        mainSwiper.slideNext();
    });

    $("#sec3 .navigation .prev").click(function(e){
        e.preventDefault();
        subSwiper.slidePrev();
    });
    $("#sec3 .navigation .next").click(function(e){
        e.preventDefault();
        subSwiper.slideNext();
    });

    $("#sec3 .slider .category a").click(function(e){
        e.preventDefault();
        $("#sec3 .slider .category li").removeClass("active");
        $(this).parent().addClass("active");
    });
});