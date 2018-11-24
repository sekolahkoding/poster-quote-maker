var canvas = document.getElementById("myCanvas")
var ctx    = canvas.getContext("2d")
var brandImgSrc = ''
var PhotoImgSrc = ''

//====== Draw Background ======================
drawBG() //autocall first time
function drawBG(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//===== Draw Text/Quote ======================
function drawText(){
    var text = document.getElementById('quote').value
    var text_fs = document.getElementById('quote_fs').value
    var text_lh = parseInt(document.getElementById('quote_lh').value)

    //settings
    ctx.font = text_fs + 'px Calibri'
    ctx.fillStyle = 'rgb(68, 68, 68)'
    ctx.textAlign = 'center'
    // ctx.fillText(text, canvas.width/2, canvas.height/2)

     var maxWidth = 480;
     var lineHeight = text_lh;
     var x = canvas.width/2;
     var y = canvas.height/2 - 50;
    wrapText(ctx, text, x, y, maxWidth, lineHeight)

    console.log("---drawn!---")
    return false
}

function reDraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBG()
    drawText()
    drawBrandImg()
    addPhoto()
    addName()
}

//===== Draw Brand/ Watermark ================
function addBrand(event) {
    var reader = new FileReader();

    reader.onload = function(event){
        brandImgSrc = event.target.result
        drawBrandImg()
    }

    reader.readAsDataURL(event.target.files[0]);
}

function drawBrandImg() {
    var img = new Image();
    img.onload = function(){
        ctx.drawImage(img, 300, 20, 180, 70);
    }
    img.src = brandImgSrc;
}

//===== Draw Photo ================
function addPhoto() {
    var img = new Image()
    var size = 80
    var posX = (canvas.width/2)- (size/2)
    var posY = 350

    img.onload = function(){
        ctx.save()
        roundedImage(posX, posY, size, size, 45)
        ctx.clip()
        ctx.drawImage(img, posX, posY, size, size)
        ctx.restore()
    }

    PhotoImgSrc = document.getElementById('people_pic').value
    img.src = PhotoImgSrc
}

function addName(){
    var text = document.getElementById('people_name').value

    //settings
    ctx.font = '20pt Calibri'
    ctx.fillStyle = 'rgb(68, 68, 68)'
    ctx.textAlign = 'center'
    // ctx.fillText(text, canvas.width/2, canvas.height/2)

     var maxWidth = canvas.width/2;
     var lineHeight = 25;
     var x = canvas.width/2;
     var y = canvas.height - 35;
    wrapText(ctx, text, x, y, maxWidth, lineHeight)

    console.log("---drawn!---")
    return false
}

//circle helper
//from: https://stackoverflow.com/questions/19585999/canvas-drawimage-with-round-corners
function roundedImage(x,y,width,height,radius){
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

//===== Wrap Text  ===========================
// Source: https://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    //algoritma tarik point Y: //tergantung ukurang font
    var perLine    = 4
    var lines_num  = parseInt(words.length / perLine)
        y =  y - (lines_num * 10)
        //---end

    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
          context.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
        }
        else
          line = testLine;
    }

    context.fillText(line, x, y);
}
