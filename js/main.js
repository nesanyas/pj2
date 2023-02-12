const open = document.querySelector("#burger");
const openElement = document.querySelector("#active");
const body = document.querySelector("#scrol")

open.addEventListener("click", e => {
openElement.style.display = "block";
body.style.overflow = "hidden";
})

const closeElement = document.querySelector("#close");

closeElement.addEventListener("click", e => {
    e.preventDefault();
    openElement.style.display = "none";
    body.style.overflow = "";
})

///slider

const findBlockByAlias = alias => {
    return $(".reviews__item").filter((ndx, item) => {
        return $(item).attr("data-linked-with") === alias;
    });
};
$(".interactive-avatar__link").click((e) => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-open");
    const itemToShow = findBlockByAlias(target);
    const curItem = $this.closest(".interactive-avatar");

    itemToShow.addClass("active").siblings().removeClass("active");
    curItem.addClass("active").siblings().removeClass("active");


});

const slider = $('.slider__list').bxSlider({
    pager: false,
    controls: false
});

$('.slider__arrow--prev').click(e => {
    slider.goToPrevSlide();
})
$('.slider__arrow--next').click(e => {
    slider.goToNextSlide();
})

///team

const openItem = item => {
    const container = item.closest(".team__item");
    const contentBlock = container.find(".team__content");
    const textBlock = contentBlock.find(".team__content-block");
    const reqHeight = textBlock.height();
    const icon = container.find(".team__icon");

    container.addClass("active");
    icon.addClass("team__icon--clicked");
    contentBlock.height(reqHeight);
}

const closeEveryItem = container => {
    const items = container.find(".team__content");
    const itemContainer = container.find(".team__item");

    itemContainer.removeClass("active");
    items.height(0);

}

$(".team__title").click(e => {
    const $this = $(e.currentTarget);
    const container = $this.closest(".team");
    const elemContainer = $this.closest(".team__item");
    const icon = container.find(".team__icon");

 if (elemContainer.hasClass("active")) {
    icon.removeClass("team__icon--clicked");
    closeEveryItem(container); 

 } else {
    closeEveryItem(container);    
    openItem($this);
 }
})

///form

const validateFields = (form, fieldsArray) => {
    fieldsArray.forEach(field => {
        field.removeClass("input-error");
        if(field.val().trim() === "") {
            field.addClass("input-error")
        }
    })

    const errorFields = form.find(".input-error");

    return errorFields.length === 0;
}

$(".form").submit(e => {
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find("[name = 'name']");
    const phone = form.find("[name = 'phone']");
    const comment = form.find("[name = 'comment']");
    const to = form.find("[name = 'to']");

    const modal = $("#modal");
    const content = modal.find(".modal__title");

    content.removeClass("modal__error");

    const isValid = validateFields(form,[name, phone, comment, to]);
   


    if(isValid) {
        const request = $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "POST",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val()
            }
        });

        // const xhr = new XMLHttpRequest();
        // xhr.open ('POST', 'https://webdev-api.loftschool.com/sendmail');
      
        //         xhr.setRequestHeader('content-type', 'application/json');


        request.done((data) => {
            content.text(data.message);
            // console.log(data);
        })

        request.fail((data) => {
         
            const message = content.innerHtml = "Отправить письмо не удалось, повоторите запрос позже";
            content.text(message);
            content.addClass("modal__error");
            // console.log(message);
        })

        request.always(() => {
            $.fancybox.open({
                src: "#modal",
                type: "inline"
            });
        })
    }
});

$(".app-submit-btn").click(e => {
    e.preventDefault();
    $.fancybox.close();
})



///acco

const mesureWidth = item => {
    let reqItemWidth = 0;
    const screenWidth = $(window).width();
    const container = item.closest(".product-menu");
    const titlesBlocks = container.find(".product-menu__title");
    const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

    const textContainer = item.find(".product-menu__container");
    const paddingLeft = parseInt(textContainer.css("padding-left"));
    const paddingRight = parseInt(textContainer.css("padding-right"));

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
        reqItemWidth = screenWidth - titlesWidth;
    } else {
        reqItemWidth = 500;
    }

    return {
        container: reqItemWidth,
        textContainer: reqItemWidth - paddingLeft - paddingRight
    }

   
}

const closeEveryItemInContainer = containr => {
    const items = containr.find(".product-menu__item");
    const content = containr.find(".product-menu__content");

    items.removeClass("active");
    content.width(0);
}

const opnItem = item => {
    const hiddenContent = item.find(".product-menu__content");
    const reqWidth = mesureWidth(item);
    const textBlock = item.find(".product-menu__container")

    item.addClass("active");
    hiddenContent.width(reqWidth.container);
    textBlock.width(reqWidth.textContainer);

}

$(".product-menu__title").on("click", e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest(".product-menu__item");
    const itemOpened = item.hasClass("active");
    const containr = $this.closest(".product-menu");


    if (itemOpened) {
        closeEveryItemInContainer(containr);
    } else {
        closeEveryItemInContainer(containr);
        opnItem(item);
    }

})


let myMap;

const init = () => {
    myMap = new ymaps.Map("map", {
        center: [59.931026, 30.352714],
        zoom: 12,
        controls: []
    })

    const coords = [
        [59.95833945, 30.28121195],
        [59.96789045, 30.37138323],
        [59.93455045, 30.32336836],
        [59.90116645, 30.29139246]
    ];

    const myCollection = new ymaps.GeoObjectCollection({},{
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: "img/svg/marker.svg",
        iconImageSize: [30, 42],
        iconImageOffset: [-3, -42]
    })

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    })

    myMap.geoObjects.add(myCollection);
    myMap.behaviors.disable("scrollZoom");
}

ymaps.ready(init);


////player


////scrool
// const sections = $("section");
// const display = $(".maincontent");

// let inScrol = false;

// sections.first().addClass("active");

// const performTrasition = sectionEq => {

//     if (inScrol === false) {
//         inScrol = true;
//         const position = sectionEq * -100;

//         display.css({
//             transform: `translateY(${position}%)`
//         });
    
//         sections.eq(sectionEq).addClass("active").siblings().removeClass("active");

//         setTimeout(() => {
//             inScrol = false;
//         }, 1300);
//     }
   
// }

// const scrollViewport = direction => {
//     const activeSection = sections.filter(".active");
//     const nextSection = activeSection.next();
//     const prevSection = activeSection.prev();

//     if (direction === "next" && nextSection.length) {
//         performTrasition(nextSection.index())
//     }

//     if (direction === "prev" && prevSection.length) {
//         performTrasition(prevSection.index())
//     }
// }

// $(window).on("wheel", e => {
//     const deltaY = e.originalEvent.deltaY;

//     if (deltaY > 0) {
//         scrollViewport("next");
//     }

//     if (deltaY < 0) {
//         scrollViewport("prev");
//     }
// })

// $(window).on("keydown", e => {
//     const tagName = e.target.tagName.toLowerCase();

//     if (tagName != "input" && tagName != "textarea") {
//         switch (e.keyCode) {
//             case 38:
//             scrollViewport("prev");
//             break;
    
//             case 40:
//             scrollViewport("next");
//                 break;
//         }
//     }
// })

// $("[data-scroll-to]").click(e =>{
//     e.preventDefault();

//     const $this = $(e.currentTarget);
//     const target = $this.attr("data-scroll-to");
//     const reqSection = $(`[data-section-id=${target}]`);

//     performTrasition(reqSection.index());
// })