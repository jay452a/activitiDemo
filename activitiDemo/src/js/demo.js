/**
 * Created by lenovo on 2017/7/24.
 */

class Activiti {
    constructor(){
        this.addDom=null
        this.addArea=null
        this.paintArea=null
        this.operateArr=[]//用于储存操作
    }
    //一些单独方法
    getRandString(){//随机生成6位数的大写字母
        let result=[]
        for(var i=0;i<6;i++){
            var ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
            //大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
            result.push(String.fromCharCode(65+ranNum));
        }
        let resultSring=result.join("")
        return resultSring
    }


    //启动整个流程相关方法
    init(domId){
       let container=document.getElementById(domId)
       let html="<div class='addArea'><span class='add' draggable='true'>添加流程</span></div>"
           html+='<div id="paintArea">' +
               '<svg id="paintSvg" xmlns="http://www.w3.org/2000/svg" version="1.1">' +
               '<defs> ' +
                   '<marker id="arrow" markerWidth="10" markerHeight="10" refx="0" refy="2" orient="auto" markerUnits="strokeWidth"> ' +
                   '<path d="M0,0 L0,4 L4,2 z" fill="rgb(89, 171, 228)" /> ' +
                   '</marker> ' +
               '</defs>' +
               '</svg>'+
               '</div>'
        container.innerHTML=html
        this.addDom=document.querySelectorAll(".add")[0]
        this.addArea=document.querySelectorAll(".addArea")[0]
        this.addNode()

    }

