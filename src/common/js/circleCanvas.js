let r = 4;
export function getCircle(id, x, y) {
    var canvasDiv = document.getElementById(id);
    var width = canvasDiv.getAttribute("width"),height = canvasDiv.getAttribute("height");
    //获取对应的CanvasRenderingContext2D对象(画笔)
    var ctx = canvasDiv.getContext("2d");
    // 画圆
    var circle = {ctx: ctx, x:x, y:y, width:width, height:height};
    drawCircle(circle);
    return circle;
}
// 垂直移动
export function verticalMoveCircle(circle, direction) {
    setInterval(function() {
        if (direction == "toUp") {
            circle.y -= 2 * Math.PI;
        } else {
            circle.y += 2 * Math.PI;
        }
        if(circle.y > circle.height) circle.y = 0;
        else if(circle.y < 0) circle.y = circle.height;
        circle.ctx.clearRect(0, 0, circle.width, circle.height); //清空所有的内容 (x,y,width,height)
        drawCircle(circle);
    }, 100);
}
// 水平移动
export function levelMoveCircle(circle) {
    setInterval(function() {
        circle.ctx.clearRect(0, 0, circle.width, circle.height); //清空所有的内容 (x,y,width,height)
        circle.x += 2 * Math.PI;
        if(circle.x > circle.width) {
            circle.x = 0;
        } else if(circle.x < 0) {
            circle.x = circle.width;
        }
        drawCircle(circle);
    }, 100);
}
// 折线移动
export function curveMoveCircle1(circle) {
    setInterval(function() {
        if (circle.x < circle.width * 0.36) {
            circle.x += 2 * Math.PI;
        } else if (circle.x > circle.width * 0.36 && circle.x < circle.width) {
            if (circle.y > 9) {
                circle.x = circle.width * 0.45;
                circle.y -= 2 * Math.PI;
            } else{
                circle.y = r;
                circle.x += 2 * Math.PI;
            }
        } else if (circle.x > circle.width) {
            circle.x = r;
            circle.y = circle.height - r;
        }
        circle.ctx.clearRect(0, 0, circle.width, circle.height); //清空所有的内容 (x,y,width,height)
        drawCircle(circle);
    }, 100);
}
export function curveMoveCircle2(circle) {
    setInterval(function() {
        if (circle.x < circle.width * 0.866) {
            if (circle.y < circle.height - 9) {
                circle.y += 2 * Math.PI;
            } else {
                circle.y = circle.height - r;
                circle.x += 2 * Math.PI;
            }
        } else if (circle.x < circle.width) {
            if (circle.y > r) {
                circle.y -= 2 * Math.PI;
            } else {
                circle.y = r;
                circle.x += 2 * Math.PI;
            }
        } else if (circle.x > circle.width) {
            circle.x = r+4;
            circle.y = circle.height * 0.895;
        }
        circle.ctx.clearRect(0, 0, circle.width, circle.height); //清空所有的内容 (x,y,width,height)
        drawCircle(circle);
    }, 100);
}
export function curveMoveCircle3(circle) {
    setInterval(function() {
        if (circle.x > 10) {
            if (circle.y > 10) {
                circle.y -= 2 * Math.PI;
            } else {
                circle.y = r;
                circle.x -= 2 * Math.PI;
            }
        } else {
            if (circle.y < 38) {
                circle.x = r;
                circle.y += 2 * Math.PI;
            } else {
                circle.x = circle.width - r;
                circle.y = circle.height - r;
            }
        }
        circle.ctx.clearRect(0, 0, circle.width, circle.height); //清空所有的内容 (x,y,width,height)
        drawCircle(circle);
    }, 100);
}
// 一变多
export function changeNumCircle1(circle){
    let b = {ctx: circle.ctx, x: circle.width *0.43, y:circle.height/2},
        c = {ctx: circle.ctx, x: circle.width *0.43, y:circle.height/2};

    setInterval(function() {
        if (circle.x < circle.width * 0.4) {
            circle.x += 2 * Math.PI;
            circle.ctx.clearRect(0, 0, circle.width, circle.height); //清空所有的内容 (x,y,width,height)
            drawCircle(circle);
        } else if (circle.x > circle.width * 0.4 && circle.x < circle.width) {
            if (circle.y > 9) {
                // 第一个球
                circle.x = circle.width * 0.43
                circle.y -= 2 * Math.PI;

                // 第二个球
                b.y += 2 * Math.PI;

                // 第三个球
            } else{
                // 第一个球
                circle.y = r;
                circle.x += 2 * Math.PI;

                // 第二个球
                b.y = circle.height - (r+2);
                b.x += 2 * Math.PI;

                // 第三个球
                c.y = circle.height/2;
                c.x += 2 * Math.PI;
            }
            circle.ctx.clearRect(0, 0, circle.width, circle.height); //清空所有的内容 (x,y,width,height)
            drawCircle(circle);
            drawCircle(b);
            drawCircle(c);
        } else if (circle.x > circle.width) {
            circle.x = r;
            circle.y = circle.height / 2;

            b.x = circle.width * 0.43;
            b.y = circle.height / 2;

            c.x = circle.width * 0.43;
            circle.ctx.clearRect(0, 0, circle.width, circle.height); //清空所有的内容 (x,y,width,height)
            drawCircle(circle);
        }
        
    }, 100);
}
export function changeNumCircle2(circle){
    let b = {ctx: circle.ctx, x: circle.width *0.435, y:circle.height/2};

    setInterval(function() {
        if (circle.x < circle.width * 0.4) {
            circle.x += 2 * Math.PI;
            circle.ctx.clearRect(0, 0, circle.width, circle.height); //清空所有的内容 (x,y,width,height)
            drawCircle(circle);
        } else if (circle.x > circle.width * 0.4 && circle.x < circle.width) {
            if (circle.y > 9) {
                // 第一个球
                circle.x = circle.width * 0.435
                circle.y -= 2 * Math.PI;

                // 第二个球
                b.y += 2 * Math.PI;
            } else{
                // 第一个球
                circle.y = r;
                circle.x += 2 * Math.PI;

                // 第二个球
                b.y = circle.height - (r+2);
                b.x += 2 * Math.PI;
            }
            circle.ctx.clearRect(0, 0, circle.width, circle.height); //清空所有的内容 (x,y,width,height)
            drawCircle(circle);
            drawCircle(b);
        } else if (circle.x > circle.width) {
            circle.x = r;
            circle.y = circle.height / 2;
            b.x = circle.width * 0.435;
            b.y = circle.height / 2;
            circle.ctx.clearRect(0, 0, circle.width, circle.height); //清空所有的内容 (x,y,width,height)
            drawCircle(circle);
        }
        
    }, 100);
}
export function changeNumCircle3(circle){
    let b = {ctx: circle.ctx, x: circle.width * 0.54, y:circle.height/2},
        c = {ctx: circle.ctx, x: circle.width * 0.54, y:circle.height*0.34},
        d = {ctx: circle.ctx, x: circle.width * 0.54, y:circle.height*0.66};

    setInterval(function() {
        if (circle.x < circle.width * 0.52) {
            circle.x += 2 * Math.PI;
            circle.ctx.clearRect(0, 0, circle.width, circle.height); //清空所有的内容 (x,y,width,height)
            drawCircle(circle);
        } else if (circle.x > circle.width * 0.52 && circle.x < circle.width) {
            circle.ctx.clearRect(0, 0, circle.width, circle.height); //清空所有的内容 (x,y,width,height)
            if (circle.y > 9) {
                // 第一个球
                circle.x = circle.width * 0.54
                circle.y -= 2 * Math.PI;

                // 第二个球
                b.y += 2 * Math.PI;

                // 第三个球
                if (circle.y < circle.height*0.335) drawCircle(c);

                // 第四个球
                if (b.y > circle.height*0.65) drawCircle(d);
            } else {
                // 第一个球
                circle.y = r;
                circle.x += 2 * Math.PI;

                // 第二个球
                b.y = circle.height - r;
                b.x += 2 * Math.PI;

                // 第三个球
                c.x += 2 * Math.PI;

                // 第四个球
                d.x += 2 * Math.PI;
                drawCircle(c);
                drawCircle(d);
            }
            drawCircle(circle);
            drawCircle(b);

        } else if (circle.x > circle.width) {
            circle.x = r;
            circle.y = circle.height / 2 + 2;

            b.x = circle.width * 0.52;
            b.y = circle.height / 2;

            c.x = circle.width * 0.52;
            d.x = circle.width * 0.52;
            circle.ctx.clearRect(0, 0, circle.width, circle.height); //清空所有的内容 (x,y,width,height)
            drawCircle(circle);
        }
        
    }, 100);
}
export function changeNumCircle4(circle){
    let b = {ctx: circle.ctx, x: r, y:circle.height - r};
    setInterval(function() {
        circle.ctx.clearRect(0, 0, circle.width, circle.height);//清空所有的内容 (x,y,width,height)
        if (circle.x < circle.width * 0.36) {
            circle.x += 2 * Math.PI;
            b.x += 2 * Math.PI;
             
            drawCircle(circle);
            drawCircle(b);
        } else if (circle.x > circle.width * 0.36 && circle.x < circle.width) {
            if (circle.y < circle.height/2) {
                circle.x = circle.width * 0.385;
                circle.y += 2 * Math.PI;
                b.x = circle.width * 0.385;
                b.y -= 2 * Math.PI;

                drawCircle(circle);
                drawCircle(b);
            } else {
                circle.x += 2 * Math.PI;
                circle.y = circle.height/2;
                drawCircle(circle);
            }
        } else {
            circle.x = r;
            circle.y = r;

            b.x = r;
            b.y = circle.height - r;

            drawCircle(circle);
            drawCircle(b);
        }
    }, 100);
}

// 画圆 颜色、圆半径固定 移动频率固定：2 * Math.PI
function drawCircle(circle) {
    circle.ctx.beginPath();
    circle.ctx.arc(circle.x, circle.y, r, 0, 2 * Math.PI);
    circle.ctx.fillStyle = '#00FFFF';
    circle.ctx.fill();
    circle.ctx.closePath();
}
