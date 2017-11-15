(function (window, document, $) {
    var WIN = {
        imgWidht: Math.ceil($(window).width() / 2 - 10),
    };
    var _this = null;
    var paragraphsFlipbook = (function () {
        function controller(element, options) {
            _this = this;
            this.$element = $(element);
            this.element = {
                prTop: $(this.$element.find(".pr-item-top")),
                prBottom: $(this.$element.find(".pr-item-bottom")),
                topImgCenter: $(this.$element.find(".pr-item-top>.pf-img-center")),
                bottomImgCenter: $(this.$element.find(".pr-item-bottom>.pf-img-center")),
                topImg: $(this.$element.find(".pr-item-top>.pf-img-center>.pf-img")),
                bottomImg: $(this.$element.find(".pr-item-bottom>.pf-img-center>.pf-img"))
            }
            this.animation = {
                width: 0, //移动距离
                topIndex: 1, //上图片 当前索引
                bottomIndex: 2 //下图片 当前索引
            };
            this.defaults = {};
            this.options = $.extend({}, this.defaults, options);
            console.log("object", this);
            this.init();

        }
        controller.prototype.init = function () {
            var _this = this;
            var time = null;
            // 窗口改变重新计算位置
            $(window).resize(function () {
                if (time) {
                    clearTimeout(time);
                }
                time = setTimeout(function () {
                    WIN.imgWidht = $(window).width() / 2 - 10;
                    _this.setWidht();
                }, 300);

            });
            // 设置宽度位置
            this.setWidht();
            // 绑定事件
            this.clickTranslate3d();
        }
        controller.prototype.setWidht = function () {
            var _this = this;
            this.element.topImgCenter.width(Math.ceil(WIN.imgWidht * this.element.topImg.length));
            this.element.bottomImgCenter.width(Math.ceil(WIN.imgWidht * this.element.bottomImg.length));
            this.element.topImg.width(WIN.imgWidht);
            this.element.bottomImg.width(WIN.imgWidht);
            this.animation.width = Math.ceil(WIN.imgWidht / 2);
            this.Translate3d("top");
            this.Translate3d("bottom");
            _this.onTimeImg();
        }
        controller.prototype.clickTranslate3d = function (event, ele) {
            // console.log(this, event, ele);
            var _this = this,
                prTop = _this.element.prTop.find(".pf-img-center"),
                prBottom = _this.element.prBottom.find(".pf-img-center"),
                timeImg = false;
            // 上部图片事件
            this.element.topImg.each(function (i, e) {
                $(e).on("click", function () {
                    //已经在当前点击不进行平移 只改变状态
                    if ($(e).hasClass("active")) {
                        updateCss(e)
                        return
                    }
                    // 获取下部分当前的展示的图片
                    _this.element.bottomImg.eq(_this.animation.bottomIndex).removeClass("pf-img-state-3").addClass("pf-img-state-2")
                    _this.animation.topIndex = i;
                    _this.Translate3d("top");
                    _this.onTimeImg();
                    timeImg = true;
                    setTimeout(() => {
                        timeImg = false;
                    }, 900);
                });
                $(e).on("mouseenter", function () {
                    if (_this.animation.topIndex != i || timeImg) {
                        return;
                    }
                    _this.updateState3(30);
                });
                $(e).on("mouseleave", function () {
                    if (_this.animation.topIndex != i || timeImg) {
                        return;
                    }
                    _this.updateState3(0);
                })
            });
            //下部图片事件
            this.element.bottomImg.each(function (i, e) {
                $(e).on("click", function () {
                    //已经在当前点击不进行平移 只改变状态
                    if ($(e).hasClass("active")) {
                        updateCss(e)
                        return
                    }
                    // 获取上部分当前的索引
                    _this.element.topImg.eq(_this.animation.topIndex).removeClass("pf-img-state-3").addClass("pf-img-state-2")
                    _this.animation.bottomIndex = i;
                    _this.Translate3d("bottom");
                    _this.onTimeImg();
                    timeImg = true;
                    setTimeout(() => {
                        timeImg = false;
                    }, 900);
                });
                $(e).on("mouseenter", function () {
                    if (_this.animation.bottomIndex != i || timeImg) {
                        return;
                    }
                    _this.updateState3(30);
                });
                $(e).on("mouseleave", function () {
                    if (_this.animation.bottomIndex != i || timeImg) {
                        return;
                    }
                    _this.updateState3(0);
                })
            });
            // 更改当前状态
            function updateCss(e) {
                if ($(e).hasClass("pf-img-state-2")) {
                    _this.updateClassState(3);
                    return
                }
                if ($(e).hasClass("pf-img-state-3")) {
                    _this.updateClassState(2);
                    return
                }
            }

        }
        // 更改位置
        controller.prototype.Translate3d = function (type) {
            var width = this.animation.width;
            var index = type == "top" ? this.animation.topIndex : this.animation.bottomIndex;
            if (index != 0) {
                width = -Math.ceil(this.animation.width + WIN.imgWidht * (index - 1));
            }
            if (type == "top") {
                this.element.topImgCenter.css({
                    "transform": "translate3d(" + width + "px, 0px, 0px)"
                });
                this.element.topImg.removeClass("active pf-img-state-2 pf-img-state-3").eq(index).addClass("active pf-img-state-2");
            } else {
                this.element.bottomImgCenter.css({
                    "transform": "translate3d(" + width + "px, 0px, 0px)"
                });
                this.element.bottomImg.removeClass("active pf-img-state-2 pf-img-state-3").eq(index).addClass("active pf-img-state-2");
            }
            // 清除所有的 倾斜 合拢
            this.element.topImg.find(".img-state-2").css({
                "transform": "rotateX(0deg)"
            });
            this.element.bottomImg.find(".img-state-2").css({
                "transform": "rotateX(0deg)"
            });
            this.element.topImg.find(".img-hover-state3").removeAttr("style");
            this.element.bottomImg.find(".img-hover-state3").removeAttr("style");
        }
        // 定时器  一定时候后 自动转换为状态3 侧图 并且合拢
        var timeImg = null;
        controller.prototype.onTimeImg = function (callback) {
            if (timeImg) {
                clearTimeout(timeImg)
            }
            timeImg = setTimeout(() => {
                _this.updateClassState(3);
                setTimeout(() => {
                    _this.updateState3();
                }, 500);
                callback && callback();
            }, 1500);
        };
        // 改变 状态3 测图 的样式 合拢
        controller.prototype.updateState3 = function (num) {
            var topimg = this.element.topImg.eq(this.animation.topIndex),
                botimg = this.element.bottomImg.eq(this.animation.bottomIndex);
            // 倾斜图 偏移
            topimg.find(".img-state-2").css({
                "padding": num ? "10px 0 0 0" : "0"
            });
            botimg.find(".img-state-2").css({
                "padding": num ? "20px 0 0 0" : "30px 0 0 0"
            });
            // 侧图
            topimg.find(".img-hover-top").css({
                "bottom": num || "-7" + "px"
            });
            botimg.find(".img-hover-bottom").css({
                "top": num || 0 + "px"
            });
        };
        // 改变css状态
        controller.prototype.updateClassState = function (state) {
            var topimg = this.element.topImg.eq(this.animation.topIndex),
                botimg = this.element.bottomImg.eq(this.animation.bottomIndex),
                class2 = "pf-img-state-2",
                class3 = "pf-img-state-3";
            console.log("------", state);
            if (state == 2) {
                topimg.find(".img-state-2").css({
                    "transform": "rotateX(0deg)"
                });
                botimg.find(".img-state-2").css({
                    "transform": "rotateX(0deg)"
                });
                topimg.removeClass(class3).addClass(class2);
                botimg.removeClass(class3).addClass(class2);
            } else {
                topimg.find(".img-state-2").css({
                    "transform": "rotateX(75deg)"
                });
                botimg.find(".img-state-2").css({
                    "transform": "rotateX(75deg)"
                });
                topimg.removeClass(class2).addClass(class3);
                botimg.removeClass(class2).addClass(class3);
            }

        }
        return controller;
    })();
    $.fn.paragraphsFlipbook = function (options) {
        return new paragraphsFlipbook(this, options);
    }
    $("#paragraphs-flipbook").paragraphsFlipbook();
})(window, document, jQuery);