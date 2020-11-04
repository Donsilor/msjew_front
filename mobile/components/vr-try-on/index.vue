`<template>
    <div class="AR-content">
        <div id="handdiv">
            <div class="tryon0">
                <span @click="quit" class="tryonback mo-sprite-icon tryon1"><img src="../../static/marriage-ring/left-1.png" alt=""></span>
            </div>
            <div class="tryon2">
                {{lang.openHand}}<br /><font>({{lang.photoTip}})</font>
            </div>
            <div class="tryon3">
                <label>
                    <span>{{lang.openCamera}}</span>
                    <input id="fileToUpload" type="file" accept="image/*" />
                </label>
            </div>

            
            
        </div>

        <div id="mhanddiv">
            <div id="tryontips">
                <!-- <img src="../../static/marriage-ring/tryontips.png" /> -->
                <span class="tip">
                    <img src="../../static/marriage-ring/sx2.png" />
                    <span>{{lang.operating}}</span>
                </span>
            </div>
            <div class="tryon4">
                <!-- <span class="ch tryonback"><i class="chi"></i>{{lang.quit}}</span> -->
                <!-- <span class="ch"><i class="mo-sprite-icon2 chi"></i>{{lang.changeStyle}}</span>-->
                <span class="tryonback" @click="quit">{{lang.quit}}</span> 
                <!-- <div class="tryon5">
                    <span><i class=" p"></i></span> -->
                    <!-- <span><i class="mo-sprite-icon2 p"></i></span> ../../static/marriage-ring/ring.png :src='goodImage' -->
                <!-- </div> -->
            </div>
            <div id="imgbgdivid">
                <img id="yourhand" crossorigin="anonymous"/>
                <div id="imgboxid"><img id="imgid" src="https://cdn.bddco.com/images/2020/08/26/image_159841339753515498.png" crossorigin="anonymous" /></div> 
                <div class="ov"></div>
            </div>
            <div class="tryon6">
                <div id="reSelImg">
                    <span class="mo-sprite-icon2 again ">
                        <img src="../../static/marriage-ring/cp.png" alt="">
                        <p>{{lang.again}}</p>
                    </span>
                    <input id="fileToUpload2" type="file" accept="image/*" />
                </div> 
                <div class="tryon7">
                    <span id="mergeImg"  class="mo-sprite-icon2 m save" >
                        <img src="../../static/marriage-ring/bc.png" alt="">
                        <p>{{lang.save}}</p>
                    </span>
                </div>
                <div class="dropOut" @click="quit">
                    <span id="back"  class="mo-sprite-icon2 m save" >
                        <img src="../../static/marriage-ring/quit.png" alt="">
                        <p>{{lang.quit}}</p>
                    </span>
                </div>
            </div>
                    
            <!-- <div id="tryonScore">
                <div class="b">
                    <span class="mo-sprite-icon cl"></span>
                    <font>为唯钻会AR试戴功能打分</font>
                    <div class="x"><span class="mo-sprite-icon2"></span><span class="mo-sprite-icon2"></span><span class="mo-sprite-icon2"></span><span class="mo-sprite-icon2"></span><span class="mo-sprite-icon2"></span></div>
                    <div class="d">
                    <textarea name="comment" placeholder="期待您提出宝贵的意见"></textarea>
                    </div>
                    <div class="button_block"><a href="javascript:;" class="submit_btn">提交</a></div>
                </div>
                <div class="c">
                    <div class="msg"></div>
                    <div class="btn" score=""><span>取 消</span><span class="c">确 认</span><span class="d">处理中...</span></div>
                </div>
            </div> -->
        </div>

        <div id="whanddiv">
            <div>
                <span id="closetryon" class="mo-sprite-icon2 el-icon-close"></span>
                <!-- <span class="t"> -->
                    <!-- <i ></i> -->
                    <!-- <b>{{goodName}}</b>
                </span> -->
                <!-- <img src="../../static/marriage-ring/tryonsave.png" /> -->
                <!-- <div class="enter-long"> -->
                    <span class="s">
                        <img src="../../static/marriage-ring/ca.png" />
                        <span class="enter-tip">{{lang.enterLong}}</span>
                    </span>
                <!-- </div> -->
            </div>
        </div>

        <div class="load">
            <div class="loadBox">
                <div class="box">
                    <img src="../../static/marriage-ring/timg.gif" alt="">
                    <p id="showload"  class="load-text ">{{lang.load}}</p>
                    <p id="retry" class="load-text ">{{lang.Retry}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import $ from 'jquery'
export default {
    data(){
        return{
            lang: this.LANGUAGE.vr,
            image:'https://cdn.bddco.com/images/2020/08/26/image_159841339753515498.png' 
            // goodImage:''
        }
    },
    props:["goodName","showImg"],
    computed:{
        goodImage(){
            console.log(this.showImg)
            // const len = this.showImg.length-1 this.showImg[this.showImg.length-1]
            return this.showImg+"?"+new Date().getTime()
        }
    },
    mounted(){
        // }, false);
        // console.log("baseUrl",this.goodImag)
        //bdd.bddco.cn  www.bddco.com  cdn.bddco.com
        // this.$nextTick(() => {
            $(function(){
                // if ($('#imgid').prop('src').indexOf('//bdd.bddco.cn') > -1) {
                //     console.log(111111111)
                //     var imgidurl = $('#imgid').prop('src').replace('//bdd.bddco.cn', '//' + 'bdd.bddco.cn').replace('https://', '//');
                // } else {
                //      console.log(2222222222)
                //     var imgidurl = $('#imgid').prop('src').replace('//cdn.bddco.com', '//' + 'cdn.bddco.com').replace('https://', '//');
                // }
                // console.log(3333)
                // $('#imgid').prop('src');
    
    
    
                var istryonIng = false;
                document.body.addEventListener('touchmove', function(e){
                    if (istryonIng) {
                        e.preventDefault();
                    }
                }, {passive: false});
    
                var trywearControl = {
                    imgid: '',
                    imgboxid: '',
                    el: null,
                    elo: null,
                    eldiv: null,
                    START_X: 0,
                    START_Y: 0,
                    minScale: 0.5, // 最大缩放
                    maxScale: 3.0, // 最小缩放
                    ticking: false,
                    transform: null,   //图像效果
                    timer: null,
                    initAngle:  0,  //旋转角度
                    initScale: 1,  //放大倍数
                    mc: null,  
                    preAngle: 0,
                    tempAngleFlag: 0,
                    deltaAngle: 0,	
                    startRotateAngle: 0,
                    isIntiMove: 0,
                    reqAnimationFrame: (function () {
                        var t = this;
                        return window[Hammer.prefixed(window, 't.requestAnimationFrame')] || function (callback) {
                            window.setTimeout(callback, 1000 / 60);
                        };
                    })(),
                    init: function(imgid, imgboxid, imgbgdivid) {
                        var t = this;
                        this.imgid = imgid; this.imgboxid = imgboxid;
                        this.el = document.querySelector(imgid);
                        this.elo = document.querySelector(imgboxid);
                        this.eldiv = document.querySelector(imgbgdivid);
                        this.START_X = Math.round((window.innerWidth - $(imgboxid).width()) / 2);
                        this.START_Y = 100;
                        if (this.mc != null) {
                            this.resetElement(); return;
                        }
                        this.mc = new Hammer.Manager(this.eldiv);
                        this.mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));  
                        this.mc.add(new Hammer.Rotate({ threshold: 0 })).recognizeWith(t.mc.get('pan'));
                        this.mc.add(new Hammer.Pinch({ threshold: 0 })).recognizeWith([t.mc.get('pan'), t.mc.get('rotate')]);
                        //结束时做一些处理
                        this.mc.on("hammer.input", function(ev) {
                            if(ev.isFinal) {
                                t.START_X = t.transform.translate.x ;
                                t.START_Y = t.transform.translate.y ;
                            }
                        });
                        this.mc.on("panstart panmove", t.onPan);
                        this.mc.on("rotatestart rotatemove rotateend", t.onRotate);
                        this.mc.on("pinchstart pinchmove", t.onPinch);
                        this.resetElement();
                    },
                    onPan: function(ev) {
                        var t = trywearControl;
                        if(!ev.isFinal) {
                            t.elo.className = '';
                            t.transform.translate = {
                                x: t.START_X + ev.deltaX,
                                y: t.START_Y + ev.deltaY
                            };
                            t.requestElementUpdate();
                        }
                    },
                    onPinch: function(ev) {
                        var t = trywearControl;
                        if (ev.type == 'pinchstart') {
                            t.initScale = t.transform.scale || 1;
                        }
                        t.elo.className = '';
                        t.transform.scale = t.initScale * ev.scale;
                        t.requestElementUpdate();	
                    },
                    onRotate: function(ev) {
                        //点下第二个触控点时触发
                        var t = trywearControl;
                        if (ev.type == 'rotatestart') {
                            t.startRotateAngle =  ev.rotation;
                            t.tempAngleFlag = 0 ;
                        }	
                        if (ev.type == 'rotatemove') {
                            if(t.tempAngleFlag == 0){
                                t.preAngle = t.startRotateAngle;
                                t.tempAngleFlag++;
                            }else{				
                                t.deltaAngle = ev.rotation - t.preAngle;
                                t.elo.className = '';
                                t.transform.rz = 1;
                                t.transform.angle = t.initAngle + t.deltaAngle;									
                                t.requestElementUpdate();	
                            }
                        }
                        //旋转结束  记录当前图片角度	
                        if(ev.type == 'rotateend') {
                            t.initAngle = t.transform.angle;
                        }
                    },
                    updateElementTransform: function() {
                        var t = trywearControl;
                        
                        if (t.transform.scale < t.minScale) t.transform.scale = t.minScale;
                        if (t.transform.scale > t.maxScale) t.transform.scale = t.maxScale;
                        
                        if (t.transform.scale > 1) {
                            var tmp = ((t.transform.scale - 1) * t.el.width) / 2;
                            if (t.transform.translate.y < -tmp) t.transform.translate.y = -tmp;
                            if (t.transform.translate.x < -tmp) t.transform.translate.x = -tmp;
                            tmp = window.innerWidth - tmp;
                            if (tmp < t.transform.translate.x) {
                                t.transform.translate.x = tmp;
                            } 
                        } else {
                            var tmp = ((t.transform.scale - 1) * t.el.width) / 2;
                            if (t.transform.translate.y < tmp) t.transform.translate.y = tmp;
                            if (t.transform.translate.x < tmp) t.transform.translate.x = tmp;
                            tmp = window.innerWidth - (t.el.width * t.transform.scale);
                            if (tmp < t.transform.translate.x) {
                                t.transform.translate.x = tmp;
                            } 
                        }
                        
                        var value = [
                                'translate3d(' + t.transform.translate.x + 'px, ' + t.transform.translate.y + 'px, 0)',
                                'scale(' + t.transform.scale + ', ' + t.transform.scale + ')',
                                'rotate3d('+ t.transform.rx +','+ t.transform.ry +','+ t.transform.rz +','+ t.transform.angle + 'deg)'
                        ];
                        
                        t.elo.style.webkitTransform = value[0] + ' ' + value[1];
                        t.elo.style.mozTransform = value[0] + ' ' + value[1];
                        t.elo.style.transform = value[0] + ' ' + value[1];
                        t.el.style.webkitTransform = value[2];
                        t.el.style.mozTransform = value[2];
                        t.el.style.transform = value[2];
                        t.ticking = false;
                        if (t.isIntiMove == 0) {
                            t.isIntiMove = 1;
                        } else if (t.isIntiMove == 1) {
                            $('#tryontips').hide(); t.isIntiMove = -1;
                        }
                    },
                    requestElementUpdate: function() {
                        var t = this;
                        if (!t.ticking) {
                            t.reqAnimationFrame(t.updateElementTransform);
                            t.ticking = true;
                        }
                    },
                    resetElement: function() {
                        var t = this;
                        t.elo.className = 'tryanimate';
                        t.transform = {
                                translate: { x: t.START_X, y: t.START_Y },
                                scale: 1,
                                angle: 0,
                                rx: 0,
                                ry: 0,
                                rz: 0
                        };
                        t.requestElementUpdate();
                    }
                };
    
                var yourhandSize = { w: 0, h: 0 };
    
                $('#yourhand').load(function(){
                    yourhandSize = { w: this.width, h: this.height };
                });
    
                document.getElementById('fileToUpload').addEventListener('change', function (e) {
                    toSelFileImage(this);
                }, false);
    
                document.getElementById('fileToUpload2').addEventListener('change', function (e) {
                    toSelFileImage(this);
                    $('.load').show();
                    $('#showload').show();
                    $('#retry').hide(); 
                    setTimeout(function(){
                        $('#showload').hide();
                        $('#retry').show();
                    },5000);
                }, false);
    
                function toSelFileImage(obj) {
                    // tryonStat('b');
                    $('.load').show();            
                    setTimeout(function(){
                        $('#showload').hide();
                        $('#retry').show();
                    },5000);
                    
                    selectFileImage(obj, { w: 0, h: 0 }, null, function (base64) { 
                        trywearControl.init('#imgid', '#imgboxid', '#imgbgdivid');
                        if (!$('#tryontips').is(':hidden')) {
                            $('#tryontips').css({top: (($(window).height() - 45) / 2)+'px'});
                        }
                        $('#showload').show();
                        $('#retry').hide(); 
                        $('#mhanddiv').show();
                        $('#yourhand').prop('src', base64);
                        $('#handdiv').hide();
                        $('.load').hide();
                    }); 
                };
                
    
                // 换款
                $('.tryon4 .ch').click(function(){
                    alert('该功能暂未开放');
                });
    
                // $('#try_on').click(function(){
                //     // tryonStat('a');
                //     istryonIng = true;
                //     if ($('#yourhand').prop('src') == '') {
                //         $('#handdiv').show();
                //     } else {
                //         $('#mhanddiv').show();
                //     }
                // });
    
                $('.tryonback').click(function(){
                    istryonIng = false; 
                    // $('#handdiv,#mhanddiv').hide();
                });
    
                $('#closetryon').click(function(){
                    $('#mhanddiv').show(); $('#whanddiv').hide();
                    $('#handwear').remove();
                });
    
                $('#mergeImg').click(function(){
                    $('#retry').hide(); 
                    $('#showload').show();
                    $('.load').show();            
                    setTimeout(function(){
                        // $('#showload').hide();
                        // $('#retry').show();
                        // setTimeout(function(){
                        //     $('.load').hide();
                        // },2000);
                    },5000);
                    // tryonStat('c');
                    var canvas = document.createElement("canvas");
                    canvas.width = yourhandSize.w * 2;
                    canvas.height = yourhandSize.h * 2;
                    canvas.style.cssText = 'width:'+yourhandSize.w+'px;height:'+yourhandSize.h+'px;';
                    var context = canvas.getContext("2d");
                    context.rect(0, 0, canvas.width , canvas.height);
                    var myHand = new Image();
                    // myHand.src = $('#yourhand').prop('src');
                    myHand.setAttribute("crossOrigin",'Anonymous')
                   
                    myHand.addEventListener('load',function() {
                        myHand.setAttribute && myHand.setAttribute('onload', null);
                        context.drawImage(myHand, 0, 0, canvas.width, canvas.height);
                        var wcanvas = document.createElement("canvas");
                        var ww = trywearControl.transform.scale * trywearControl.el.width, 
                        wh = trywearControl.transform.scale * trywearControl.el.height;
                        wcanvas.width = ww * 2;
                        wcanvas.height = wh * 2;
                        wcanvas.style.cssText = 'width:'+ww+'px;height:'+wh+'px;';
                        var wcontext = wcanvas.getContext("2d");
                        wcontext.rect(0, 0, wcanvas.width , wcanvas.height);
                        var myWear = new Image();
                        myWear.setAttribute("crossOrigin",'Anonymous')
                        // myWear.src = $('#imgid').prop('src');
                        
                        myWear.addEventListener('load',function() {
                            myWear.setAttribute && myWear.setAttribute('onload', null);
                            var mpm = new MegaPixMethod(myWear);
                            var opt = { width: wcanvas.width, height: wcanvas.height, orientation: {angle: trywearControl.transform.angle} };
                            mpm.renderImageToCanvas(myWear, wcanvas, opt, false);
                            var wearbase64 = wcanvas.toDataURL("image/png");
                            var myWear2 = new Image();
                            // myWear2.src = wearbase64;
                            myWear2.setAttribute("crossOrigin",'Anonymous')
                            myWear2.addEventListener('load',function() {
                                myWear2.setAttribute && myWear2.setAttribute('onload', null);
                                $('.load').hide(); 
                                context.drawImage(myWear2, $('#imgboxid').position().left * 2, $('#imgboxid').position().top * 2, wcanvas.width, wcanvas.height);
                                $('#mhanddiv').hide(); 
                                $('#whanddiv').show();
                                $('#whanddiv div').append('<img id="handwear" src="' + canvas.toDataURL("image/png") + '" style="width:100%;" crossorigin="anonymous"/>');
                                $('#handwear').bind('load', function(){
                                    if ($(window).height() > $(this).height()) {
                                        $(this).css({'margin-top': (($(window).height() - $(this).height()) / 2)+'px'});
                                        $(this).parent().find('span').eq(2).css({'top': ($(window).height()-80)+'px'});
                                    }
                                });
                            });
                            myWear2.src = wearbase64;
                        });
                        myWear.src = $('#imgid').prop('src');
                    });
                    myHand.src = $('#yourhand').prop('src');
                    // },10000);
                    // setTimeout(function () {

                    // },3000);

                });

                // 退出
                // $('#back').click(function(){
                //     $('.AR-content').hide()   http://m.moissanite.cn/order_stat.php
                 
                // })
    
                // function tryonStat(ty) {
                //     try{
                //         var tmpime = new Image();
                //         tmpime.src = 'https://t.moissanite.cn/order_stat.php?step=experience_ar_stat&t=' + ty;
                //         console.log('tmpime.src',tmpime.src)
                //     }catch(e){}
                // };
            });
        // }) 
        
    },
    methods:{
        // 退出试戴
        quit(){
            this.$emit('closeVR', true)
        } 
    }
}
</script>
<style lang="less" scoped>
.AR-content{
    position: relative;
}
.load{
    position: absolute;
    top:50%;
    left: 50%;
    display: flex;
    justify-content: center;
    justify-items: center;
    z-index: 99999;
    display: none;
    .loadBox{
        width: 130px;
        height: 130px; 
        border-radius: 8px;
        // padding-top: 250px;
        background: rgba(0, 0, 0, .7);
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        justify-items: center;
        img{
            width: 50px;
            height: 50px;
        }
    }
    .load-text{
        color: #fff;
        margin-top: 10px;
        font-size: 16px;
    }
    .box{
        margin-top: 30px;
    }
}
#showload{
    display: block;
}
#retry{
    display: none;
}
.AR-content{
    width: 100%;
    min-height: 100%;
    position:fixed;
    left:0;
    top:0;
    // z-index: 9999;
}
/*
 *首页头部样式
 */
// .mo-sprite-icon{
// 	display:block;background:url(../../static/marriage-ring/left.png?20171108) no-repeat;
// }
.mo-sprite-icon2{
    display:block;
    color: #fff;
    font-size: 23px;
    height: 100%;
	// display:block;background:url(../../static/marriage-ring/mo-sprites2.png?20180620) no-repeat;background-size:300px auto;
}

#tryontips{
    display: flex;
    justify-content: center;
    .tip{
        display: inline-block;
        min-width: 210px;
        max-width: 75vw;
        width: max-content;
        padding: 0px 20px;
        box-sizing: border-box;
        // min-width: 250px;
        // height: 45px;
        // line-height: 45px;
        font-size: 15px;
        background-color: rgba(0,0,0, 0.7)!important;
        color:#fff;
        border-radius:8px;
        // max-height:45px;
        // padding: 15px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            display: inline-block;
            margin-right: 8px;
            // width: 30px;
            // height: 30px;
        }
        span{
            display: inline-block; 
            
            // height: 45px;
            // line-height: 45px;
            // letter-spacing:3px;
        }
    }
}

.enter-long{
    display: flex;
    justify-content: center;
}
.s{
    // min-width: 300px;
    // max-width: 75vw;
    width: max-content;
    padding: 0px 20px;
    box-sizing: border-box;
    display: flex!important;
    justify-content: center;
    // background: #000;
    // height: 45px;
    // padding: 0 20%;
}
.enter-tip{
    display: inline-block;
    font-size: 15px;
    color:#fff;
    // height: 45px;
    // line-height: 45px;
}
.tryon6{
    display: flex;
    justify-content: space-between;
    p{
        font-size: 13px;
        // color:#000;
        color:#908f8f;
    }
}

/*试戴层BEGIN*/
.tryanimate { 
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    transition: all .3s; 
}
#imgboxid{
    width: 120px;
    height:120px;
    z-index:10;
}
#handdiv{
    display:block;
    width:100%;
    height:100%;
    position:fixed;
    left:0;
    top:0;
    background:url(../../static/marriage-ring/hand-tamplate_compressed.jpg) #fff;
    background-size:cover;
    z-index: 10;
    // z-index:99999;
}
.tryon0{
    width:100%;
    height:80px;
    line-height: 150px;
    z-index: 20; 
}
.tryon0 .tryonback img{
    width: 20px;
    height: 20px;
    margin-left: 20px;
}
.tryon1{
    display:inline-block;
    width:17px;
    height:26px;
    background-position: -112px 0;
    margin-top:10px;
    margin-left:-340px;
}
.tryon2{
    width:100%;
    text-align:center;
    color:#fff;
    font-size:20px;
    line-height:24px;
}
.tryon2 font{
    font-size:14px;
}
.tryon3{
    width:100%;
    height:60px;
    position:fixed;
    left:0;
    bottom:0;
    text-align:center;
}
.tryon3 label{
    display:inline-block;
    width:70%;
    height:42px;
    line-height:42px;
    background:#DAB475;
    color:#fff;
    border-radius:30px;
    position:relative;
}
.tryon3 span{
    display:block;
    width:100%
}
.tryon3 input{
    opacity: 0;
    position:absolute;
    left:0;
    top:0;
    width:100%;
}
#mhanddiv{
    display:none;
    width:100%;
    height:100%;
    position:fixed;
    left:0;
    top:0;
    background-color:#fff;
    z-index: 10;
    // z-index:9999;
}
#tryontips{
    width:100%;
    // margin: 0px 20px;
    // height:65px;
    position:fixed;
    text-align:center;
    top:250px;
}
#tryontips span{
    // display:inline-block;
    // background:rgba(255,255,255,0.7);
    // border-radius:8px;
    // max-height:45px;
}
#tryontips img{
    display:block;
    max-height:45px;
}
.tryon4{
    width:100%;
    height:45px;
    background:#FFF;
    position:relative;
    z-index:100;
    font-size:16px;
    text-align:center;
}
.tryon4 span.ch{
    display:block;
    height:51px;
    line-height:51px;
    position:absolute;
    left:12px;
    top:0;
    color:#333;
}
.tryon4 span.ch i.chi{
    display:inline-block;
    width:13px;
    height:15px;
    background-position: -287px 0;
    vertical-align:middle;
    margin-right:6px;
    margin-top:-3px;
}
.tryon4 span.tryonback{
    display:block;
    height:51px;
    line-height:51px;
    position:absolute;
    // right:12px;
    left: 12px;
    top:0;
    color:#333;
}
.tryon5{
    display:inline-block;
    width:68px;
    height:51px;
    position:relative;
}
.tryon5 span{
    display:block;
    width:68px;
    height:68px;
    border-radius:50%;
    position:absolute;
    left:0;
    top:6px;
    background:#fff;
    text-align:center;
}
.tryon5 span i.p{
    display:inline-block;
    width:30px;
    height:29px;
    margin-top:28px;
    background-position: 0 -164px;
}
#imgbgdivid{
    width:100%;
    height:100%;
    position:relative;
}
#imgbgdivid div.ov{
    display:none;
    width:100%;
    height:100%;
    position:absolute;
    left:0;
    top:0;
    width:100%;
    z-index:20;
    background:rgba(0,0,0,0.7);
}
#yourhand{
    position:absolute;
    left:0;
    top:0;
    width:100%;
    // height: 100%;
    z-index:-1;
}
#imgid{
    width:100%;
}
.tryon6{
    width:100%;
    height:55px;
    // padding-top:6px;
    position:fixed;
    left:0;
    bottom:0px;
    text-align:center;
    // background:#f1f1f1;
    // opacity: 0.6;
    background-color:rgba(255,255,255,0.8);
    font-size:16px;
    img{
        width: 32px;
        height: 32px;
    }
}
#reSelImg{
    overflow:hidden;
    float:left;
    width:30%;
    position:relative;
}
#reSelImg span.s{
    display:inline-block;
    // width:35px;
    // height:54px;
    margin-left:10px;
    background-position: -157px -68px;
}
#reSelImg input{
    opacity: 0;
    position:absolute;
    left:0;
    top:5px;
    width:100%;
}
#mergeImg img{
    width: 30px;
    height: 30px;
}
.tryon7{
    // float:right;
    width:30%;
}
.tryon7 span.m{
    display:inline-block;
    // width:35px;
    // height:54px;
    margin-left:10px;
    background-position: -196px -68px;
}
.dropOut{
     width:30%;
}
#tryonScore{
    display:none;
    width:100%;
    height:278px;
    position:fixed;
    text-align:center;
    top:150px;
    z-index:20;
}
#tryonScore div.b{
    margin:0 auto;
    width:88%;
    height:278px;
    border-radius:12px;
    background:#fff;
    position:relative;
}
#tryonScore span.cl{
    width:18px;
    height:18px;
    background-position: -13px -91px;
    background-size:200px 200px;
    position:absolute;
    left:12px;
    top:12px;
}
#tryonScore font{
    display:block;
    width:100%;
    color:#333;
    font-size:17px;
    position:absolute;
    left:0;
    top:36px;
}
#tryonScore div.x{
    width:100%;
    position:absolute;
    left:0;
    top:82px;
}
#tryonScore div.x span{
    display:inline-block;
    width:32px;
    height:31px;
    background-position: -236px -99px;
    margin-right:18px;
    vertical-align:top;
}
#tryonScore div.x span:last-child{
    margin-right:0;
}
#tryonScore div.x span.sel{
    background-position: -236px -67px;
}
#tryonScore div.c{
    display:none;
    position:relative;
    margin:0 auto;
    width:85%;
    height:128px;
    border-radius:12px;
    background:#fff;
    text-align:center;
    font-size:14px;
}
#tryonScore div.c div.msg{
    width:100%;
    box-sizing:border-box;
    padding:10px;
    padding-top:36px;
}
#tryonScore div.c div.btn{
    width:100%;
    height:38px;
    line-height:38px;
    border-top:1px solid #eee;
    position:absolute;
    left:0;
    bottom:0;
    overflow:hidden;
}
#tryonScore div.c div.btn span{
    float:left;
    width:50%;
    height:38px;
    border-right:1px solid #eee;
}
#tryonScore div.c div.btn span.c{
    float:right;
    width:49%;
    border:none;
}
#tryonScore div.c div.btn span.d{
    float:left;
    width:100%;
    border:none;
}
#tryonScore div.d{
    position:absolute;
    left:5%;
    top:142px;
    width:90%;
    height:80px;
}
#tryonScore div.d textarea{
    width:100%;
    height:100%;
    border:1px solid #b7b7b7; 
    border-radius:5px; 
    padding:5px;
}
#tryonScore .button_block{
    width:100%;
    position:absolute;
    top:227px; 
    height:277px;
}
#tryonScore .submit_btn{
    display:block; 
    width: 32%; 
    height:45px; 
    line-height: 45px; 
    margin:0 auto; 
    color: #fff; 
    text-align: center; 
    border-bottom:3px solid #b5a180; 
    background: #373737; 
    border-radius:5px; 
}
#whanddiv{
    display:none;
    width:100%;
    height:100%;
    position:fixed;
    left:0;
    top:0;
    background-color:#000;
    z-index:9999;
}
#whanddiv div{
    width:100%;
    position:relative;
    text-align:center;
    width:100%;
}
#closetryon{
    width:20px;
    height:20px;
    background-position: -280px -18px;
    position:absolute;
    right:30px;
    top:60px;
    // top:7%;
    z-index:200;
}
#whanddiv span.s{
    display:block;
    width:100%;
    position:absolute;
    left:0;
    top:400px!important;
}
#whanddiv span.s img{
    // width:64%;
    max-height:62px; 
}
#whanddiv span.t{
    display:block;
    width:80%;
    position:absolute;
    left:0;
    top:63px;
    // top:8%;
    box-sizing:border-box;
    padding-left:8px;
    text-align:left;
    color:#fff;
    // background: #000;
    // font-size: 14px; 
}
#whanddiv span.t i{
    display:inline-block;
    width:21px;
    height:21px;
    background-position: -279px -42px;
    margin-right:8px;
}
#whanddiv span.t b{
    display:inline-block;
    vertical-align:top;
    font-weight:normal;
}
/*试戴层END*/
</style>