    addNode(){//向绘图区域添加节点
        let addDom=this.addDom  //获取添加节点
        let paintArea=document.getElementById("paintArea")
        this.paintArea=paintArea
        let x
        let y
        let that=this
        paintArea.ondrop=function (e) {//在目标对象里释放
            let ev=window.event||e
            let belongSring=that.getRandString()//用来标识某个节点路程
            ev.preventDefault();
            let movedDom=document.createElement("div")
            movedDom.setAttribute("class","flowIcon")
            movedDom.setAttribute("data-row",belongSring)
            let innerH='<span>添加流程</span>'
                innerH+='<i class="dotL" data-row="'+belongSring+'"></i><i class="dotR" data-row="'+belongSring+'"></i><i class="dotT" data-row="'+belongSring+'"></i><i class="dotB" data-row="'+belongSring+'"></i>'
            movedDom.innerHTML=innerH
            document.getElementById("paintArea").appendChild(movedDom)
            let movedDomWidth=movedDom.offsetWidth
            let movedDomHeight=movedDom.offsetHeight
            movedDom.style.setProperty("left",(x-movedDomWidth/2)>0?(x-movedDomWidth/2)+"px":0)
            movedDom.style.setProperty("top",(y-movedDomHeight/2)>0?(y-movedDomHeight/2)+"px":0)
            that.moveFlowIcon(movedDom)//可移动节点
            that.paintArrow(movedDom)//画线
        }
        paintArea.ondragover=function (e) {//源对象悬停在目标对象上
            let ev=window.event||e
            ev.preventDefault();
            let mouseX=ev.pageX
            let mouseY=ev.pageY
            let paintAreaOffsetX=paintArea.offsetLeft
            let paintAreaOffsetY=paintArea.offsetTop
            x=mouseX-paintAreaOffsetX
            y=mouseY-paintAreaOffsetY
        }
        addDom.ondragstart=function (e) {//源对象开始被拖动
            let ev=window.event||e
        }
    }
    moveFlowIcon(movedDom){//可在绘图区域内移动节点
        let isDown=false
        let x
        let y
        let that=this
        let startX
        let startY
        const drag=function(ev) {

            let mouseX=ev.clientX
            let mouseY=ev.clientY
            //console.log(mouseX,mouseY)
            if(mouseX==startX&&mouseY==startY){
                return
            }
            let paintAreaOffsetX=that.paintArea.offsetLeft
            let paintAreaOffsetY=that.paintArea.offsetTop
            //获取滚动条的高度
            let scrollTop=that.paintArea.scrollTop
            let scrollLeft=that.paintArea.scrollLeft
            let windowScrollY=window.scrollY
            let windowScrollX=window.scrollX

            //console.log("top"+scrollTop)
            x=mouseX-paintAreaOffsetX+scrollLeft+windowScrollX
            y=mouseY-paintAreaOffsetY+scrollTop+windowScrollY
            let movedDomWidth=movedDom.offsetWidth
            let movedDomHeight=movedDom.offsetHeight
            movedDom.style.setProperty("left",(x-movedDomWidth/2)>0?(x-movedDomWidth/2)+"px":0)
            movedDom.style.setProperty("top",(y-movedDomHeight/2)>0?(y-movedDomHeight/2)+"px":0)

        }
        const dragOver=function () {
            //当移动超出视野范围之后，svg的宽高一起发生变化
            let allMoveDom=document.querySelectorAll(".flowIcon")
            let containerW=that.paintArea.offsetWidth
            let containerH=that.paintArea.offsetHeight
            let maxLeft=0
            let maxTop=0
            let svg=document.getElementById("paintSvg")
            for(let i=0;i<allMoveDom.length;i++){
                let left=allMoveDom[i].offsetLeft
                let width=allMoveDom[i].offsetWidth
                let top=allMoveDom[i].offsetTop
                let height=allMoveDom[i].offsetHeight
                //console.log(left+width,containerW)
                if(left+width>containerW){
                    if(left+width>maxLeft){
                        maxLeft=left+width
                    }
                }
                if(top+height>containerH){
                    if(top+height>maxTop){
                        maxTop=top+height
                    }
                }
            }
            //console.log("max="+maxLeft)
            if(maxLeft!=0){
                svg.style.width=maxLeft
            }
            if(maxTop!=0){
                svg.style.height=maxTop
            }
        }
        movedDom.onmousedown=function (e) {
            let ev=window.event||e
            ev.preventDefault();
            isDown=true
            startX=ev.clientX
            startY=ev.clientY
            document.onmousemove=function (e) {
                let ev=window.event||e
                if(isDown==true){
                    drag(ev)
                    that.moveChangeSvg()
                }
            }
            this.onmouseup=function (e) {
                let ev=window.event||e
                ev.preventDefault();
                isDown=false
                dragOver()
            }
            document.onmouseup=function (e) {
                let ev=window.event||e
                ev.preventDefault();
                isDown=false
                dragOver()
            }
        }



    }
   //画线
    paintArrowGetPath(startX,startY,x,y,direct,nearlyName){//获取画线的路径，svg path
        let pathD
        let flowWidth=document.querySelector(".flowIcon").offsetWidth/2
        let flowHeight=document.querySelector(".flowIcon").offsetHeight
        //获取滚动条高度
        let scrollTop=this.paintArea.scrollTop
        let scrollLeft=this.paintArea.scrollLeft
        let windowScrollY=window.scrollY
        let windowScrollX=window.scrollX
        startX+=scrollLeft+windowScrollX
        startY+=scrollTop+windowScrollY
        x+=scrollLeft+windowScrollX
        y+=scrollTop+windowScrollY
        console.log(direct,nearlyName)

        if(!nearlyName){//如果没有进入流程div内
            switch (direct) {
                case "dotB":
                    if(x-startX<=0&&y-startY>=0){//往左下
                        if(y-startY<30){ //当Y移动不超过30时
                            pathD="M"+startX+","+startY+" L"+startX+","+(startY+30)+" L"+x+","+(startY+30)+" L"+x+","+y
                        }else{
                            pathD="M"+startX+","+startY+" L"+startX+","+(y+startY)/2+" L"+x+","+(y+startY)/2+" L"+x+","+y
                        }

                    }
                    if(x-startX<=0&&startY-y>0){//往左上

                        if(startX-x<flowWidth){ //当鼠标往左移动小于节点的一半
                            pathD="M"+startX+","+startY+" L"+startX+","+(startY+30)+" L"+(startX-flowWidth-30)+","+(startY+30)+
                                " L"+(startX-flowWidth-30)+","+y+" L"+x+","+y
                        }else{
                            pathD="M"+startX+","+startY+" L"+startX+","+(startY+30)+" L"+x+","+(startY+30)+" L"+x+","+y
                        }
                    }
                    if(x-startX>0&&y-startY>=0){//往右下
                        if(y-startY<30){ //当Y移动不超过30时
                            pathD="M"+startX+","+startY+" L"+startX+","+(startY+30)+" L"+x+","+(startY+30)+" L"+x+","+y
                        }else{
                            pathD="M"+startX+","+startY+" L"+startX+","+(y+startY)/2+" L"+x+","+(y+startY)/2+" L"+x+","+y
                        }
                    }
                    if(x-startX>0&&startY-y>0){//往右上
                        if(x-startX<flowWidth){ //当鼠标往左移动小于节点的一半
                            pathD="M"+startX+","+startY+" L"+startX+","+(startY+30)+" L"+(startX+flowWidth+30)+","+(startY+30)+
                                " L"+(startX+flowWidth+30)+","+y+" L"+x+","+y
                        }else{
                            pathD="M"+startX+","+startY+" L"+startX+","+(startY+30)+" L"+x+","+(startY+30)+" L"+x+","+y
                        }
                    }
                    break;
                case "dotT":
                    if(x-startX<=0&&startY-y>0){//往左上
                        if(startY-y<30){ //当Y移动不超过30时
                            pathD="M"+startX+","+startY+" L"+startX+","+(startY-30)+" L"+x+","+(startY-30)+" L"+x+","+y
                        }else{
                            pathD="M"+startX+","+startY+" L"+startX+","+(y+startY)/2+" L"+x+","+(y+startY)/2+" L"+x+","+y
                        }
                    }
                    if(x-startX>0&&startY-y>0){//往右上
                        if(startY-y<30){ //当Y移动不超过30时
                            pathD="M"+startX+","+startY+" L"+startX+","+(startY-30)+" L"+x+","+(startY-30)+" L"+x+","+y
                        }else{
                            pathD="M"+startX+","+startY+" L"+startX+","+(y+startY)/2+" L"+x+","+(y+startY)/2+" L"+x+","+y
                        }
                    }
                    if(x-startX<=0&&startY-y<=0){//往左下
                        if(startX-x<flowWidth){ //当鼠标往左移动小于节点的一半
                            pathD="M"+startX+","+startY+" L"+startX+","+(startY-30)+" L"+(startX-flowWidth-30)+","+(startY-30)+
                                " L"+(startX-flowWidth-30)+","+y+" L"+x+","+y
                        }else{
                            pathD="M"+startX+","+startY+" L"+startX+","+(startY-30)+" L"+x+","+(startY-30)+" L"+x+","+y
                        }
                    }
                    if(x-startX>0&&startY-y<=0){
                        if(x-startX<flowWidth){ //当鼠标往左移动小于节点的一半
                            pathD="M"+startX+","+startY+" L"+startX+","+(startY-30)+" L"+(startX+flowWidth+30)+","+(startY-30)+
                                " L"+(startX+flowWidth+30)+","+y+" L"+x+","+y
                        }else{
                            pathD="M"+startX+","+startY+" L"+startX+","+(startY-30)+" L"+x+","+(startY-30)+" L"+x+","+y
                        }
                    }
                    break;
                case "dotL":
                    if(x-startX<=0&&startY-y>0){//往左上
                        if(startX-x<30){
                            pathD="M"+startX+","+startY+" L"+(startX-30)+","+startY+" L"+(startX-30)+","+y+" L"+x+","+y
                        }else{
                            pathD="M"+startX+","+startY+" L"+x+","+startY+" L"+x+","+y
                        }
                    }
                    if(x-startX>0&&startY-y>0){//往右上
                        pathD="M"+startX+","+startY+" L"+(startX-30)+","+startY+" L"+(startX-30)+","+y+" L"+x+","+y
                    }
                    if(x-startX<=0&&startY-y<=0){//往左下
                        if(startX-x<30){
                            pathD="M"+startX+","+startY+" L"+(startX-30)+","+startY+" L"+(startX-30)+","+y+" L"+x+","+y
                        }else{
                            pathD="M"+startX+","+startY+" L"+x+","+startY+" L"+x+","+y
                        }
                    }
                    if(x-startX>0&&startY-y<=0){//往右下
                        pathD="M"+startX+","+startY+" L"+(startX-30)+","+startY+" L"+(startX-30)+","+y+" L"+x+","+y
                    }
                    break;
                default:
                    if(x-startX<=0&&startY-y>0){//往左上
                        pathD="M"+startX+","+startY+" L"+(startX+30)+","+startY+" L"+(startX+30)+","+y+" L"+x+","+y
                    }
                    if(x-startX<=0&&startY-y<=0){//往左下
                        pathD="M"+startX+","+startY+" L"+(startX+30)+","+startY+" L"+(startX+30)+","+y+" L"+x+","+y
                    }
                    if(x-startX>0&&startY-y>0){//往右上
                        if(x-startX<30){
                            pathD="M"+startX+","+startY+" L"+(startX+30)+","+startY+" L"+(startX+30)+","+y+" L"+x+","+y
                        }else{
                            pathD="M"+startX+","+startY+" L"+x+","+startY+" L"+x+","+y
                        }
                    }
                    if(x-startX>0&&startY-y<=0){//往右下
                        if(x-startX<30){
                            pathD="M"+startX+","+startY+" L"+(startX+30)+","+startY+" L"+(startX+30)+","+y+" L"+x+","+y
                        }else{
                            pathD="M"+startX+","+startY+" L"+x+","+startY+" L"+x+","+y
                        }
                    }
            }
        }

       if(nearlyName){
           x-=scrollLeft+windowScrollX
           y-=scrollTop+windowScrollY
           switch (direct) {
               case "dotT":
                     if(nearlyName=="left"){
                         if(x-startX>0&&y-startY<0){
                             pathD="M"+startX+","+startY+" L"+startX+","+y+" L"+x+","+y
                         }
                         if(x-startX>0&&y-startY>=0){
                             pathD="M"+startX+","+startY+" L"+startX+","+(startY-30)+" L"+(x+startX)/2+","+(startY-30)+
                                     " L"+(x+startX)/2+","+y+" L"+x+","+y
                         }
                         if(x-startX<=0&&y-startY<0){
                             pathD="M"+startX+","+startY+" L"+startX+","+(startY+y)/2+" L"+(x-30)+","+(startY+y)/2+
                                     " L"+(x-30)+","+y+" L"+x+","+y
                         }
                         if(x-startX<=0&&y-startY>=0){
                             pathD="M"+startX+","+startY+" L"+startX+","+(startY-30)+" L"+(x-30)+","+(startY-30)+
                                    " L"+(x-30)+","+y+' L'+x+","+y
                         }
                     }
                     if(nearlyName=="right"){
                         if(x-startX>0&&y-startY<0){
                             pathD="M"+startX+","+startY+" L"+startX+","+(y+startY)/2+" L"+(x+30)+","+(y+startY)/2+
                                    " L"+(x+30)+","+y+" L"+x+","+y
                         }
                         if(x-startX>0&&y-startY>=0){
                             pathD="M"+startX+","+startY+" L"+startX+","+(startY-30)+" L"+(x+30)+","+(startY-30)+
                                     " L"+(x+30)+","+y+" L"+x+","+y
                         }
                         if(x-startX<=0&&y-startY<0){
                             pathD="M"+startX+","+startY+" L"+startX+","+y+" L"+x+","+y
                         }
                         if(x-startX<=0&&y-startY>=0){
                             pathD="M"+startX+","+startY+" L"+startX+","+(startY-30)+" L"+(x+startX)/2+","+(startY-30)+
                                     " L"+(x+startX)/2+","+y+" L"+x+","+y
                         }
                     }
                     if(nearlyName=="top"){
                         if(y-startY<0){
                             pathD="M"+startX+","+startY+" L"+startX+","+(y-30)+" L"+x+","+(y-30)+" L"+x+","+y
                         }
                         if(y-startY>=0){
                             pathD="M"+startX+","+startY+" L"+startX+","+(startY-30)+" L"+x+","+(startY-30)+" L"+x+","+y
                         }
                     }
                     if(nearlyName=="bottom"){
                         if(y-startY<0){
                             pathD="M"+startX+","+startY+" L"+startX+","+(startY+y)/2+" L"+x+","+(startY+y)/2+" L"+x+","+y
                         }
                         if(y-startY>=0){
                             pathD="M"+startX+","+startY+" L"+startX+","+(startY-30)+" L"+(x+startX)/2+","+(startY-30)+
                                    " L"+(x+startX)/2+","+(y+30)+" L"+x+","+(y+30)+" L"+x+","+y
                         }
                     }
                     break;
               case "dotB":
                   if(nearlyName=="left"){
                       if(x-startX<0&&y-startY<0){
                           pathD="M"+startX+","+startY+" L"+startX+","+(startY+30)+" L"+(x-30)+","+(startY+30)+" L"+
                               (x-30)+","+y+" L"+x+","+y
                       }
                       if(x-startX>=0&&y-startY<0){
                           pathD="M"+startX+","+startY+" L"+startX+","+(startY+30)+" L"+(x+startX)/2+","+(startY+30)+
                                   " L"+(x+startX)/2+","+y+" L"+x+","+y
                       }
                       if(x-startX<0&&y-startY>=0){
                           pathD="M"+startX+","+startY+" L"+startX+","+(y+startY)/2+" L"+(x-30)+","+(y+startY)/2+
                                   " L"+(x-30)+","+y+" L"+x+","+y
                       }
                       if(x-startX>=0&&y-startY>=0){
                           pathD="M"+startX+","+startY+" L"+startX+","+y+" L"+x+","+y
                       }
                   }
                   if(nearlyName=="right"){
                       if(x-startX<0&&y-startY<0){
                           pathD="M"+startX+","+startY+" L"+startX+","+(startY+30)+" L"+(x+startX)/2+","+(startY+30)+
                               " L"+(x+startX)/2+","+y+" L"+x+","+y
                       }
                       if(x-startX>=0&&y-startY<0){
                           pathD="M"+startX+","+startY+" L"+startX+","+(startY+30)+" L"+(x+30)+","+(startY+30)+" L"+
                               (x+30)+","+y+" L"+x+","+y
                       }
                       if(x-startX<0&&y-startY>=0){
                           pathD="M"+startX+","+startY+" L"+startX+","+y+" L"+x+","+y
                       }
                       if(x-startX>=0&&y-startY>=0){
                           pathD="M"+startX+","+startY+" L"+startX+","+(y+startY)/2+" L"+(x+30)+","+(y+startY)/2+
                               " L"+(x+30)+","+y+" L"+x+","+y
                       }
                   }
                   if(nearlyName=="top"){
                       if(y-startY<0){
                           pathD="M"+startX+","+startY+" L"+startX+","+(startY+30)+" L"+(x+startX)/2+","+(startY+30)+
                                   " L"+(x+startX)/2+","+(y-30)+" L"+x+","+(y-30)+" L"+x+","+y
                       }
                       if(y-startY>=0){
                           pathD="M"+startX+","+startY+" L"+startX+","+(y+startY)/2+" L"+x+","+(y+startY)/2+" L"+x+","+y

                       }
                   }
                   if(nearlyName=="bottom"){
                       if(y-startY<0){
                           pathD="M"+startX+","+startY+" L"+startX+","+(startY+30)+" L"+x+","+(startY+30)+" L"+x+","+y
                       }
                       if(y-startY>=0){
                           pathD="M"+startX+","+startY+" L"+startX+","+(y+30)+" L"+x+","+(y+30)+" L"+x+","+y
                       }
                   }
                   break;
               case "dotL":
                   if(nearlyName=="left"){
                       if(x-startX<0){
                           pathD="M"+startX+","+startY+" L"+(x-30)+","+startY+" L"+(x-30)+","+y+" L"+x+","+y
                       }else{
                           pathD="M"+startX+","+startY+" L"+(startX-30)+","+startY+" L"+(startX-30)+","+y+" L"+x+","+y
                       }
                   }
                   if(nearlyName=="right"){
                       if(x-startX<0){
                           pathD="M"+startX+","+startY+" L"+(x+startX)/2+","+startY+" L"+(x+startX)/2+","+y+" L"+x+","+y
                       }else{
                           pathD="M"+startX+","+startY+" L"+(startX-30)+","+startY+" L"+(startX-30)+","+(y+startY)/2+
                                   " L"+(x+30)+","+(y+startY)/2+" L"+(x+30)+","+y+" L"+x+","+y
                       }
                   }
                   if(nearlyName=="top"){
                       if(x-startX<0&&y-startY<0){
                           pathD="M"+startX+","+startY+" L"+(x+startX)/2+","+startY+" L"+(x+startX)/2+","+(y-30)+" L"+x+","+(y-30)+
                                   ' L'+x+","+y
                       }
                       if(x-startX>=0&&y-startY<0){
                           pathD="M"+startX+","+startY+" L"+(startX-30)+","+startY+" L"+(startX-30)+","+(y-30)+" L"+x+","+(y-30)+
                                  " L"+x+","+y
                       }
                       if(x-startX<0&&y-startY>=0){
                           pathD="M"+startX+","+startY+" L"+x+","+startY+" L"+x+","+y
                       }
                       if(x-startX>=0&&y-startY>=0){
                           pathD="M"+startX+","+startY+" L"+(startX-30)+","+startY+" L"+(startX-30)+","+(y+startY)/2+
                                   " L"+x+","+(y+startY)/2+" L"+x+","+y
                       }
                   }
                   if(nearlyName=="bottom"){
                       if(x-startX<0&&y-startY<0){
                           pathD="M"+startX+","+startY+" L"+x+","+startY+" L"+x+","+y
                       }
                       if(x-startX>=0&&y-startY<0){
                           pathD="M"+startX+","+startY+" L"+(startX-30)+","+startY+" L"+(startX-30)+","+(y+startY)/2+
                               " L"+x+","+(y+startY)/2+" L"+x+","+y
                       }
                       if(x-startX<0&&y-startY>=0){
                           pathD="M"+startX+","+startY+" L"+(x+startX)/2+","+startY+" L"+(x+startX)/2+","+(y+30)+" L"+x+","+(y+30)+
                               ' L'+x+","+y
                       }
                       if(x-startX>=0&&y-startY>=0){
                           pathD="M"+startX+","+startY+" L"+(startX-30)+","+startY+" L"+(startX-30)+","+(y+30)+" L"+x+","+(y+30)+
                               " L"+x+","+y
                       }
                   }
                   break;
               default:
                   if(nearlyName=="left"){
                       if(x-startX<0){
                           pathD="M"+startX+","+startY+" L"+(startX+30)+","+startY+" L"+(startX+30)+","+(y+startY)/2+
                                   " L"+(x-30)+","+(y+startY)/2+" L"+(x-30)+","+y+" L"+x+","+y
                       }else{
                           pathD="M"+startX+","+startY+" L"+(x+startX)/2+","+startY+" L"+(x+startX)/2+","+y+" L"+x+","+y
                       }
                   }
                   if(nearlyName=="right"){
                       if(x-startX<0){
                           pathD="M"+startX+","+startY+" L"+(startX+30)+","+startY+" L"+(startX+30)+","+y+" L"+x+","+y
                       }else{
                           pathD="M"+startX+","+startY+" L"+(x+30)+","+startY+" L"+(x+30)+","+y+" L"+x+","+y
                       }
                   }
                   if(nearlyName=="top"){
                       if(x-startX<0&&y-startY<0){
                           pathD="M"+startX+","+startY+" L"+(startX+30)+","+startY+" L"+(startX+30)+","+(y-30)+
                                   " L"+x+","+(y-30)+" L"+x+","+y
                       }
                       if(x-startX>=0&&y-startY<0){
                           pathD="M"+startX+","+startY+" L"+(x+startX)/2+","+startY+" L"+(x+startX)/2+","+(y-30)+
                                   " L"+x+","+(y-30)+" L"+x+","+y
                       }
                       if(x-startX<0&&y-startY>=0){
                           pathD="M"+startX+","+startY+" L"+(startX+30)+","+startY+" L"+(startX+30)+","+(y+startY)/2+
                                   " L"+x+","+(y+startY)/2+" L"+x+","+y
                       }
                       if(x-startX>=0&&y-startY>=0){
                           pathD="M"+startX+","+startY+" L"+x+","+startY+" L"+x+","+y
                       }
                   }
                   if(nearlyName=="bottom"){
                       if(x-startX<0&&y-startY<0){
                           pathD="M"+startX+","+startY+" L"+(startX+30)+","+startY+" L"+(startX+30)+","+(y+startY)/2+
                               " L"+x+","+(y+startY)/2+" L"+x+","+y
                       }
                       if(x-startX>=0&&y-startY<0){
                           pathD="M"+startX+","+startY+" L"+x+","+startY+" L"+x+","+y
                       }
                       if(x-startX<0&&y-startY>=0){
                           pathD="M"+startX+","+startY+" L"+(startX+30)+","+startY+" L"+(startX+30)+","+(y+30)+
                               " L"+x+","+(y+30)+" L"+x+","+y
                       }
                       if(x-startX>=0&&y-startY>=0){
                           pathD="M"+startX+","+startY+" L"+(x+startX)/2+","+startY+" L"+(x+startX)/2+","+(y+30)+
                               " L"+x+","+(y+30)+" L"+x+","+y
                       }

                   }
           }

       }

        return pathD
    }

