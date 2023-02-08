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

    container.addClass("active");
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


 if (elemContainer.hasClass("active")) {
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
    const content = modal.find(".modal__content-wrap");

    modal.removeClass("error-modal");

    const isValid = validateFields(form,[name, phone, comment, to]);
    const xhr = new XMLHttpRequest();
    xhr.open ('POST', 'https://webdev-api.loftschool.com/sendmail');
            xhr.setRequestHeader('content-type', 'application/json');


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

        request.done((data) => {
            content.text(data.message);
            // console.log(data);
        })

        request.fail(data => {

            const message = (data.message);
            content.text(message);
            modal.addClass("error-modal");
            console.log(message);
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