    paintArrow(moveDom){
        let isDown=false
        let startX
        let startY
        let endX
        let endY
        let svgContainer=document.getElementById("paintSvg")
        let that=this
        let direct
        let nearlyName //获取最近点名称
        //当鼠标移动的时候绘图
        const paint=function (groupData,dataRow,cursorNode) {
            let mouseX=cursorNode.clientX//鼠标位置x
            let mouseY=cursorNode.clientY//鼠标位置y
            let paintAreaX=that.paintArea.offsetLeft
            let paintAreaY=that.paintArea.offsetTop
            let x=mouseX-paintAreaX
            let y=mouseY-paintAreaY

            /*计算最近点*/
            let endDom//获取指向节点
            if(cursorNode.target.className=="flowIcon"){
                endDom=cursorNode.target
            }
            if(cursorNode.target.parentNode.className=="flowIcon"){
                endDom=cursorNode.target.parentNode
            }
            //console.log(endDom)

            if(cursorNode.target.className=="flowIcon"||cursorNode.target.parentNode.className=="flowIcon"){
                //计算出指向节点的上下左右四个位置坐标
                let endDomT={}
                let endDomB={}
                let endDomL={}
                let endDomR={}
                endDomT.x=endDom.offsetLeft+endDom.offsetWidth/2
                endDomT.y=endDom.offsetTop
                endDomB.x=endDom.offsetLeft+endDom.offsetWidth/2
                endDomB.y=endDom.offsetTop+endDom.offsetHeight
                endDomL.x=endDom.offsetLeft
                endDomL.y=endDom.offsetTop+endDom.offsetHeight/2
                endDomR.x=endDom.offsetLeft+endDom.offsetWidth
                endDomR.y=endDom.offsetTop+endDom.offsetHeight/2
             //   console.log(endDomT,endDomB,endDomL,endDomR)
                //比较鼠标离哪个点更近
                let curToEndDomT=Math.sqrt(Math.pow((x-endDomT.x),2)+Math.pow((y-endDomT.y),2))
                let curToEndDomB=Math.sqrt(Math.pow((x-endDomB.x),2)+Math.pow((y-endDomB.y),2))
                let curToEndDomL=Math.sqrt(Math.pow((x-endDomL.x),2)+Math.pow((y-endDomL.y),2))
                let curToEndDomR=Math.sqrt(Math.pow((x-endDomR.x),2)+Math.pow((y-endDomR.y),2))
                let destination=[]
                destination.push(
                    {name:"top", num:curToEndDomT},
                    {name:"bottom", num:curToEndDomB},
                    {name:"left", num:curToEndDomL},
                    {name:"right", num:curToEndDomR}
                )
                let nearly=100000
                for(let i=0;i<destination.length;i++){
                    if(destination[i].num<nearly){
                        nearly=destination[i].num
                        nearlyName=destination[i].name
                    }
                }
               // console.log(nearly,nearlyName)
                switch (nearlyName) {
                    case "top":
                        x=endDomT.x
                        y=endDomT.y
                        break;
                    case "bottom":
                        x=endDomB.x
                        y=endDomB.y
                        break;
                    case "left":
                        x=endDomL.x
                        y=endDomL.y
                        break;
                    default:
                        x=endDomR.x
                        y=endDomR.y
                }
            }
            /*计算最近点*/


            //绘制直线属性
            /*groupData.line.setAttribute("x1",startX)
            groupData.line.setAttribute("y1",startY)
            groupData.line.setAttribute("x2",x)
            groupData.line.setAttribute("y2",y)
            groupData.line.setAttribute("marker-end","url(#arrow)")//箭头
            groupData.line.style.stroke="rgb(89, 171, 228)"
            groupData.line.style.strokeWidth="2px"*/
            //获取绘制路径属性
            let pathD=that.paintArrowGetPath(startX,startY,x,y,direct,nearlyName)

            groupData.path.setAttribute("d",pathD)
            groupData.path.setAttribute("fill","transparent")
            groupData.path.setAttribute("stroke","#59ABE4")
            groupData.path.setAttribute("stroke-width","2")
            groupData.path.setAttribute("marker-end","url(#arrow)")
            groupData.group.setAttribute("data-start",direct)
            groupData.group.setAttribute("data-end",nearlyName)
            endX=x
            endY=y

        }
        //鼠标释放
        const dragOver=function (groupData,dataRow,cursorNode) {
            //判断是否进入另外一个节点

            if(cursorNode.target.className=="flowIcon"||cursorNode.target.parentNode.className=="flowIcon"){
                if(cursorNode.target.getAttribute("data-row")!=dataRow&&cursorNode.target.parentNode.getAttribute("data-row")!=dataRow){
                     let start=dataRow
                     let end=cursorNode.target.getAttribute("data-row")||cursorNode.target.parentNode.getAttribute("data-row")
                     let svgArea=document.getElementById("paintSvg")
                     let svgGroup=svgArea.childNodes
                     console.log(svgGroup)
                     for(let i=0;i<svgGroup.length;i++){
                         if(svgGroup[i].tagName=="g"){
                             if(svgGroup[i].getAttribute("data-path")==(start+"-"+end)){
                                 svgGroup[i].remove()
                             }
                         }
                     }
                     groupData.group.setAttribute("data-path",start+"-"+end)

                }else{
                   // groupData.group.remove()
                }
            }else{
                groupData.group.remove()
            }
        }

        moveDom.addEventListener("mousedown",function (e) {
            let ev=window.event||e
            isDown=true
            if(ev.target.nodeName=='I'){
                document.onmousemove=null
                document.onmouseup=null
                this.onmouseup=null
                direct=ev.target.className //标记哪个点按下的
                let directDom=ev.target//获取画线的起始点的dom节点
                startX=ev.clientX-that.paintArea.offsetLeft
                startY=ev.clientY-that.paintArea.offsetTop
                //创建一个组
                let group=document.createElementNS("http://www.w3.org/2000/svg", "g");
                //创建一条路径
                let path=document.createElementNS("http://www.w3.org/2000/svg", "path");
                svgContainer.appendChild(group)
                group.appendChild(path)
                let groupData={//包含svg组的一些信息
                    group:group,
                    path:path
                }
                let dataRow=ev.target.getAttribute("data-row")//获取开始画线的起始点的data-row属性
                document.onmousemove=function (e) {
                    let ev=window.event||e
                    if(isDown==true){
                        console.log("huaxianmove")
                        paint(groupData,dataRow,ev)
                    }
                }
                this.onmouseup=function (e) {
                    let ev=window.event||e
                    ev.preventDefault();
                    isDown=false
                    dragOver(groupData,dataRow,ev)
                }
                document.onmouseup=function (e) {
                    let ev=window.event||e
                    ev.preventDefault();
                    if(isDown==true){
                        dragOver(groupData,dataRow,ev)
                    }

                    isDown=false
                }
            }
        })
    }

//当流程节点移动的时候，折线图随之移动
    moveChangeSvg(){
        let flowDiv=document.querySelectorAll("div.flowIcon")
        let svg=document.querySelectorAll("g")
        console.log(flowDiv)
        console.log(svg)
        if(!svg){
            return
        }
        for(let i=0;i<flowDiv.length;i++){
            for (let j=0;j<svg.length;j++){
                let start=svg[j].getAttribute('data-start')
                let end =svg[j].getAttribute("data-end")
                let pathStart=svg[j].getAttribute("data-path").split("-")[0]
                let pathEnd=svg[j].getAttribute("data-path").split("-")[1]
                if(flowDiv[i].getAttribute("data-row")==pathStart){
                    let flowDivChildren=flowDiv[i].childNodes
                    for(let k=0;k<flowDivChildren.length;k++){
                        if(flowDivChildren[k].className==svg[j].getAttribute('data-start')){
                            console.log(flowDivChildren[k].offsetLeft,flowDivChildren[k].offsetTop)
                        }


                    }
                }
                if(flowDiv[i].getAttribute("data-row")==pathEnd){
                    console.log(flowDiv[i])
                }
            }
        }
    }

}

export default Activiti

